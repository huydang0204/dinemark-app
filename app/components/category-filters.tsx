import React from 'react';

const categories = ['전체', '스시·해산물', '장어', '텐푸라', '돈카츠·쿠시카츠'];

const CategoryFilters = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 flex space-x-4 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 bg-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-blue-500 hover:text-white transition-colors"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;