import { z } from 'zod';
import { PROJECT_CATEGORIES } from '@core/constants/project-category.constants';
import { createBilingualArraySchema, createBilingualTextSchema } from '@core/utils/helpers/bilingual-schema.helper';
import { OptionalUrlSchema, UrlSchema } from '../../common/url.schema';

const ProjectIdSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    'El id debe estar en minúsculas y usar guiones para separar palabras (kebab-case), ej: "channel-scheduling-system"'
  )
  .min(3, 'El id debe tener al menos 3 caracteres')
  .max(60, 'El id no puede exceder 60 caracteres');

const PeriodTextSchema = z
  .string()
  .min(3, 'El período debe tener al menos 3 caracteres')
  .max(60, 'El período no puede exceder 60 caracteres')
  .refine((value) => value === 'revisar' || /^[\p{L}0-9À-ÿ\s\-–.,()]+$/u.test(value), {
    message:
      'El período solo puede contener letras, números, espacios y los signos - – . , ( ), o el texto "revisar" si aún no está confirmado',
  });

const ProjectPeriodSchema = z.object({
  es: PeriodTextSchema,
  en: PeriodTextSchema,
});

const StackItemSchema = z
  .string()
  .min(1, 'El nombre de la tecnología no puede estar vacío')
  .max(40, 'El nombre de la tecnología no puede exceder 40 caracteres')
  .regex(/^[\p{L}0-9À-ÿ\s.#+/()-]+$/u, 'El nombre de la tecnología contiene caracteres no permitidos');

const ProjectStackSchema = z
  .array(StackItemSchema)
  .min(1, 'El proyecto debe tener al menos 1 tecnología en el stack')
  .max(15, 'El stack no puede tener más de 15 tecnologías');

const ProjectRepoSchema = z.object({
  title: createBilingualTextSchema(1, 60, 'título del repositorio'),
  url: UrlSchema,
});

const ProjectReposSchema = z
  .array(ProjectRepoSchema)
  .min(1, 'El proyecto debe tener al menos 1 repositorio asociado')
  .max(5, 'El proyecto no puede tener más de 5 repositorios asociados');

export const ProjectSchema = z.object({
  id: ProjectIdSchema,
  name: createBilingualTextSchema(3, 150, 'nombre'),
  category: z.enum(PROJECT_CATEGORIES, `La categoría debe ser una de: ${PROJECT_CATEGORIES.join(', ')}`),
  featured: z.boolean('El campo "destacado" debe ser un valor booleano (true/false)'),
  order: z
    .number()
    .int('El campo "orden" debe ser un número entero')
    .positive('El campo "orden" debe ser un número positivo'),
  role: createBilingualTextSchema(3, 150, 'rol'),
  period: ProjectPeriodSchema,
  shortDescription: createBilingualTextSchema(20, 220, 'descripción corta'),
  detailedDescription: createBilingualTextSchema(50, 1300, 'descripción detallada'),
  stack: ProjectStackSchema,
  highlights: createBilingualArraySchema(1, 10, 10, 260, 'destacados'),
  repos: ProjectReposSchema,
  demoUrl: OptionalUrlSchema,
  videoUrl: OptionalUrlSchema,
  imageUrl: OptionalUrlSchema,
});

export const ProjectsResponseSchema = z.array(ProjectSchema);