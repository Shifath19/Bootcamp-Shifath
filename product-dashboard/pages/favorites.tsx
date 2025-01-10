// pages/favorites.tsx
import Link from 'next/link';
import useStore from '@/store';
import { ProductGrid } from '@/components/ProductGrid';

export default function FavoritesPage() {
  const { favorites } = useStore();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your favorites list is empty</h2>
        <Link
          href="/products"
          className="text-primary hover:underline"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      <ProductGrid products={favorites} />
    </div>
  );
}