import z from "zod";
import { SkillCategorySchema, SkillsResponseSchema } from "./skill-response.schema";

export type GetSkillsResponseDTO = z.infer<typeof SkillsResponseSchema>;

export type GetSkillCategoryDTO = z.infer<typeof SkillCategorySchema>;