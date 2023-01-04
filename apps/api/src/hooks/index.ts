import { FastifyReply, FastifyRequest } from 'fastify'

export const authenticated = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.session.user_id) {
    return reply.code(401).send('Unauthorized');
  }
}
