export type Language = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  available: boolean;
};

export type Lesson = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
};

export type UserProgress = {
  completedLessons: string[];
  currentLanguage: string | null;
  currentLesson: string | null;
  lastUpdated: number;
};
