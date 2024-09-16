import React from 'react';

enum STORE_CATEGORY {
  SUSHI = 'SUSHI',
  UNAGI = 'UNAGI',
  TEMPURA = 'TEMPURA',
  TONKATSU = 'TONKATSU',
  YAKITORI = 'YAKITORI',
  SUKIYAKI = 'SUKIYAKI',
  SOBA = 'SOBA',
  RAMEN = 'RAMEN',
  YAKISOBA = 'YAKISOBA',
  OKONOMIYAKI = 'OKONOMIYAKI',
  DONBURI = 'DONBURI',
  ODEN = 'ODEN',
  KAISEKI = 'KAISEKI',
  HAMBAGU = 'HAMBAGU',
  TEPPANYAKI = 'TEPPANYAKI',
  CURRY = 'CURRY',
  YAKINIKU = 'YAKINIKU',
  NABE = 'NABE',
  CAFE = 'CAFE',
  IZAKAYA = 'IZAKAYA',
  OTHER = 'OTHER',
}

const textByStoreCategory = {
  [STORE_CATEGORY.SUSHI]: '스시·해산물',
  [STORE_CATEGORY.UNAGI]: '장어',
  [STORE_CATEGORY.TEMPURA]: '덴푸라',
  [STORE_CATEGORY.TONKATSU]: '돈카츠·쿠시카츠',
  [STORE_CATEGORY.YAKITORI]: '야키토리·꼬치',
  [STORE_CATEGORY.SUKIYAKI]: '스키야키·샤브샤브',
  [STORE_CATEGORY.SOBA]: '소바·우동',
  [STORE_CATEGORY.RAMEN]: '라멘·츠케멘',
  [STORE_CATEGORY.YAKISOBA]: '야키소바',
  [STORE_CATEGORY.OKONOMIYAKI]: '오코노미야키·타코야키',
  [STORE_CATEGORY.DONBURI]: '덮밥',
  [STORE_CATEGORY.ODEN]: '오뎅',
  [STORE_CATEGORY.KAISEKI]: '가이세키·일식',
  [STORE_CATEGORY.HAMBAGU]: '함바그·오므라이스',
  [STORE_CATEGORY.TEPPANYAKI]: '스테이크·철판요리',
  [STORE_CATEGORY.CURRY]: '카레',
  [STORE_CATEGORY.YAKINIKU]: '야키니쿠·호르몬',
  [STORE_CATEGORY.NABE]: '나베',
  [STORE_CATEGORY.CAFE]: '카페·디저트',
  [STORE_CATEGORY.IZAKAYA]: '이자카야·바',
  [STORE_CATEGORY.OTHER]: '기타 일본 음식',
};

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange, selectedCategory }) => {
  return (
    <div className="w-full mb-6 flex space-x-4 overflow-x-auto pb-2">
    {Object.values(STORE_CATEGORY).map((category) => {
      const currentlySelected = selectedCategory === category;

      let defaultStyle = 'bg-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-blue-500 hover:text-white';
      if (currentlySelected) {
        defaultStyle = 'bg-blue-500 text-white rounded-full text-sm whitespace-nowrap';
      }
      
      return <button
        key={category}
        className={ `px-4 py-2 ${ defaultStyle } transition-colors` }
        onClick={() => { onCategoryChange(currentlySelected ? '' : category)} }
      >
        { textByStoreCategory[category] }
      </button>;
    })}
  </div>
  );
};

export default CategoryFilter;