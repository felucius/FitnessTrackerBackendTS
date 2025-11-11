/* eslint-disable prettier/prettier */
import { WorkoutPlan } from './workout-plan';
import { Progression } from './progression';

export type Exercise = {
        UniqueExerciseId: string;
        ExerciseId: string;
        WorkoutPlanId:string;
        WorkoutPlan: WorkoutPlan;
        Name: string;
        ImageUrl: string;
        Equipments: string[];
        BodyParts: string[];
        ExerciseType: string;
        TargetMuscles: string[];
        SecondaryMuscles: string[];
        VideoUrl: string;
        Keywords: string[];
        Overview: string;
        Instructions: string[];
        ExerciseTips: string[];
        Variations: string[];
        RelatedExerciseIds: string[];

        Progressions: Progression[];
};





