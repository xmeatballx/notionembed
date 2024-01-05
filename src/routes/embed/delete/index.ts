import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';

const prismaClient = new PrismaClient();

