import { z } from 'zod';
import { createBilingualItemArraySchema, createBilingualTextSchema } from '@core/utils/helpers/bilingual-schema.helper';

const SkillIdSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    'El id debe estar en minúsculas y usar guiones para separar palabras (kebab-case), ej: "frontend"'
  )
  .min(2, 'El id debe tener al menos 2 caracteres')
  .max(60, 'El id no puede exceder 60 caracteres');

export const SkillCategorySchema = z.object({
  id: SkillIdSchema,
  name: createBilingualTextSchema(2, 60, 'nombre de la categoría'),
  featured: z.boolean('El campo "destacado" debe ser un valor booleano (true/false)'),
  order: z
    .number()
    .int('El campo "orden" debe ser un número entero')
    .positive('El campo "orden" debe ser un número positivo'),
  skills: createBilingualItemArraySchema(1, 30, 2, 80, 'habilidad'),
});

export const SkillsResponseSchema = z.array(SkillCategorySchema);