/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import express from 'express';
import { PrismaClient } from '../../generated/prisma/client';

class UsersController {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }


    getAllUsers = async (request: express.Request, response: express.Response) => {
        try {
            if(this.prisma){
                console.log("Prisma Client initialized");
            }
            const users = await this.prisma.users.findMany();
            return response.status(200).json({ data: users });
        } catch (error) {
            return response.sendStatus(400);

        }
    }

    getUserById = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const user = await this.prisma.users.findFirst(
                { 
                    where: { Id: id } 
                }
            );
            
            return response.status(200).json({ data: user });
        } catch (error) {
            return response.sendStatus(400);

        }
    }

    createUser = async (request: express.Request, response: express.Response) => {
        try {
            const {gender, name, email, age, weight, height, password, progression, workoutPlans,} = request.body;
            
            if(!name || !email) {
                return response.status(400).json({ message: "Name and Email are required" });
            }
            
            const user = await this.prisma.users.create({
                data: {
                    Name: name,
                    Email: email,
                    Age: age,
                    Weight: weight,
                    Height: height
                }
            });

            return response.status(201).json({ message: "User created", data: user });
        } catch (error) {
            return response.sendStatus(400);

        }
    }

    updateUser = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;
            const {gender, name, email, age, weight, height, password, progression, workoutPlans,} = request.body;

            const employee = await this.prisma.users.findFirst({
                where: { Id: id }
            });

            const updatedUser = await this.prisma.users.update({
                data: {
                    Name: name,
                    Email: email,
                    Age: age,
                    Weight: weight,
                    Height: height
                },
                where: { Id: id }
            })

            return response.status(200).json({ message:"Employee updated", data: updatedUser });
        } catch (error) {
            return response.sendStatus(400);

        }
    }

    deleteUser = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;
            await this.prisma.users.delete(
                { 
                    where: {Id: id }
                }
            );
            
            return response.status(200).json({ message: "Employee deleted" });
        } catch (error) {
            return response.sendStatus(400);

        }
    }
}

export default new UsersController();