/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type CalendarResponseDto = {
    id: string;
    workoutPlanId: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

// Validation
export const CalendarEventResponseSchema = z.object({
    id: z.string().min(1),
    workoutPlanId: z.string().min(1),
    title: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date(),
    allDay: z.boolean(),
});
