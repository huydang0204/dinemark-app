import { router } from '../trpc';
import { restaurantRouter } from './restaurant';

export const appRouter = router({
  restaurant: restaurantRouter,
})

export type AppRouter = typeof appRouter