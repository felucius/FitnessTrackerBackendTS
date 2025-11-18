/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Zod schema – runtime validation
export const CreateProgressionSchema = z.object({
    UniqueExerciseId: z.string().min(1),
    UserId: z.string().min(1),
    ExerciseId: z.string().min(1),
    Date: z.coerce.date(),
    Weight: z.number().min(0),
    Reps: z.number().min(0),
});

export type CreateProgressionRequest = z.infer<typeof CreateProgressionSchema>;