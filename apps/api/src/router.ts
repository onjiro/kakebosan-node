import { accounting_entries, accounting_items, accounting_transactions } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { Context } from './context';

// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  accounting: t.router({
    items: t.procedure.query(async ({ ctx: { req: { session, prisma }, userId } }): Promise<accounting_items[]> => {
      return await prisma.accounting_items.findMany({
        where: { user_id: userId },
        orderBy: { id: 'desc' },
      })
    }),
    transactions: t.procedure.query(async ({ ctx: { req: { session, prisma }, userId } }): Promise<(accounting_transactions & { entries: (accounting_entries & { item: accounting_items })[] })[]> => {
      return await prisma.accounting_transactions.findMany({
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
    }),
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;