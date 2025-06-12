import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

//Initial configs
dotenv.config();
const prisma = new PrismaClient();
const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // TEMPORAL
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
