import { PrismaClient } from "@prisma/client";

export const findByGitHubId = async (prisma: PrismaClient, uid: string) =>
    prisma.users.findFirst({ where: { uid, provider: "github" } });

export const createWithGitHubId = async (prisma: PrismaClient, uid: string, name: string) =>
    prisma.users.create({ data: { uid, name, provider: "github" } });
