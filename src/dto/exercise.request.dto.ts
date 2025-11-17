/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type CreateExerciseRequest = {
    ExerciseId: string;
    WorkoutPlanId: string;
    Name: string;
    ImageUrl: string;
    Equipments: string;
    BodyParts: string;
    ExerciseType: string;
    TargetMuscles: string;
    SecondaryMuscles: string;
    VideoUrl: string;
    Keywords: string;
    Overview: string;
    Instructions: string;
    ExerciseTips: string;
    Variations: string;
    RelatedExerciseIds: string;
}

// Zod schema – runtime validation
export const CreateExerciseSchema = z.object({
    ExerciseId: z.string().min(1),
    WorkoutPlanId: z.string().min(1),
    Name: z.string().min(1),
    ImageUrl: z.string().min(1),
    Equipments: z.string().min(1),
    BodyParts: z.string().min(1),
    ExerciseType: z.string().min(1),
    TargetMuscles: z.string().min(1),
    SecondaryMuscles: z.string().min(1),
    VideoUrl: z.string().min(1),
    Keywords: z.string().min(1),
    Overview: z.string().min(1),
    Instructions: z.string().min(1),
    ExerciseTips: z.string().min(1),
    Variations: z.string().min(1),
    RelatedExerciseIds: z.string().min(1),
});