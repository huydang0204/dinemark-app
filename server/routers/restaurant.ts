import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const restaurantRouter = createTRPCRouter({
  getRestaurants: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, category } = input;
      const whereClause: Prisma.RestaurantWhereInput = {};

      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (category) {
        whereClause.category = category;
      }

      return ctx.prisma.restaurant.findMany({
        where: whereClause,
      });
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