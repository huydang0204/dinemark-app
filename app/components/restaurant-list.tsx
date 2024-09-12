'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import RestaurantCard from './restaurant-card';
import Loading from './loading';
import Error from './error';

const RestaurantList: React.FC = () => {
  const { data: restaurants, isLoading, error } = trpc.restaurant.getRestaurants.useQuery();
  const addFavoriteMutation = trpc.restaurant.addFavorite.useMutation();

  if (isLoading) return <Loading />
  if (error) return <Error error={error.message} />

  const handleFavoriteClick = (id: string) => {
    addFavoriteMutation.mutate({ id })
  }

  const restaurantList = restaurants?.map((restaurant) => ({
    ...restaurant,
    featured: restaurant.featured as { text: string, icon: string } | null,
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurantList?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          {...restaurant}
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </div>
  )
}

export default RestaurantList