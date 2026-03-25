import type { CourseModule } from "../../../types";
import { meta } from "./meta";
import { lesson as lesson01 } from "./01-hello-world";
import { lesson as lesson02 } from "./02-comments";
import { lesson as lesson03 } from "./03-strings";
import { lesson as lesson04 } from "./04-numbers";
import { lesson as lesson05 } from "./05-variables";
import { lesson as lesson06 } from "./06-f-strings";
import { lesson as lesson07 } from "./07-input";
import { lesson as lesson08 } from "./08-challenge";

export const module01: CourseModule = {
  meta,
  lessons: [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08],
};
