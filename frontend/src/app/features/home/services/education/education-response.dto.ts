import z from "zod";
import { EducationResponseSchema, EducationSchema } from "./education-response.schema";

export type GetEducationResponseDTO = z.infer<typeof EducationResponseSchema>;

export type GetEducationDTO = z.infer<typeof EducationSchema>;