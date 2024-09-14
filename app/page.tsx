import RestaurantList from "@/app/components/restaurant-list";
import SearchBar from "@/app/components/search-bar";
import CategoryFilters from "@/app/components/category-filters";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Search List Page</h1>
      <SearchBar />
      <CategoryFilters />
      <RestaurantList />
    </div>
  );
}
