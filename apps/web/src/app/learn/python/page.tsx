"use client";

import Link from "next/link";
import { Terminal, ChevronRight, Trophy, Check } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { pythonCourse } from "@typetrainer/shared";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavAuthButtons } from "@/components/auth-buttons";
import type { CourseModule, LessonDefinition } from "@typetrainer/shared";

function LessonRow({ lesson, completed }: { lesson: LessonDefinition; completed: boolean }) {
  const isChallenge = lesson.type === "challenge";

  return (
    <Link
      href={`/learn/python/${lesson.moduleId}/${lesson.id.split("/").pop()}`}
      className="group flex cursor-pointer items-center justify-between border-b border-neutral-200 bg-white px-5 py-3.5 transition-colors last:border-b-0 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-7 w-7 items-center justify-center font-mono text-xs text-neutral-400 dark:text-neutral-500">
          {completed ? (
            <Check className="h-4 w-4 text-accent-green" />
          ) : isChallenge ? (
            <Trophy className="h-4 w-4 text-accent-amber" />
          ) : (
            String(lesson.order).padStart(2, "0")
          )}
        </span>
        <div>
          <span
            className={`text-sm font-medium ${completed ? "text-neutral-400 dark:text-neutral-500" : ""}`}
          >
            {lesson.title}
          </span>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{lesson.description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-neutral-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-green dark:text-neutral-600" />
    </Link>
  );
}

function ModuleCard({ module, completedIds }: { module: CourseModule; completedIds: Set<string> }) {
  const lessonCount = module.lessons.length;
  const completedCount = module.lessons.filter((l) => completedIds.has(l.id)).length;

  return (
    <div className="border border-neutral-200 dark:border-neutral-800">
      {/* module header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
              Module {module.meta.order}
            </span>
            <h2 className="mt-0.5 text-lg font-bold tracking-tight">{module.meta.title}</h2>
          </div>
          <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
            <span className="text-accent-green">{completedCount}</span>/{lessonCount}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {module.meta.description}
        </p>
        {/* Progress bar */}
        {completedCount > 0 && (
          <div className="mt-3 h-1 w-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full bg-accent-green transition-all duration-300"
              style={{ width: `${(completedCount / lessonCount) * 100}%` }}
            />
          </div>
        )}
      </div>
      {/* lesson list */}
      <div>
        {module.lessons.map((lesson) => (
          <LessonRow key={lesson.id} lesson={lesson} completed={completedIds.has(lesson.id)} />
        ))}
      </div>
    </div>
  );
}

export default function PythonCoursePage() {
  const totalLessons = pythonCourse.reduce((sum, m) => sum + m.lessons.length, 0);

  const progress = useQuery(api.progress.get, { languageId: "python" });
  const completedIds = new Set((progress ?? []).map((p) => p.lessonId));
  const completedCount = completedIds.size;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-neutral-300 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent-green" />
              <span className="font-mono text-sm font-bold uppercase tracking-widest">
                TypeTrainer
              </span>
            </Link>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
              / Python
            </span>
          </div>
          <div className="flex items-center gap-3">
            <NavAuthButtons />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Python</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            {completedCount > 0 ? (
              <>
                <span className="text-accent-green">{completedCount}</span>/{totalLessons} lessons
                completed across {pythonCourse.length}{" "}
                {pythonCourse.length === 1 ? "module" : "modules"}.
              </>
            ) : (
              <>
                {totalLessons} lessons across {pythonCourse.length}{" "}
                {pythonCourse.length === 1 ? "module" : "modules"}. From zero to confident.
              </>
            )}
          </p>
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-8">
          {pythonCourse.map((module) => (
            <ModuleCard key={module.meta.id} module={module} completedIds={completedIds} />
          ))}
        </div>
      </main>
    </div>
  );
}
