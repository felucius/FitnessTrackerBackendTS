/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Zod schema – runtime validation
export const CreateProgressionSchema = z.object({
    uniqueExerciseId: z.string().min(1),
    userId: z.string().min(1),
    exerciseId: z.string().min(1),
    date: z.coerce.date(),
    weight: z.number().min(0),
    reps: z.number().min(0),
});

export type CreateProgressionRequest = z.infer<typeof CreateProgressionSchema>;