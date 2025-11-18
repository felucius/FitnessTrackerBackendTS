/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type CalendarResponseDto = {
    Id: string;
    WorkoutPlanId: string;
    Title: string;
    Start: Date;
    End: Date;
    AllDay: boolean;
}

// Validation
export const CalendarEventResponseSchema = z.object({
    Id: z.string().min(1),
    WorkoutPlanId: z.string().min(1),
    Title: z.string().min(1),
    Start: z.coerce.date(),
    End: z.coerce.date(),
    AllDay: z.boolean(),
});
