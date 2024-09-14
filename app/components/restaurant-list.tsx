'use client';

import React, {useState} from 'react';
import RestaurantCard from './restaurant-card';
import { trpc } from '@/utils/trpc';
import Loading from './loading';
import SearchBar from './search-bar';
import CategoryFilters from './category-filters';
import Error from './error';
import { Restaurant } from '@prisma/client';

const RestaurantList = () => {
  const utils = trpc.useContext();
  const { data: restaurants, isLoading, error } = trpc.restaurant.getRestaurants.useQuery();
  const [optimisticRestaurants, setOptimisticRestaurants] = useState<Restaurant[]>([]);

  const toggleFavoriteMutation = trpc.restaurant.toggleFavorite.useMutation({
    onMutate: async (newRestaurant) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await utils.restaurant.getRestaurants.cancel();

      // Snapshot the previous value
      const previousRestaurants = utils.restaurant.getRestaurants.getData();

      // Optimistically update to the new value
      utils.restaurant.getRestaurants.setData(undefined, old => {
        return old?.map(restaurant => 
          restaurant.id === newRestaurant.id 
            ? { ...restaurant, isFavorite: !restaurant.isFavorite }
            : restaurant
        );
      });

      // Return a context object with the snapshotted value
      return { previousRestaurants };
    },
    onError: (err, newRestaurant, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      utils.restaurant.getRestaurants.setData(undefined, context?.previousRestaurants);
    },
    onSettled: () => {
      // Sync with the server once mutation has settled
      utils.restaurant.getRestaurants.invalidate();
    },
  });

  React.useEffect(() => {
    if (restaurants) {
      setOptimisticRestaurants(restaurants as Restaurant[]);
    }
  }, [restaurants]);

  const handleFavoriteClick = (id: string) => {
    setOptimisticRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === id 
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
    toggleFavoriteMutation.mutate({ id });
  };

  return (
    <div>
      <SearchBar />
      <CategoryFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {optimisticRestaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
      { isLoading && <Loading /> }
      { error && <Error error={error.message}/> }
    </div>

  );
};

export default RestaurantList;