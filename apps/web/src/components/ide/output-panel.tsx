"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export type RunStatus = "idle" | "running" | "success" | "error";

export function OutputPanel({
  output,
  status,
  onNext,
}: {
  output: string;
  status: RunStatus;
  onNext?: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Output
        </span>
        {status === "running" && <Loader2 className="h-3 w-3 animate-spin text-accent-amber" />}
        {status === "success" && <CheckCircle className="h-3.5 w-3.5 text-accent-green" />}
        {status === "error" && <XCircle className="h-3.5 w-3.5 text-accent-rose" />}
      </div>

      {/* output */}
      <pre className="flex-1 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
        {output || (
          <span className="text-neutral-400 dark:text-neutral-600">
            Press Run or Ctrl+Enter to execute
          </span>
        )}
      </pre>

      {/* success bar */}
      {status === "success" && onNext && (
        <div className="flex items-center justify-between border-t border-accent-green/20 bg-accent-green/5 px-4 py-2.5">
          <span className="font-mono text-xs font-medium text-accent-green">All tests passed</span>
          <button
            onClick={onNext}
            className="cursor-pointer font-mono text-xs font-bold text-accent-green transition-opacity hover:opacity-80"
          >
            Next lesson →
          </button>
        </div>
      )}
    </div>
  );
}
