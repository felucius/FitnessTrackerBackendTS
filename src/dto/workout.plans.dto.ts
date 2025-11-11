// src/dto/workoutPlanDetailedResponse.ts
import { Exercise } from 'src/models/exercise';

export type ExerciseProgressionResponse = {
  Id: string;
  UserId: string;
  UniqueExerciseId: string;
  ExerciseId: string;
  Exercise: Exercise | null;
  Date: Date;
  Weight: number | null;
  Reps: number | null;
};

export type ExerciseListItemResponse = {
  UniqueExerciseId: string;
  ExerciseId: string;
  WorkoutPlanId: string;
  Name: string;
  ImageUrl: string | null;
  ExerciseType: string | null;
  TargetMuscles: string[];
  BodyParts: string[];
  Progressions: ExerciseProgressionResponse[];
};

export type WorkoutPlanDetailedResponse = {
  Id: string;
  UserId: string;
  User: any; // you can define a narrower UserResponse type later
  Name: string;
  Type: string | null;
  Description: string | null;
  Frequency: number | null;
  Exercises: ExerciseListItemResponse[];
};
