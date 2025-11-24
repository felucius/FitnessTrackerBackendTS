import { Exercise } from 'src/models/exercise';

export type ExerciseProgressionResponse = {
  id: string;
  userId: string;
  uniqueExerciseId: string;
  exerciseId: string;
  exercise: Exercise | null;
  date: Date;
  weight: number | null;
  reps: number | null;
};

export type ExerciseListItemResponse = {
  uniqueExerciseId: string;
  exerciseId: string;
  workoutPlanId: string;
  name: string;
  imageUrl: string | null;
  exerciseType: string | null;
  targetMuscles: string[];
  bodyParts: string[];
  progressions: ExerciseProgressionResponse[];
};

export type WorkoutPlanDetailedResponse = {
  id: string;
  userId: string;
  user: any;
  name: string;
  type: string | null;
  description: string | null;
  frequency: number | null;
  exercises: ExerciseListItemResponse[];
};

export type WorkoutPlanResponse = {
  id: string;
  userId: string;
  user: any;
  name: string;
  type: string | null;
  description: string | null;
  frequency: number | null;
};
