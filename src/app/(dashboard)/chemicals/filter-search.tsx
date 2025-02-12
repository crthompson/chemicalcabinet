import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface FilterSearchProps {
  onSearch: (searchTerm: string) => void;
}

export function FilterSearch({ onSearch }: FilterSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch()
        }}
        placeholder="Search chemicals..."
      />
    </div>
  );
}