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

type requestWithCreateWorkoutPlanBody = express.Request<{id: string}, {}, CreateWorkoutPlanRequest>;

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
                id: workoutplan.Id,
                userId: workoutplan.UserId,
                user: workoutplan.Users,
                name: asNonNullString(workoutplan.Name),
                type: workoutplan.Type,
                description: workoutplan.Description,
                frequency: workoutplan.Frequency,
                exercises: (workoutplan.Exercises ?? []).map((e) => ({
                    uniqueExerciseId: e.UniqueExerciseId,
                    exerciseId: e.ExerciseId,
                    workoutPlanId: e.WorkoutPlanId,
                    name: asNonNullString(e.Name),
                    imageUrl: e.ImageUrl,
                    exerciseType: e.ExerciseType,
                    targetMuscles: normalizeStringArray(e.TargetMuscles),
                    bodyParts: normalizeStringArray(e.BodyParts),
                    progressions: (e.Progression ?? [])
                        .filter((p) => p.UserId === workoutplan.UserId)
                        .map((p) => ({
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

            // Return the strongly typed DTO
            return response.status(200).json(dto);
        } catch (error) {
            console.error('GetWorkoutPlanById error:', error);
            return response.sendStatus(400);
        }
    }

    GetWorkoutPlansByUserId = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;

            // Fetch workout plan including User and Exercises + Progressions
            const workoutplans = await this.prisma.workoutPlans.findMany({
                where: { UserId: id },
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

            if (workoutplans.length == 0) {
                return response.sendStatus(404);
            }

            // Map Prisma object into your DTO
            const dto: WorkoutPlanDetailedResponse[] = workoutplans.map(workoutplan => ({
                id: workoutplan.Id,
                userId: workoutplan.UserId,
                user: workoutplan.Users,
                name: asNonNullString(workoutplan.Name),
                type: workoutplan.Type,
                description: workoutplan.Description,
                frequency: workoutplan.Frequency,
                exercises: (workoutplan.Exercises ?? []).map((e) => ({
                    uniqueExerciseId: e.UniqueExerciseId,
                    exerciseId: e.ExerciseId,
                    workoutPlanId: e.WorkoutPlanId,
                    name: asNonNullString(e.Name),
                    imageUrl: e.ImageUrl,
                    exerciseType: e.ExerciseType,
                    targetMuscles: normalizeStringArray(e.TargetMuscles),
                    bodyParts: normalizeStringArray(e.BodyParts),
                    progressions: (e.Progression ?? [])
                        .filter((p) => p.UserId === workoutplan.UserId)
                        .map((p) => ({
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
            }));

            // Return the strongly typed DTO
            return response.status(200).json(dto);
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

            const {userId, name, type, description, frequency} = parsed.data;
                        
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

            return response.status(201).json(workoutplan);
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }

    UpdateWorkoutPlan = async (request: requestWithCreateWorkoutPlanBody, response: express.Response) => {
        try {
            const parsed = CreateWorkoutPlanSchema.safeParse(request.body);

            if (!parsed.success) {
                return response.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
            }

            const {id} = request.params;
            const {userId, name, type, description, frequency} = parsed.data;
                        
            if(!name) {
                return response.status(400).json({ message: "Name is required" });
            }

            const workoutplanFound = await this.prisma.workoutPlans.findFirst({
                where: { Id: id }
            });

            if(workoutplanFound){
                const workoutplan = await this.prisma.workoutPlans.update({
                    data: {
                        UserId: workoutplanFound.UserId,
                        Name: name,
                        Type: type,
                        Description: description ?? null,
                        Frequency: frequency ?? null,
                    },
                    where: { Id: id },
                });

                return response.status(201).json({ message: "Workout plan updated", data: workoutplan });
            }

            return response.status(404).json({ message: "Workout plan not found" });
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }

    DeleteWorkoutPlan = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;
            await this.prisma.workoutPlans.delete(
                { 
                    where: {Id: id }
                }
            );
            
            return response.status(200).json({ message: "Workoutplan deleted" });
        } catch (error) {
            return response.sendStatus(400);

        }
    }
}

export default new WorkoutPlansController();