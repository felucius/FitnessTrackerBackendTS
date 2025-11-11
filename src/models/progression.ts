/* eslint-disable prettier/prettier */
import { User } from './user';
import { Exercise } from './exercise';

export type Progression = {
    Id: string;
    UserId: string;
    User: User;
    ExerciseId: string;
    UniqueExerciseId: string;
    Exercise: Exercise;
    Date: Date;
    Weight: number;
    Reps: number;
}