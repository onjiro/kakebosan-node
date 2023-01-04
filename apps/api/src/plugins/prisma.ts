import fp from 'fastify-plugin'
import fastifyPrismaClient, { FastifyPrismaClientOptions } from "fastify-prisma-client";

export default fp<FastifyPrismaClientOptions>(async (fastify) => {
  fastify.register(fastifyPrismaClient);
});
