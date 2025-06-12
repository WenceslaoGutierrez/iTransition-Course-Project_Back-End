import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import i18next from './config/i18n.config';
import { handle } from 'i18next-http-middleware';
import apiRouter from './api';

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
app.use(handle(i18next));

//Routes
app.use('/api', apiRouter);

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} \nhttp://localhost:${PORT}`);
  console.log(`Connected to DB: ${process.env.DATABASE_URL}`);
});
