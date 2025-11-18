/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';
import { CalendarEventResponseSchema } from '../dto/calendar.response.dto';
import { CalendarEventRequestSchema, CreateCalendarEventRequest } from '../dto/calendar.request.dto';

// type requestWithCreateCalendarEventBody = express.Request<{id: string}, {}, CreateCalendarEventRequest>;

class CalendarController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    GetAllCalendarEvents = async (request: express.Request, response: express.Response) => {
        try {
            const events = await this.prisma.calendar.findMany();
            return response.status(200).json({ data: events });
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    GetCalendarEvents = async (request: express.Request, response: express.Response) => {
        try{
            const { id } = request.params;
            
            const events = await this.prisma.calendar.findMany({
                where: { WorkoutPlanId: id },
            });

            return response.status(200).json({ data: events });
        }
        catch (error) {
            return response.sendStatus(400);
        }
    }

    CreateCalendarEvent = async (request: express.Request, response: express.Response) => {
        try{
            const parsedBody = CalendarEventRequestSchema.safeParse(request.body);

            if (!parsedBody.success) {
                return response.status(400).json({ message: 'Invalid body', issues: parsedBody.error.issues });
            }

            const { Title, WorkoutPlanId, Start, End, AllDay} = parsedBody.data;

            if(!WorkoutPlanId){
                return response.status(400).json({ message: "Workoutplan ID is required" });
            }

            const calendarEvent = await this.prisma.calendar.create({
                data: {
                    Title: Title,
                    WorkoutPlanId: WorkoutPlanId,
                    Start: Start,
                    End: End,
                    AllDay: AllDay,
                }
            });

            return response.status(201).json({ message: "Workout plan created", data: calendarEvent });
        }
        catch (error){
            return response.sendStatus(400);
        }
    }

    DeleteCalendarEvent = async (request: express.Request, response: express.Response) => {
        try{
            const { id } = request.params;

            const calendarEvent = await this.prisma.calendar.findFirst({
                where: {Id: id}
            });

            if(!calendarEvent){
                return response.status(404).json({ message: "Calendar event not found" }); 
            }

            await this.prisma.calendar.delete({
                where: { Id: id }
            });

            return response.status(200).json({ message: "Calendar event deleted" });
        }
        catch (error){
            return response.sendStatus(400);
        }
    }
}

export default new CalendarController();