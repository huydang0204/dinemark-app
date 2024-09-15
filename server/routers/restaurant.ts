import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const restaurantRouter = createTRPCRouter({
  getRestaurants: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.restaurant.findMany();
  }),
  toggleFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: input.id },
        select: { isFavorite: true }
      });

      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      return ctx.prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: !restaurant.isFavorite },
      });
    }),
});