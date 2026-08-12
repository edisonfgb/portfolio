import z from "zod";
import { ProjectSchema, ProjectsResponseSchema } from "./project-response.schema";

export type ProjectsResponseDTO = z.infer<typeof ProjectsResponseSchema>;

export type ProjectDTO = z.infer<typeof ProjectSchema>;
