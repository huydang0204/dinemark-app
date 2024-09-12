import RestaurantList from "@/app/components/restaurant-list";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      <RestaurantList />
    </main>
  );
}
