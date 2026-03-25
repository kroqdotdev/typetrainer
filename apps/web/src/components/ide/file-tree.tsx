"use client";

import { FileText, Lock } from "lucide-react";
import type { FileDefinition } from "@typetrainer/shared";

export function FileTree({
  files,
  activeFile,
  onSelect,
}: {
  files: FileDefinition[];
  activeFile: string;
  onSelect: (path: string) => void;
}) {
  return (
    <div className="flex flex-col border-r border-neutral-200 bg-neutral-50 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
      <span className="mb-1 px-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
        Files
      </span>
      {files.map((file) => {
        const isActive = file.path === activeFile;
        return (
          <button
            key={file.path}
            onClick={() => onSelect(file.path)}
            className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-left font-mono text-xs transition-colors ${
              isActive
                ? "bg-accent-green/10 text-accent-green"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{file.path}</span>
            {file.readOnly && (
              <Lock className="ml-auto h-3 w-3 shrink-0 text-neutral-400 dark:text-neutral-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
