import Link from "next/link";
import { Terminal, ArrowRight, Lock } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
import { languages } from "@typetrainer/shared";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavAuthButtons, HeroAuthButtons } from "@/components/auth-buttons";

function RetroWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-neutral-300 bg-neutral-200 px-3 py-1.5 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{title}</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 border border-neutral-400 bg-accent-amber/60 dark:border-neutral-600" />
          <div className="h-3 w-3 border border-neutral-400 bg-accent-green/60 dark:border-neutral-600" />
          <div className="h-3 w-3 border border-neutral-400 bg-accent-rose/60 dark:border-neutral-600" />
        </div>
      </div>
      {/* content */}
      <div className="relative scanlines">{children}</div>
    </div>
  );
}

function CodePreview() {
  return (
    <RetroWindow title="hello.py">
      <pre className="overflow-x-auto p-6 font-mono text-sm leading-loose">
        <code>
          <span className="text-neutral-400">{"# your first program"}</span>
          {"\n"}
          <span className="text-accent-violet">def</span>{" "}
          <span className="text-accent-amber">greet</span>
          <span className="text-neutral-400">{"(name):"}</span>
          {"\n"}
          {"    "}
          <span className="text-accent-violet">return</span>{" "}
          <span className="text-accent-green">
            {'f"Hello, '}
            <span className="text-accent-cyan">{"{name}"}</span>
            {'!"'}
          </span>
          {"\n\n"}
          <span className="text-neutral-200 dark:text-neutral-200">message</span>
          <span className="text-neutral-500">{" = "}</span>
          <span className="text-accent-amber">greet</span>
          {"("}
          <span className="text-accent-green">{'"World"'}</span>
          {")"}
          {"\n"}
          <span className="text-accent-cyan">print</span>
          <span className="text-neutral-300">{"(message)"}</span>
          {"\n\n"}
          <span className="text-neutral-500">{"# → Hello, World!"}</span>
        </code>
      </pre>
    </RetroWindow>
  );
}

function TerminalOutput() {
  return (
    <RetroWindow title="terminal">
      <div className="p-6 font-mono text-sm">
        <div className="text-neutral-400">
          <span className="text-accent-green">$</span> python hello.py
        </div>
        <div className="mt-1 text-accent-green">Hello, World!</div>
        <div className="mt-3 text-neutral-400">
          <span className="text-accent-green">$</span>
          <span className="animate-blink ml-1 inline-block h-4 w-2 bg-accent-green align-middle" />
        </div>
      </div>
    </RetroWindow>
  );
}

function LanguageCard({ language }: { language: (typeof languages)[number] }) {
  const available = language.available;

  if (available) {
    return (
      <Link
        href={`/learn/${language.slug}`}
        className="group relative cursor-pointer border-l-2 bg-white py-4 pl-5 pr-4 transition-all duration-150 hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900"
        style={{ borderLeftColor: language.color }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
              {language.name}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {language.description}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent-green" />
        </div>
      </Link>
    );
  }

  return (
    <div
      className="relative border-l-2 py-4 pl-5 pr-4 opacity-40"
      style={{ borderLeftColor: language.color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{language.name}</h3>
          <p className="mt-1 text-xs text-neutral-500">{language.description}</p>
        </div>
        <Lock className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-600" />
      </div>
    </div>
  );
}

export default function Home() {
  const comingSoon = languages.filter((l) => !l.available);

  return (
    <div className="bg-grid dark:bg-grid bg-grid-light min-h-screen">
      {/* Nav — menu bar style */}
      <nav className="border-b border-neutral-300 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent-green" />
              <span className="font-mono text-sm font-bold uppercase tracking-widest">
                TypeTrainer
              </span>
            </div>
            <div className="hidden items-center gap-1 font-mono text-xs text-neutral-400 sm:flex">
              <span className="border border-transparent px-2 py-1 transition-colors hover:border-neutral-300 hover:text-neutral-600 dark:hover:border-neutral-700 dark:hover:text-neutral-300">
                Python
              </span>
              <span className="px-2 py-1 text-neutral-300 dark:text-neutral-600">Docs</span>
              <span className="px-2 py-1 text-neutral-300 dark:text-neutral-600">About</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NavAuthButtons />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="pb-20 pt-20 lg:pb-28 lg:pt-32">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* text — takes 3 cols */}
            <div className="flex flex-col justify-center lg:col-span-3">
              <h1 className="text-6xl font-bold uppercase leading-none tracking-tighter md:text-7xl lg:text-8xl">
                Learn
                <br />
                <span className="text-accent-green">Python</span>
                <span className="animate-blink text-accent-green">_</span>
              </h1>
              <div className="mt-8 max-w-lg border-l-2 border-accent-green/30 pl-4 font-mono text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                <p>
                  <span className="text-accent-green">{">"}</span> Interactive lessons from zero to
                  confident.
                </p>
                <p>
                  <span className="text-accent-green">{">"}</span> Write real code in your browser.
                </p>
                <p>
                  <span className="text-accent-green">{">"}</span> Sign up in one click. Progress
                  syncs everywhere.
                </p>
              </div>
              <div className="mt-10">
                <HeroAuthButtons />
              </div>
            </div>

            {/* code windows — takes 2 cols */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <CodePreview />
              <TerminalOutput />
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="border-t border-neutral-300 py-20 dark:border-neutral-800">
          <div className="mb-10">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
              // roadmap
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">More languages coming</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-800">
            {comingSoon.map((lang) => (
              <LanguageCard key={lang.id} language={lang} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer — taskbar style */}
      <footer className="border-t border-neutral-300 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 dark:text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 bg-accent-green" />
              built by{" "}
              <a
                href="https://kroq.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-neutral-300 transition-colors hover:text-accent-green dark:text-neutral-400 dark:hover:text-accent-green"
              >
                kroq.dev
              </a>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <a
              href="https://github.com/kroqdotdev/typetrainer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-accent-green"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 dark:text-neutral-500">
            <span>
              <span className="text-accent-green">1</span>
              <span className="text-neutral-300 dark:text-neutral-600">/7</span> langs
            </span>
            <span className="font-mono">v0.1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
