// Lib Imports.
import z from 'zod';

// Schema.
const Schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Project Title is required.' })
    .min(4, { message: 'Project Title must be 4 characters long.' })
    .max(20, { message: 'Project Title cannot exceed 20 characters.' }),
  images:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length > 0, 'At least one image is required.'),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Project Description is required.' })
    .min(20, { message: 'Project Description must be 20 characters long.' })
    .max(500, { message: 'Project Description cannot exceed 500 characters.' }),
  status: z.string().min(1, { message: 'Project Status is required.' }),
  url: z.string().optional(),
  tags: z.string().array().min(1, { message: 'Please select at least one tag for better SEO.' }),
});

// Type.
type SchemaT = z.infer<typeof Schema>;

// Exports.
export { Schema, type SchemaT };
