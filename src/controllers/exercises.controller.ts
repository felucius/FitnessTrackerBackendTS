/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';
import { CreateExerciseRequest, CreateExerciseSchema } from '../dto/exercise.request.dto';

type requestWithCreateExerciseBody = express.Request<{id: string}, {}, CreateExerciseRequest>;

class ExercisesController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetAllProgression = async (request: express.Request, response: express.Response) => {
        try {
            const progressions = await this.prisma.exercises.findMany();
            return response.status(200).json(progressions);
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }

    GetExerciseById = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const exercise = await this.prisma.exercises.findFirst({
                where: { ExerciseId: id },
            });

            return response.status(200).json(exercise);
        }
        catch (error){
            return response.sendStatus(400);
        }
    }

    CreateExercise = async (request: requestWithCreateExerciseBody, response: express.Response) => {
        try {
            const parsed = CreateExerciseSchema.safeParse(request.body);

            if (!parsed.success) {
                return response.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
            }

            const {
                exerciseId, workoutPlanId, name, imageUrl, 
                equipments, bodyParts, exerciseType, targetMuscles, 
                secondaryMuscles, videoUrl, keywords, overview, instructions, 
                exerciseTips, variations, relatedExerciseIds
            } = parsed.data;

            if(!exerciseId) {
                return response.status(400).json({ message: "Exercise ID is required" });
            }

            const newExercise = await this.prisma.exercises.create({
                data: {
                    ExerciseId: parsed.data.exerciseId,
                    WorkoutPlanId: parsed.data.workoutPlanId,
                    Name: parsed.data.name,
                    ImageUrl: parsed.data.imageUrl,
                    Equipments: JSON.stringify(parsed.data.equipments),
                    BodyParts: JSON.stringify(parsed.data.bodyParts),
                    ExerciseType: parsed.data.exerciseType,
                    TargetMuscles: JSON.stringify(parsed.data.targetMuscles),
                    SecondaryMuscles: JSON.stringify(parsed.data.secondaryMuscles),
                    VideoUrl: parsed.data.videoUrl,
                    Keywords: JSON.stringify(parsed.data.keywords),
                    Overview: parsed.data.overview,
                    Instructions: JSON.stringify(parsed.data.instructions),
                    ExerciseTips: JSON.stringify(parsed.data.exerciseTips),
                    Variations: JSON.stringify(parsed.data.variations),
                    RelatedExerciseIds: JSON.stringify(parsed.data.relatedExerciseIds)
                }
            });

            return response.status(201).json(newExercise);
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }

    DeleteExercise = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;

            // Find existing exercise
            const existingExercise = await this.prisma.exercises.findFirst({
                where: { UniqueExerciseId: id }
            });

            if (!existingExercise) {
                return response.status(404).json({ message: "Exercise not found" });
            }

            await this.prisma.exercises.delete(
                { 
                    where: { UniqueExerciseId: id }
                }
            );
            
            return response.status(200).json({ message: "Workoutplan deleted" });
        } catch (error) {
            return response.sendStatus(400);

        }
    }
}

export default new ExercisesController();