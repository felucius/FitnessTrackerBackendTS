/* eslint-disable prettier/prettier */
import { ExerciseListItemResponse, WorkoutPlanDetailedResponse } from "./workout.plans.response.dto"
import { UserResponse } from "./user.response.dto";

export type DashboardResponse = {
    user: UserResponse;
    workoutPlan: WorkoutPlanDetailedResponse;
    upcomingWorkout: Date | null;
    exercises: ExerciseListItemResponse[];
};
