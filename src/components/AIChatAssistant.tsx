import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  X,
  Loader,
  Sparkles,
  User,
  Clock,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatService, formatTime, renderToolCall } from "@/lib/chat";
import type { ChatState } from "../../worker/types";
import { cn } from "@/lib/utils";
export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    sessionId: chatService.getSessionId(),
    isProcessing: false,
    model: "google-ai-studio/gemini-2.5-flash",
    streamingMessage: "",
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      chatService.getMessages().then((res) => {
        if (res.success && res.data) {
          setChatState(res.data);
        }
      });
    }
  }, [isOpen]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.messages, chatState.streamingMessage]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isProcessing) return;
    const message = input.trim();
    setInput("");
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: message,
      timestamp: Date.now(),
    };
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true,
      streamingMessage: "",
    }));
    await chatService.sendMessage(message, chatState.model, (chunk) => {
      setChatState((prev) => ({
        ...prev,
        streamingMessage: (prev.streamingMessage || "") + chunk,
      }));
    });
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setChatState({ ...response.data, isProcessing: false });
    } else {
      setChatState((prev) => ({ ...prev, isProcessing: false }));
    }
  };
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
            size="icon"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-28 right-8 z-50"
          >
            <Card className="w-[400px] h-[600px] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between bg-slate-100 dark:bg-slate-800 p-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg font-semibold">
                    AI Virtual Assistant
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                    {chatState.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex items-end gap-2",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msg.role === "assistant" && (
                          <Bot className="h-6 w-6 text-slate-500 flex-shrink-0" />
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3 text-sm",
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-slate-100 dark:bg-slate-700 rounded-bl-none"
                          )}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          {msg.toolCalls && msg.toolCalls.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-current/20">
                              <div className="flex items-center gap-1 mb-1 text-xs opacity-70">
                                <Wrench className="w-3 h-3" />
                                Tools used:
                              </div>
                              {msg.toolCalls.map((tool, idx) => (
                                <Badge
                                  key={idx}
                                  variant={
                                    msg.role === "user"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="mr-1 mb-1 text-xs"
                                >
                                  {renderToolCall(tool)}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                        {msg.role === "user" && (
                          <User className="h-6 w-6 text-slate-500 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                    {chatState.streamingMessage && (
                      <div className="flex items-end gap-2 justify-start">
                        <Bot className="h-6 w-6 text-slate-500 flex-shrink-0" />
                        <div className="max-w-[80%] rounded-lg p-3 text-sm bg-slate-100 dark:bg-slate-700 rounded-bl-none">
                          <p className="whitespace-pre-wrap">
                            {chatState.streamingMessage}
                            <span className="animate-pulse">|</span>
                          </p>
                        </div>
                      </div>
                    )}
                    {chatState.isProcessing && !chatState.streamingMessage && (
                      <div className="flex items-end gap-2 justify-start">
                        <Bot className="h-6 w-6 text-slate-500 flex-shrink-0" />
                        <div className="max-w-[80%] rounded-lg p-3 text-sm bg-slate-100 dark:bg-slate-700 rounded-bl-none">
                          <div className="flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin" />
                            <span>Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    disabled={chatState.isProcessing}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || chatState.isProcessing}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}