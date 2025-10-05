import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useUnderwritingStore } from '@/lib/underwritingStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnderwritingApplication } from '@/lib/mockData';
import { GripVertical, Inbox } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
const getRiskColor = (score: number) => {
  if (score <= 33) return 'bg-green-500';
  if (score <= 66) return 'bg-yellow-500';
  return 'bg-red-500';
};
function ApplicationCard({ app }: { app: UnderwritingApplication }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: app.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <Card ref={setNodeRef} style={style} className="mb-4 bg-card hover:shadow-md transition-shadow duration-200 touch-none">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm">{app.applicantName}</p>
            <p className="text-xs text-muted-foreground">{app.policyType}</p>
          </div>
          <div {...attributes} {...listeners} className="cursor-grab p-1 text-muted-foreground hover:text-foreground">
            <GripVertical className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs">
          <Badge variant="secondary">{app.id}</Badge>
          <div className="flex items-center gap-2">
            <span className="font-medium">AI Risk</span>
            <div className="flex items-center gap-1">
              <div className={cn('h-2 w-2 rounded-full', getRiskColor(app.aiRiskScore))} />
              <span>{app.aiRiskScore}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
function StatusColumn({ status, apps }: { status: UnderwritingApplication['status']; apps: UnderwritingApplication[] }) {
  const { setNodeRef } = useSortable({ id: status });
  return (
    <div ref={setNodeRef} className="flex-1 min-w-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{status} <span className="text-sm font-normal text-muted-foreground">({apps.length})</span></h3>
      </div>
      <div className="p-4 h-full">
        <SortableContext items={apps.map((app) => app.id)}>
          {apps.length > 0 ? (
            apps.map((app) => <ApplicationCard key={app.id} app={app} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500">
              <Inbox className="h-8 w-8 mb-2" />
              <p className="text-sm">No applications in this stage.</p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
export default function UnderwritingPage() {
  const { applications, statuses, updateApplicationStatus } = useUnderwritingStore();
  const [activeApp, setActiveApp] = useState<UnderwritingApplication | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const app = applications.find((a) => a.id === active.id);
    if (app) setActiveApp(app);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveApp(null);
    if (over && active.id !== over.id) {
      const overIsColumn = statuses.includes(over.id as any);
      if (overIsColumn) {
        updateApplicationStatus(active.id as string, over.id as UnderwritingApplication['status']);
      } else {
        // Handle reordering within a column if needed in the future
      }
    }
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Underwriting Pipeline</CardTitle>
          <CardDescription>Drag and drop applications to update their status.</CardDescription>
        </CardHeader>
      </Card>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statuses.map((status) => (
            <StatusColumn
              key={status}
              status={status}
              apps={applications.filter((app) => app.status === status)}
            />
          ))}
        </div>
        {typeof document !== 'undefined' && createPortal(
          <DragOverlay>
            {activeApp ? <ApplicationCard app={activeApp} /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}