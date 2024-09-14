import React from 'react';
import Image from 'next/image';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type RestaurantCardProps = {
  id: string;
  name: string;
  description: string;
  rating: number;
  ratingCount: number;
  category: string;
  city: string;
  priceRange: string;
  images: string[];
  isFavorite: boolean;
  onFavoriteClick: (id: string) => void;
};

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
  isFavorite,
  onFavoriteClick,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
      <div className="relative h-48">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="h-48">
              <Image 
                src={image} 
                alt={`${name} - image ${index + 1}`} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
        <button
          onClick={() => onFavoriteClick(id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
        >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-bold mr-1">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({ratingCount})</span>
        </div>
        <div className="text-sm text-gray-500">
          {category} • {city} • {priceRange}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;