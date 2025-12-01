/* eslint-disable prettier/prettier */
import { WorkoutPlan } from './workout-plan';
import { Progression } from './progression';

export type User = {
    Id: string;
    Gender: string;
    Name: string;
    Email: string;
    Age: number;
    Weight: number;
    Height: number;
    Password: string;

    WorkoutPlans: WorkoutPlan[];
    Progressions: Progression[];
};