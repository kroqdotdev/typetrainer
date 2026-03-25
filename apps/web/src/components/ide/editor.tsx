"use client";

import { useEffect, useRef } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";
import { darkTheme, lightTheme } from "./editor-theme";

const readOnlyComp = new Compartment();
const autocompleteComp = new Compartment();
const themeComp = new Compartment();

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  autocomplete = false,
  theme = "dark",
  onRun,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  autocomplete?: boolean;
  theme?: "dark" | "light";
  onRun?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  onChangeRef.current = onChange;
  onRunRef.current = onRun;

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          python(),
          keymap.of([
            ...defaultKeymap,
            indentWithTab,
            {
              key: "Ctrl-Enter",
              mac: "Cmd-Enter",
              run: () => {
                onRunRef.current?.();
                return true;
              },
            },
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
          }),
          readOnlyComp.of(EditorState.readOnly.of(readOnly)),
          themeComp.of(theme === "dark" ? darkTheme : lightTheme),
          autocompleteComp.of(autocomplete ? autocompletion() : []),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: readOnlyComp.reconfigure(EditorState.readOnly.of(readOnly)),
    });
  }, [readOnly]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: themeComp.reconfigure(theme === "dark" ? darkTheme : lightTheme),
    });
  }, [theme]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: autocompleteComp.reconfigure(autocomplete ? autocompletion() : []),
    });
  }, [autocomplete]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto text-sm [&_.cm-editor]:h-full [&_.cm-editor]:outline-none [&_.cm-scroller]:!font-mono"
    />
  );
}
