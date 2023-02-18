import { FastifyPluginAsync } from "fastify";
import { authenticated } from "@hooks/index";

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {
    preValidation: authenticated,
    handler: async (request, reply) => {
      const userId = request.session.user_id;

      return await fastify.prisma.accounting_transactions.findMany({
        where: { user_id: userId },
        orderBy: [
          { date: 'desc' },
          { id: 'desc' }],
        include: {
          entries: {
            orderBy: { id: 'desc' },
            include: {
              item: true
            }
          }
        }
      });
    }
  });
}

export default items;
