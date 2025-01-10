import { Search } from 'lucide-react';
import useStore from '@/store';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useStore();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border bg-background px-9 py-2 outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}