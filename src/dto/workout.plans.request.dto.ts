/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type CreateWorkoutPlanRequest = {
    UserId: string;
    Name: string;
    Type: string;
    Description?: string | null;
    Frequency?: number | null;
};

// Zod schema – runtime validation
export const CreateWorkoutPlanSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  description: z.string().nullable().optional(),
  frequency: z.number().int().nullable().optional(),
});