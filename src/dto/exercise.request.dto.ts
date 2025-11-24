/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type CreateExerciseRequest = {
    exerciseId: string;
    workoutPlanId: string;
    name: string;
    imageUrl: string;
    equipments: string[];
    bodyParts: string[];
    exerciseType: string;
    targetMuscles: string[];
    secondaryMuscles: string[];
    videoUrl: string;
    keywords: string[];
    overview: string;
    instructions: string[];
    exerciseTips: string[];
    variations: string[];
    relatedExerciseIds: string[];
}

// Zod schema – runtime validation
export const CreateExerciseSchema = z.object({
    exerciseId: z.string().min(1),
    workoutPlanId: z.string().min(1),
    name: z.string().min(1),
    imageUrl: z.string().min(1),

    exerciseType: z.string().min(1),
    videoUrl: z.string().min(1),
    overview: z.string().min(1),

    equipments: z.array(z.string()).default([]),
    bodyParts: z.array(z.string()).default([]),
    targetMuscles: z.array(z.string()).default([]),
    secondaryMuscles: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    instructions: z.array(z.string()).default([]),
    exerciseTips: z.array(z.string()).default([]),
    variations: z.array(z.string()).default([]),
    relatedExerciseIds: z.array(z.string()).default([]),
});

