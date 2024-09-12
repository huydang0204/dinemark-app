import React from 'react'
import Image from 'next/image'

type RestaurantCardProps = {
  id: string,
  name: string,
  description: string,
  rating: number,
  ratingCount: number,
  category: string,
  city: string,
  priceRange: string,
  images: string[],
  featured: { text: string, icon: string } | null,
  isFavorite: boolean
  onFavoriteClick: (id: string) => void
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  description,
  rating,
  ratingCount,
  category,
  city,
  priceRange,
  images,
  featured,
  isFavorite,
  onFavoriteClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image src={images[0]} alt={name} layout="fill" objectFit="cover" />
        {featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded">
            {featured.text}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold">{rating}</span> ({ratingCount} reviews)
          </div>
          <button
            onClick={() => onFavoriteClick(id)}
            className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
          >
            ♥
          </button>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-500">{category} • {city} • {priceRange}</span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard