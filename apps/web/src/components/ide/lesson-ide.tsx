"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Play, RotateCcw, Lightbulb, Eye, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import type { LessonDefinition, FileDefinition } from "@typetrainer/shared";
import { FileTree } from "./file-tree";
import { CodeEditor } from "./editor";
import { OutputPanel, type RunStatus } from "./output-panel";
import { runPython, validateOutput, runTestFile } from "./pyodide-runner";
import ReactMarkdown from "react-markdown";

export function LessonIDE({
  lesson,
  onComplete,
  onNext,
  onPrev,
  hasPrev,
}: {
  lesson: LessonDefinition;
  onComplete: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev: boolean;
}) {
  // File state — clone starter files so we can edit them
  const [files, setFiles] = useState<FileDefinition[]>(() =>
    lesson.starterFiles.map((f) => ({ ...f })),
  );
  const [activeFile, setActiveFile] = useState(files[0]?.path ?? "");

  // Theme
  const { resolvedTheme } = useTheme();
  const editorTheme = resolvedTheme === "light" ? "light" : "dark";

  // IDE state
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [autocomplete, setAutocomplete] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [panelView, setPanelView] = useState<"explanation" | "editor">("explanation");

  const currentFile = files.find((f) => f.path === activeFile);

  const updateFile = useCallback(
    (content: string) => {
      setFiles((prev) => prev.map((f) => (f.path === activeFile ? { ...f, content } : f)));
    },
    [activeFile],
  );

  const handleReset = useCallback(() => {
    setFiles(lesson.starterFiles.map((f) => ({ ...f })));
    setOutput("");
    setStatus("idle");
    setHintsRevealed(0);
    setShowSolution(false);
  }, [lesson.starterFiles]);

  const handleRun = useCallback(async () => {
    setStatus("running");
    setOutput("");

    try {
      if (lesson.expectedOutput) {
        const result = await validateOutput(files, lesson.expectedOutput);
        setOutput(result.stdout + (result.stderr ? "\n" + result.stderr : ""));
        if (result.passed) {
          setStatus("success");
          onComplete();
        } else {
          setStatus("error");
        }
      } else if (lesson.testFile) {
        const result = await runTestFile(files, lesson.testFile);
        setOutput(result.stdout + (result.stderr ? "\n" + result.stderr : ""));
        if (result.passed) {
          setStatus("success");
          onComplete();
        } else {
          setStatus("error");
        }
      } else {
        // No validation — just run
        const result = await runPython(files);
        setOutput(result.stdout + (result.stderr ? "\n" + result.stderr : ""));
        setStatus(result.success ? "success" : "error");
      }
    } catch (err) {
      setOutput(String(err));
      setStatus("error");
    }
  }, [files, lesson, onComplete]);

  const handleRevealSolution = useCallback(() => {
    if (!showSolution) {
      setShowSolution(true);
      setFiles(lesson.solutionFiles.map((f) => ({ ...f })));
    }
  }, [showSolution, lesson.solutionFiles]);

  const btnBase =
    "cursor-pointer flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-all duration-150";

  return (
    <div className="flex h-[calc(100vh-49px)] flex-col lg:flex-row">
      {/* Mobile tab toggle */}
      <div className="flex border-b border-neutral-200 lg:hidden dark:border-neutral-800">
        <button
          onClick={() => setPanelView("explanation")}
          className={`flex-1 cursor-pointer py-2.5 text-center font-mono text-xs ${panelView === "explanation" ? "bg-accent-green/10 text-accent-green" : "text-neutral-500"}`}
        >
          Lesson
        </button>
        <button
          onClick={() => setPanelView("editor")}
          className={`flex-1 cursor-pointer py-2.5 text-center font-mono text-xs ${panelView === "editor" ? "bg-accent-green/10 text-accent-green" : "text-neutral-500"}`}
        >
          Editor
        </button>
      </div>

      {/* Left panel — explanation */}
      <div
        className={`overflow-y-auto border-r border-neutral-200 bg-white p-6 lg:block lg:w-[420px] lg:shrink-0 dark:border-neutral-800 dark:bg-neutral-950 ${panelView === "explanation" ? "block" : "hidden"}`}
      >
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          {hasPrev && onPrev ? (
            <button
              onClick={onPrev}
              className="cursor-pointer font-mono text-xs text-neutral-400 transition-colors hover:text-accent-green"
            >
              <ChevronLeft className="inline h-3 w-3" /> prev
            </button>
          ) : (
            <span />
          )}
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {lesson.type === "challenge" ? "Challenge" : `Lesson ${lesson.order}`}
          </span>
          {onNext ? (
            <button
              onClick={onNext}
              className="cursor-pointer font-mono text-xs text-neutral-400 transition-colors hover:text-accent-green"
            >
              next <ChevronRight className="inline h-3 w-3" />
            </button>
          ) : (
            <span />
          )}
        </div>

        <h1 className="text-xl font-bold tracking-tight">{lesson.title}</h1>

        {/* Explanation */}
        <div className="prose prose-sm prose-neutral mt-4 max-w-none dark:prose-invert">
          <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
        </div>

        {/* Task */}
        <div className="mt-6 border-l-2 border-accent-green/30 pl-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
            Task
          </span>
          <div className="prose prose-sm prose-neutral mt-1 max-w-none dark:prose-invert">
            <ReactMarkdown>{lesson.task}</ReactMarkdown>
          </div>
        </div>

        {/* Hints */}
        {lesson.hints.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setHintsRevealed((h) => Math.min(h + 1, lesson.hints.length))}
              disabled={hintsRevealed >= lesson.hints.length}
              className={`${btnBase} border-neutral-200 text-neutral-500 hover:border-accent-amber hover:text-accent-amber disabled:opacity-30 dark:border-neutral-700`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {hintsRevealed === 0
                ? "Show hint"
                : hintsRevealed < lesson.hints.length
                  ? `Hint ${hintsRevealed}/${lesson.hints.length} — show next`
                  : `All hints revealed`}
            </button>
            {hintsRevealed > 0 && (
              <div className="mt-3 flex flex-col gap-2">
                {lesson.hints.slice(0, hintsRevealed).map((hint, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-accent-amber/30 bg-accent-amber/5 py-2 pl-3 pr-3 font-mono text-xs text-neutral-600 dark:text-neutral-400"
                  >
                    {hint}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Solution reveal */}
        {lesson.solutionFiles.length > 0 && (
          <div className="mt-4">
            {showSolution ? (
              <span className="font-mono text-xs text-neutral-400">Solution applied to editor</span>
            ) : (
              <button
                onClick={handleRevealSolution}
                className={`${btnBase} border-neutral-200 text-neutral-500 hover:border-accent-rose hover:text-accent-rose dark:border-neutral-700`}
              >
                <Eye className="h-3.5 w-3.5" />
                Reveal solution
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right panel — IDE */}
      <div
        className={`flex flex-1 flex-col overflow-hidden lg:block ${panelView === "editor" ? "block" : "hidden"}`}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={status === "running"}
              className={`${btnBase} border-accent-green bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-black disabled:opacity-50`}
            >
              <Play className="h-3.5 w-3.5" />
              Run
            </button>
            <button
              onClick={handleReset}
              className={`${btnBase} border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:text-neutral-300`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
          <button
            onClick={() => setAutocomplete((a) => !a)}
            className={`${btnBase} ${autocomplete ? "border-accent-violet bg-accent-violet/10 text-accent-violet" : "border-neutral-200 text-neutral-400 dark:border-neutral-700"}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Autocomplete
          </button>
        </div>

        {/* Editor area */}
        <div className="flex flex-1 overflow-hidden">
          {/* File tree */}
          <div className="w-40 shrink-0 overflow-y-auto">
            <FileTree files={files} activeFile={activeFile} onSelect={setActiveFile} />
          </div>

          {/* Editor + output split */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              {currentFile && (
                <CodeEditor
                  value={currentFile.content}
                  onChange={updateFile}
                  readOnly={currentFile.readOnly}
                  autocomplete={autocomplete}
                  theme={editorTheme}
                  onRun={handleRun}
                />
              )}
            </div>
            <div className="h-48 shrink-0">
              <OutputPanel output={output} status={status} onNext={onNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
