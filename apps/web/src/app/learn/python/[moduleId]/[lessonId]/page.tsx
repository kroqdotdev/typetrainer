"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { pythonCourse } from "@typetrainer/shared";
import { LessonIDE } from "@/components/ide/lesson-ide";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LessonPage() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const router = useRouter();

  const { lesson, allLessons, lessonIndex } = useMemo(() => {
    const allLessons = pythonCourse.flatMap((m) => m.lessons);
    const fullId = `python/${params.moduleId}/${params.lessonId}`;
    const lessonIndex = allLessons.findIndex((l) => l.id === fullId);
    return {
      lesson: lessonIndex >= 0 ? allLessons[lessonIndex] : null,
      allLessons,
      lessonIndex,
    };
  }, [params.moduleId, params.lessonId]);

  const progress = useQuery(api.progress.get, { languageId: "python" });
  const completedIds = useMemo(() => new Set((progress ?? []).map((p) => p.lessonId)), [progress]);

  const completeMutation = useMutation(api.progress.complete);

  const handleComplete = useCallback(() => {
    if (!lesson) return;
    if (completedIds.has(lesson.id)) return;
    completeMutation({ languageId: "python", lessonId: lesson.id });
  }, [lesson, completedIds, completeMutation]);

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-neutral-500">Lesson not found</p>
          <Link
            href="/learn/python"
            className="mt-4 inline-block font-mono text-xs text-accent-green hover:underline"
          >
            Back to course
          </Link>
        </div>
      </div>
    );
  }

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  const navigateTo = (l: (typeof allLessons)[number]) => {
    const parts = l.id.split("/");
    router.push(`/learn/python/${parts[1]}/${parts[2]}`);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Nav */}
      <nav className="shrink-0 border-b border-neutral-300 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent-green" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                TypeTrainer
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <Link
              href="/learn/python"
              className="font-mono text-xs text-neutral-400 transition-colors hover:text-accent-green"
            >
              Python
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="font-mono text-xs text-neutral-600 dark:text-neutral-300">
              {lesson.title}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* IDE */}
      <LessonIDE
        lesson={lesson}
        onComplete={handleComplete}
        onNext={nextLesson ? () => navigateTo(nextLesson) : undefined}
        onPrev={prevLesson ? () => navigateTo(prevLesson) : undefined}
        hasPrev={!!prevLesson}
      />
    </div>
  );
}
