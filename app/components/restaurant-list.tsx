'use client';

import React from 'react';
import RestaurantCard from './restaurant-card';
import { trpc } from '@/utils/trpc';

const RestaurantList = () => {
  const { data: restaurants, isLoading, error } = trpc.restaurant.getRestaurants.useQuery();
  const addFavoriteMutation = trpc.restaurant.addFavorite.useMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleFavoriteClick = (id: string) => {
    addFavoriteMutation.mutate({ id });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          {...restaurant}
          images={restaurant.images}
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </div>
  );
};

export default RestaurantList;