import { FastifyPluginAsync } from "fastify"

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    if (!request.session.user_id) {
      return reply.status(403).send();
    }

    const userId = request.session.user_id;
    return await fastify.prisma.accounting_items.findMany({ where: { user_id: userId } });
  })
}

export default items;
