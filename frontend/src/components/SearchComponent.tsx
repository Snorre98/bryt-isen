// SearchComponent.tsx
import { useState } from 'react';


type SearchProps = {
  search: string
};

export default function SearchComponent({search}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (term: string) => {
    console.log(term)
    setSearchTerm(term);
    search = searchTerm
  };
  

  return (
    <input
      className="search"
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
