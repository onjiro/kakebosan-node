import { FastifyPluginAsync } from "fastify";
import { authenticated } from "@hooks/index";

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {
    preValidation: authenticated,
    handler: async (request, reply) => {
      const userId = request.session.user_id;

      return await fastify.prisma.accounting_items.findMany({ where: { user_id: userId } });
    }
  });
}

export default items;
