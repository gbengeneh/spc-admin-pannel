import { z } from 'zod';

export const createCategorySchema = z.object({
  image: z
    .any()
    .refine(file => file instanceof File || (file && file.length === 1), 'Image is required'),

  name: z.string().min(2, { message: 'Name must be at least 2 character long' }),
  intent: z.
    enum(['create', 'update'], {
      message: 'Intent must be either create or opdate'
    })
    .optional(),
  slug: z.string().optional(),
});

export type createCategorySchema = z.infer<typeof createCategorySchema>;


export const createCategorySchemaServer = z.object({
  imageUrl: z.string().min(1, { message: 'Image is required' }),
  name: z.string().min(2, { message: 'Name must be at least 2 character long' }),
});
export type createCategorySchemaServer = z.infer<
  typeof createCategorySchemaServer
>;

export const updateCategorySchema = z.object({
  imageUrl: z.string().min(1, { message: 'Image is required' }),
  name: z.string()
    .min(2, { message: 'Name must be atleast two charaters long' }),
  intent: z.enum(['create', 'update'], {
    message: 'Intent must be either create or update'
  }),
  slug: z.string().min(1, {message: 'Slug is required'}),
});

export type updateCategorySchema = z.infer<
  typeof updateCategorySchema
>;