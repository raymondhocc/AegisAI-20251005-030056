import { AlertTriangle } from "lucide-react";
export default function Footer() {
  return (
    <footer className="p-4 md:p-6 text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-4xl mx-auto bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 text-yellow-800 dark:text-yellow-300 rounded-lg p-4 mb-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold">AI Functionality Disclaimer</h4>
          <p className="text-xs">
            The AI features in this application require API keys to be configured.
            This demonstration environment may have limited or no AI capabilities.
            To enable full functionality, please deploy this application and provide your own API keys in the environment settings.
          </p>
        </div>
      </div>
      <p>Built with ❤️ at Cloudflare</p>
    </footer>
  );
}