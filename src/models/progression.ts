/* eslint-disable prettier/prettier */
import { Exercise } from './exercise';

export type Progression = {
    Id: string;
    UserId: string;
    UniqueExerciseId: string;
    ExerciseId: string;
    Exercise: Exercise;
    Date: Date;
    Weight: number;
    Reps: number;
}