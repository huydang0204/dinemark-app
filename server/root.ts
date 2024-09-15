import { createTRPCRouter } from '@/server/trpc';
import { restaurantRouter } from '@/server/routers/restaurant';

export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
});

export type AppRouter = typeof appRouter;