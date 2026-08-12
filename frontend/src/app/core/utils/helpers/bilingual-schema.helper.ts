import { z } from 'zod';

export function createBilingualTextSchema(min: number, max: number, field: string) {
  const text = z
    .string()
    .min(min, `El campo "${field}" debe tener al menos ${min} caracteres`)
    .max(max, `El campo "${field}" no puede exceder ${max} caracteres`);

  return z.object({
    es: text,
    en: text,
  });
}

export function createNullableBilingualTextSchema(min: number, max: number, field: string) {
  const text = z
    .string()
    .min(min, `El campo "${field}" debe tener al menos ${min} caracteres`)
    .max(max, `El campo "${field}" no puede exceder ${max} caracteres`)
    .nullable();

  return z.object({
    es: text,
    en: text,
  });
}

export function createBilingualArraySchema(
  minItems: number,
  maxItems: number,
  minLen: number,
  maxLen: number,
  field: string
) {
  const item = z
    .string()
    .min(minLen, `Cada elemento de "${field}" debe tener al menos ${minLen} caracteres`)
    .max(maxLen, `Cada elemento de "${field}" no puede exceder ${maxLen} caracteres`);

  const array = z
    .array(item)
    .min(minItems, `"${field}" debe tener al menos ${minItems} elemento(s)`)
    .max(maxItems, `"${field}" no puede tener más de ${maxItems} elementos`);

  return z.object({
    es: array,
    en: array,
  });
}

export function createBilingualItemArraySchema(
  minItems: number,
  maxItems: number,
  minLen: number,
  maxLen: number,
  field: string
) {
  const item = createBilingualTextSchema(minLen, maxLen, field);

  return z
    .array(item)
    .min(minItems, `"${field}" debe tener al menos ${minItems} elemento(s)`)
    .max(maxItems, `"${field}" no puede tener más de ${maxItems} elementos`);
}