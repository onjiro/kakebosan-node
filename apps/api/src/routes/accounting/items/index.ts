import { FastifyPluginAsync } from "fastify"

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return await fastify.prisma.accounting_items.findMany();
  })
}

export default items;
