/* eslint-disable prettier/prettier */
import { User } from './user';
import { Exercise } from './exercise';
import { CalendarEvent } from './calendar-event';

export type WorkoutPlan = {
    Id: string;
    UserId: string;
    User: User;
    Name: string;
    Type: string;
    Description: string;
    Frequency: number;
    Exercises: Exercise[];
    CalendarEvents: CalendarEvent[];
};
