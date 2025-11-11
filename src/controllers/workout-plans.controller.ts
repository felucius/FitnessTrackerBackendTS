/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';
import { WorkoutPlanDetailedResponse } from '../dto/workout.plans.response.dto';
import { asNonNullString, normalizeStringArray } from '../helpers/helper';
import { CreateWorkoutPlanRequest, CreateWorkoutPlanSchema } from '../dto/workout.plans.request.dto';

type requestWithCreateWorkoutPlanBody = express.Request<{}, {}, CreateWorkoutPlanRequest>;

class WorkoutPlansController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetAllWorkoutPlans = async (request: express.Request, response: express.Response) => {
        try {
            const workoutPlans = await this.prisma.workoutPlans.findMany();
            return response.status(200).json({ data: workoutPlans });
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    GetWorkoutPlanById = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;

            // Fetch workout plan including User and Exercises + Progressions
            const workoutplan = await this.prisma.workoutPlans.findFirst({
                where: { Id: id },
                include: {
                    Users: true,
                    Exercises: {
                        include: {
                            Progression: {
                                orderBy: { Date: 'desc' },
                            },
                        },
                    },
                },
            });

            if (!workoutplan) {
                return response.sendStatus(404);
            }

            // Map Prisma object into your DTO
            const dto: WorkoutPlanDetailedResponse = {
                Id: workoutplan.Id,
                UserId: workoutplan.UserId,
                User: workoutplan.Users,
                Name: asNonNullString(workoutplan.Name),
                Type: workoutplan.Type,
                Description: workoutplan.Description,
                Frequency: workoutplan.Frequency,
                Exercises: (workoutplan.Exercises ?? []).map((e) => ({
                    UniqueExerciseId: e.UniqueExerciseId,
                    ExerciseId: e.ExerciseId,
                    WorkoutPlanId: e.WorkoutPlanId,
                    Name: asNonNullString(e.Name),
                    ImageUrl: e.ImageUrl,
                    ExerciseType: e.ExerciseType,
                    TargetMuscles: normalizeStringArray(e.TargetMuscles),
                    BodyParts: normalizeStringArray(e.BodyParts),
                    Progressions: (e.Progression ?? [])
                        .filter((p) => p.UserId === workoutplan.UserId)
                        .map((p) => ({
                        Id: p.Id,
                        UserId: p.UserId,
                        UniqueExerciseId: p.UniqueExerciseId,
                        ExerciseId: e.ExerciseId,
                        Exercise: null,
                        Date: p.Date,
                        Weight: p.Weight,
                        Reps: p.Reps,
                    })),
                })),
            };

            // Return the strongly typed DTO
            return response.status(200).json({ data: dto });
        } catch (error) {
            console.error('GetWorkoutPlanById error:', error);
            return response.sendStatus(400);
        }
    }

    CreateWorkoutPlan = async (request: requestWithCreateWorkoutPlanBody, response: express.Response) => {
        try {

            const parsed = CreateWorkoutPlanSchema.safeParse(request.body);

            if (!parsed.success) {
                return response.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
            }

            const { userId, name, type, description, frequency } = parsed.data;
                        
            if(!name) {
                return response.status(400).json({ message: "Name is required" });
            }

            const workoutplan = await this.prisma.workoutPlans.create({
                data: {
                    UserId: userId,
                    Name: name,
                    Type: type,
                    Description: description ?? null,
                    Frequency: frequency ?? null,
                },
                include: { Users: true },
            });

            return response.status(201).json({ message: "Workout plan created", data: workoutplan });
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }
}

export default new WorkoutPlansController();