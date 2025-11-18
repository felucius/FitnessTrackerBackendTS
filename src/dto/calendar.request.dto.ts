/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Validation
export const CalendarEventRequestSchema = z.object({
    Title: z.string().min(1),
    WorkoutPlanId: z.string().min(1),
    Start: z.coerce.date(),
    End: z.coerce.date(),
    AllDay: z.boolean(),
});

export type CreateCalendarEventRequest = z.infer<typeof CalendarEventRequestSchema>;