import React from 'react';

const SearchBar = () => {
  return (
    <div className="max-w-3xl mb-6">
      <input
        type="text"
        placeholder="맛집 이름을 검색해보세요"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;