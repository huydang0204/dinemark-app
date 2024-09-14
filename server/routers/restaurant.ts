import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const restaurantRouter = router({
  
  getRestaurants: publicProcedure.query(async () => {
    return prisma.restaurant.findMany()
  }),
  
  toggleFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const updateRestaurant = await prisma.restaurant.findUnique({ where: { id: input.id } });

      if (!updateRestaurant) {
        throw new Error('Restaurant not found');
      }

      return prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: !updateRestaurant.isFavorite },
      })
    }),
})