/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';

class ExercisesController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetAllProgression = async (request: express.Request, response: express.Response) => {
        try {
            const progressions = await this.prisma.exercises.findMany();
            return response.status(200).json({ data: progressions });
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

            return response.status(200).json({ data: exercise });
        }
        catch (error){
            return response.sendStatus(400);
        }
    }
}

export default new ExercisesController();