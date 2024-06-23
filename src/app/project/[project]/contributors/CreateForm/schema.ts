// Lib Imports.
import z from 'zod';

// Schema.
const Schema = z.object({
  name: z
    .string({ required_error: 'A contributor is required.' })
    .trim()
    .min(1, { message: 'A contributor is required.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Contribution Description is required.' })
    .min(20, { message: 'Contribution Description must be 20 characters long.' })
    .max(150, { message: 'Contribution Description cannot exceed 150 characters.' }),
});

// Type.
type SchemaT = z.infer<typeof Schema>;

// Exports.
export { Schema, type SchemaT };
