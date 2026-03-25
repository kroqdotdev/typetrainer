export type Language = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  available: boolean;
};

export type FileDefinition = {
  path: string;
  content: string;
  readOnly?: boolean;
};

export type LessonDefinition = {
  id: string;
  moduleId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  type: "guided" | "challenge";

  explanation: string;
  task: string;

  starterFiles: FileDefinition[];
  solutionFiles: FileDefinition[];

  expectedOutput?: string;
  testFile?: FileDefinition;

  hints: string[];
};

export type ModuleMeta = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
};

export type CourseModule = {
  meta: ModuleMeta;
  lessons: LessonDefinition[];
};
