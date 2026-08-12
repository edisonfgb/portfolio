import { z } from 'zod';
import {
  createBilingualArraySchema,
  createBilingualTextSchema,
  createNullableBilingualTextSchema,
} from '@core/utils/helpers/bilingual-schema.helper';
import { OptionalUrlSchema } from '../../../../shared/common/url.schema';

const EducationIdSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    'El id debe estar en minúsculas y usar guiones para separar palabras (kebab-case), ej: "uptc-ingenieria-sistemas"'
  )
  .min(3, 'El id debe tener al menos 3 caracteres')
  .max(60, 'El id no puede exceder 60 caracteres');

const InstitutionSchema = z
  .string()
  .min(3, 'El nombre de la institución debe tener al menos 3 caracteres')
  .max(150, 'El nombre de la institución no puede exceder 150 caracteres');

const PeriodTextSchema = z
  .string()
  .min(3, 'El período debe tener al menos 3 caracteres')
  .max(60, 'El período no puede exceder 60 caracteres')
  .refine((value) => value === 'revisar' || /^[\p{L}0-9À-ÿ\s\-–.,()]+$/u.test(value), {
    message:
      'El período solo puede contener letras, números, espacios y los signos - – . , ( ), o el texto "revisar" si aún no está confirmado',
  });

const EducationPeriodSchema = z.object({
  es: PeriodTextSchema,
  en: PeriodTextSchema,
});

const GradeSchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, 'La nota debe ser un número decimal válido, ej: "4.3"')
  .nullable();

export const EducationSchema = z.object({
  id: EducationIdSchema,
  institution: InstitutionSchema,
  title: createBilingualTextSchema(3, 150, 'título'),
  period: EducationPeriodSchema,
  description: createNullableBilingualTextSchema(20, 900, 'descripción'),
  areas: createBilingualArraySchema(0, 10, 10, 300, 'áreas de profundización'),
  grade: GradeSchema,
  logoUrl: OptionalUrlSchema,
  featured: z.boolean('El campo "destacado" debe ser un valor booleano (true/false)'),
  order: z
    .number()
    .int('El campo "orden" debe ser un número entero')
    .positive('El campo "orden" debe ser un número positivo'),
});

export const EducationResponseSchema = z.array(EducationSchema);