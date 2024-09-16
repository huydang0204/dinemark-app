import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 w-full flex gap-1 justify-center items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search restaurants..."
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;