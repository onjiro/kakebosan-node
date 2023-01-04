import fp from 'fastify-plugin'
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';

declare module "fastify" {
  interface Session {
    user_id: number
    id?: number
  }
}

export default fp(async (fastify) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      maxAge: 60 * 60 * 24 * 7,
      secure: (process.env.SESSION_COOKIE_SECURE || '') === 'true',
    }
  });
});
