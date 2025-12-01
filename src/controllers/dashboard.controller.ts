/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';
import { WorkoutPlanDetailedResponse } from '../dto/workout.plans.response.dto';
import { DashboardResponse } from '../dto/dashboard.response.dto';
import { asNonNullString, normalizeStringArray } from '../helpers/helper';

class DashboardController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetDashboardMetricsByUserId = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const now = new Date();

            // 1. Find user
            const user = await this.prisma.users.findUnique({
                where: { Id: id },
            });

            if (!user) {
                return response.sendStatus(404);
            }

            // 2. Try to find the workout plan that has the nearest upcoming calendar event
            //    This is easier if we query CalendarEvents first.
            const upcomingEvent = await this.prisma.calendar.findFirst({
                where: {
                    Start: { gte: now },                 // only future events
                    WorkoutPlans: { UserId: id },         // belonging to this user's workout plans
                },
                orderBy: { Start: 'asc' },              // nearest first
                include: {
                    WorkoutPlans: {
                        include: {
                            Users: true,
                            Calendar: true,
                            Exercises: {
                                include: {
                                    Progression: {
                                        where: { UserId: id },
                                        orderBy: { Date: 'asc' },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            let workout = upcomingEvent?.WorkoutPlans ?? null;

            // 3. Fallback: if no workout with events was found, get ANY workout for this user
            if (!workout) {
                workout = await this.prisma.workoutPlans.findFirst({
                    where: { UserId: id },
                    include: {
                        Users: true,
                        Calendar: true,
                        Exercises: {
                            include: {
                                Progression: {
                                    where: { UserId: id },
                                    orderBy: { Date: 'asc' },
                                },
                            },
                        },
                    },
                });

                if (!workout) {
                    return response.sendStatus(404);
                }
            }

            // 4. Determine upcomingWorkout (first event ordered by Start, like C#)
            let upcomingWorkout: any = null;
            if (workout.Calendar && workout.Calendar.length > 0) {
                const sortedEvents = [...workout.Calendar].sort(
                    (a, b) => a.Start.getTime() - b.Start.getTime()
                );
                upcomingWorkout = sortedEvents[0];
            }

            // 5. Map workout to the same DTO as your other endpoint
            const workoutDto: WorkoutPlanDetailedResponse = {
                id: workout.Id,
                userId: workout.UserId,
                user: workout.Users,
                name: asNonNullString(workout.Name),
                type: workout.Type,
                description: workout.Description,
                frequency: workout.Frequency,
                exercises: (workout.Exercises ?? []).map((e) => ({
                    uniqueExerciseId: e.UniqueExerciseId,
                    exerciseId: e.ExerciseId,
                    workoutPlanId: e.WorkoutPlanId,
                    name: asNonNullString(e.Name),
                    imageUrl: e.ImageUrl,
                    exerciseType: e.ExerciseType,
                    targetMuscles: normalizeStringArray(e.TargetMuscles),
                    bodyParts: normalizeStringArray(e.BodyParts),
                    progressions: (e.Progression ?? []).map((p) => ({
                        id: p.Id,
                        userId: p.UserId,
                        uniqueExerciseId: p.UniqueExerciseId,
                        exerciseId: e.ExerciseId,
                        exercise: null,
                        date: p.Date,
                        weight: p.Weight,
                        reps: p.Reps,
                    })),
                })),
            };

            const dashboardResponse: DashboardResponse = {
                user: {
                    id: user.Id,
                    name: user.Name,
                    email: user.Email,
                    gender: user.Gender ?? null,
                    age: user.Age ?? null,
                    weight: user.Weight ?? null,
                    height: user.Height ?? null,
                },
                workoutPlan: workoutDto,
                upcomingWorkout: upcomingWorkout?.Start ?? null,
                exercises: workoutDto.exercises,
            };

            return response.status(200).json(dashboardResponse);
        } catch (error) {
            console.error('GetDashboardMetricsByUserId error:', error);
            return response
                .status(500)
                .send('An error occurred when trying to retrieve dashboard metrics by user ID.');
        }
    };
}

export default new DashboardController();