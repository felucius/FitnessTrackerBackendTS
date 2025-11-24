/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Validation
export const CalendarEventRequestSchema = z.object({
    title: z.string().min(1),
    workoutPlanId: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date(),
    allDay: z.boolean(),
});

export type CreateCalendarEventRequest = z.infer<typeof CalendarEventRequestSchema>;