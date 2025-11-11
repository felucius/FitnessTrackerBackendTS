/* eslint-disable prettier/prettier */
import { WorkoutPlan } from './workout-plan';

export type CalendarEvent = {
    Id: string;
    Title: string;
    WorkoutPlanId: string;
    WorkoutPlan: WorkoutPlan;
    Start: Date;
    End: Date;
    AllDay: boolean;
};