import { z } from 'zod';

const PENDING_PLACEHOLDER = 'revisar';

export const UrlSchema = z
  .string()
  .min(1, 'La URL no puede estar vacía')
  .refine((value) => value === PENDING_PLACEHOLDER || /^https?:\/\/[^\s]+$/.test(value), {
    message: `Debe ser una URL válida que empiece por http:// o https://, o el texto "${PENDING_PLACEHOLDER}" si aún no está definida`,
  });

export const OptionalUrlSchema = UrlSchema.nullable();