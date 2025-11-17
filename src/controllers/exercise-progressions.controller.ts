/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';
import { CreateProgressionSchema } from '../dto/exercise-progressions.dto';

class ExercisesProgressionsController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetAllProgression = async (request: express.Request, response: express.Response) => {
        try{
            const progressions = await this.prisma.progression.findMany();
            return response.status(200).json({ data: progressions } );
        }
        catch (error){
            return response.sendStatus(400);
        }
    }

    GetProgressionById = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const progression = await this.prisma.progression.findFirst({
                where: { UniqueExerciseId: id },
            });

            return response.status(200).json({ data: progression });
        }
        catch (error){
            return response.sendStatus(400);
        }
    }

    CreateProgression = async (request: express.Request, response: express.Response) => {
        try{
            const parsedBody = CreateProgressionSchema.safeParse(request.body);

            if (!parsedBody.success) {
                return response.status(400).json({ message: 'Invalid body', issues: parsedBody.error.issues });
            }

            const { UniqueExerciseId, UserId, ExerciseId, Date, Weight, Reps } = parsedBody.data;

            const newProgression = await this.prisma.progression.create({
                data: {
                    UniqueExerciseId: parsedBody.data.UniqueExerciseId,
                    UserId: parsedBody.data.UserId,
                    ExerciseId: parsedBody.data.ExerciseId,
                    Date: parsedBody.data.Date,
                    Weight: parsedBody.data.Weight,
                    Reps: parsedBody.data.Reps
                }
            });

            return response.status(201).json({ data: newProgression });
        }
        catch (error){
            return response.sendStatus(400);
        }
    }

    UpdateProgressions = async (request: express.Request, response: express.Response) => {
        try {
            const parsedBody = CreateProgressionSchema.safeParse(request.body);

            const addHours = (date: Date, hours: number): Date => {
                const newDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
                return newDate;
            }

            if (!parsedBody.success) {
            return response.status(400).json({ message: 'Invalid body', issues: parsedBody.error.issues });
            }

            const { id } = request.params;
            const { UniqueExerciseId,UserId, ExerciseId, Date: date, Weight, Reps } = parsedBody.data;

            // Try exact match
            let progression = await this.prisma.progression.findFirst({
                where: {
                    UniqueExerciseId: id,
                    Date: date,
                },
            });

            // Try different timezone (date + 2 hours), like in your C# code
            if (!progression) {
                const datePlus2h = addHours(date, 2);

                progression = await this.prisma.progression.findFirst({
                    where: {
                    UniqueExerciseId,
                    Date: datePlus2h,
                    },
                });
            }

            if (!progression) {
                return response.status(404).json({ message: 'Progression not found' });
            }

            // Update the found row by its primary key (Id)
            const updatedProgression = await this.prisma.progression.update({
                where: { Id: progression.Id },
                data: {
                    Date: date,
                    Weight,
                    Reps,
                },
            });

            return response.status(200).json({ message: 'Progression updated', data: updatedProgression });
        } catch (error) {
            return response.sendStatus(400);
        }
    };

    DeleteProgression = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;

            const existingProgression = await this.prisma.progression.findFirst({
                where: { Id: id }
            });

            if (!existingProgression) {
                return response.status(404).json({ message: "Progression not found" });
            }

            await this.prisma.progression.delete(
                { 
                    where: { Id: id }
                }
            );

            return response.status(200).json({ message: "Progression deleted" });
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }
}

export default new ExercisesProgressionsController();