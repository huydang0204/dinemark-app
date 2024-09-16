"use client";

import React, { useState, useEffect } from "react";
import RestaurantCard from "./restaurant-card";
import { trpc } from "@/utils/trpc";
import Loading from "./loading";
import SearchBar from "./search-bar";
import Error from "./error";
import { Restaurant } from "@prisma/client";
import CategoryFilter from "./category-filter";

const RestaurantList = () => {
  const utils = trpc.useContext();
  const [optimisticRestaurants, setOptimisticRestaurants] = useState<
    Restaurant[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const input = {
    search: searchTerm,
    category: selectedCategory,
  };

  const {
    data: restaurants,
    isLoading,
    error,
  } = trpc.restaurant.getRestaurants.useQuery(input);
  const toggleFavoriteMutation = trpc.restaurant.toggleFavorite.useMutation({
    onMutate: async (newRestaurant) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await utils.restaurant.getRestaurants.cancel();

      // Snapshot the previous value
      const previousRestaurants =
        utils.restaurant.getRestaurants.getData(input);

      // Optimistically update to the new value
      utils.restaurant.getRestaurants.setData(input, (old) => {
        return old?.map((restaurant) =>
          restaurant.id === newRestaurant.id
            ? { ...restaurant, isFavorite: !restaurant.isFavorite }
            : restaurant,
        );
      });

      // Return a context object with the snapshotted value
      return { previousRestaurants };
    },
    onError: (_err, _newRestaurant, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      utils.restaurant.getRestaurants.setData(
        input,
        context?.previousRestaurants,
      );
    },
    onSettled: () => {
      // Sync with the server once mutation has settled
      utils.restaurant.getRestaurants.invalidate();
    },
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFavoriteClick = (id: string) => {
    setOptimisticRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant,
      ),
    );
    toggleFavoriteMutation.mutate({ id });
  };

  useEffect(() => {
    if (restaurants) {
      setOptimisticRestaurants(restaurants as Restaurant[]);
    }
  }, [restaurants]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-1">
        {optimisticRestaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
      {isLoading && <Loading />}
      {error && <Error error={error.message} />}
    </div>
  );
};

export default RestaurantList;
