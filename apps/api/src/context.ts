import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
export function createContext({ req, res }: CreateFastifyContextOptions) {
  const userId = req.session.user_id;
  return { req, res, userId };
}
export type Context = inferAsyncReturnType<typeof createContext>;