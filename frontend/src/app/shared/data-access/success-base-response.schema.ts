import { z } from 'zod';

const messageSchema = z.string()
  .min(1, 'El mensaje es requerido')
  .max(300, 'El mensaje no puede exceder 300 caracteres');

export const BaseSuccessResponseSchema = z.object({
  message: messageSchema.optional(),
});

export type BaseSuccessResponseDTO = z.infer<typeof BaseSuccessResponseSchema>;

export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  BaseSuccessResponseSchema.extend({
    data: dataSchema.optional(),
  });

export type SuccessResponseDTO<T> = BaseSuccessResponseDTO & { data?: T };

export type SuccessResponseWithRequiredData<T> = BaseSuccessResponseDTO & { data: T };