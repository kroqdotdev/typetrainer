"use client";

import { Show, UserButton, SignInButton, SignUpButton, useClerk } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

const signInTrigger = (
  <button className="cursor-pointer border border-neutral-300 px-3 py-1.5 font-mono text-xs text-neutral-500 transition-colors hover:border-accent-green hover:text-accent-green dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-accent-green dark:hover:text-accent-green">
    Sign in
  </button>
);

const signUpTrigger = (
  <button className="cursor-pointer border border-accent-green/50 bg-accent-green/10 px-3 py-1.5 font-mono text-xs text-accent-green transition-colors hover:bg-accent-green hover:text-black">
    Sign up
  </button>
);

export function NavAuthButtons() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">{signInTrigger}</SignInButton>
        <SignUpButton mode="modal">{signUpTrigger}</SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
}

const heroBtnBase =
  "cursor-pointer flex items-center gap-3 border px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-150 glow-green-sm border-accent-green bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-black";

export function HeroAuthButtons() {
  const clerk = useClerk();

  return (
    <>
      <Show when="signed-out">
        <button onClick={() => clerk.openSignUp({})} className={heroBtnBase}>
          Sign up with
          <span className="flex items-center gap-2">
            <GoogleIcon className="h-4 w-4" />
            <GitHubIcon className="h-4 w-4" />
            <AppleIcon className="h-4 w-4" />
          </span>
        </button>
      </Show>
      <Show when="signed-in">
        <Link href="/learn/python" className={`${heroBtnBase} group`}>
          Start learning
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      </Show>
    </>
  );
}
