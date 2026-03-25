import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

/**
 * Dark theme — OLED black background with vibrant neon syntax colors.
 */
const darkEditorTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#0a0a0a",
      color: "#d4d4d4",
    },
    ".cm-content": {
      caretColor: "#00ffaa",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#00ffaa",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: "#00ffaa20",
    },
    ".cm-gutters": {
      backgroundColor: "#0a0a0a",
      color: "#525252",
      borderRight: "1px solid #262626",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#171717",
      color: "#a3a3a3",
    },
    ".cm-activeLine": {
      backgroundColor: "#17171780",
    },
    ".cm-matchingBracket": {
      backgroundColor: "#00ffaa20",
      outline: "1px solid #00ffaa40",
    },
  },
  { dark: true },
);

const darkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#c084fc" },
  { tag: tags.controlKeyword, color: "#c084fc" },
  { tag: tags.operator, color: "#d4d4d4" },
  { tag: tags.definition(tags.variableName), color: "#00e5ff" },
  { tag: tags.function(tags.variableName), color: "#ffd600" },
  { tag: tags.variableName, color: "#e0e0e0" },
  { tag: tags.string, color: "#00ffaa" },
  { tag: tags.number, color: "#ff8a65" },
  { tag: tags.bool, color: "#c084fc" },
  { tag: tags.null, color: "#c084fc" },
  { tag: tags.comment, color: "#737373" },
  { tag: tags.className, color: "#00e5ff" },
  { tag: tags.propertyName, color: "#e0e0e0" },
  { tag: tags.typeName, color: "#00e5ff" },
  { tag: tags.self, color: "#ff3366" },
  { tag: tags.punctuation, color: "#a3a3a3" },
  { tag: tags.paren, color: "#a3a3a3" },
  { tag: tags.bracket, color: "#a3a3a3" },
  { tag: tags.brace, color: "#a3a3a3" },
  { tag: tags.meta, color: "#737373" },
  { tag: tags.atom, color: "#c084fc" },
]);

export const darkTheme = [darkEditorTheme, syntaxHighlighting(darkHighlightStyle)];

/**
 * Light theme — clean white background with saturated readable syntax colors.
 */
const lightEditorTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#ffffff",
      color: "#1a1a1a",
    },
    ".cm-content": {
      caretColor: "#059669",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#059669",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: "#05966920",
    },
    ".cm-gutters": {
      backgroundColor: "#fafafa",
      color: "#a3a3a3",
      borderRight: "1px solid #e5e5e5",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f5f5f5",
      color: "#525252",
    },
    ".cm-activeLine": {
      backgroundColor: "#f5f5f580",
    },
    ".cm-matchingBracket": {
      backgroundColor: "#05966920",
      outline: "1px solid #05966940",
    },
  },
  { dark: false },
);

const lightHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#7c3aed" },
  { tag: tags.controlKeyword, color: "#7c3aed" },
  { tag: tags.operator, color: "#525252" },
  { tag: tags.definition(tags.variableName), color: "#0891b2" },
  { tag: tags.function(tags.variableName), color: "#b45309" },
  { tag: tags.variableName, color: "#1a1a1a" },
  { tag: tags.string, color: "#059669" },
  { tag: tags.number, color: "#c2410c" },
  { tag: tags.bool, color: "#7c3aed" },
  { tag: tags.null, color: "#7c3aed" },
  { tag: tags.comment, color: "#a3a3a3" },
  { tag: tags.className, color: "#0891b2" },
  { tag: tags.propertyName, color: "#1a1a1a" },
  { tag: tags.typeName, color: "#0891b2" },
  { tag: tags.self, color: "#e11d48" },
  { tag: tags.punctuation, color: "#737373" },
  { tag: tags.paren, color: "#737373" },
  { tag: tags.bracket, color: "#737373" },
  { tag: tags.brace, color: "#737373" },
  { tag: tags.meta, color: "#a3a3a3" },
  { tag: tags.atom, color: "#7c3aed" },
]);

export const lightTheme = [lightEditorTheme, syntaxHighlighting(lightHighlightStyle)];
