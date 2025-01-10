import { Product } from '@/types';
// import Link from 'next/link';
import useStore from '@/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToFavorites, removeFromFavorites, isProductInFavorites } = useStore();

  const handleFavoriteClick = () => {
    if (isProductInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded" /> {/* Added image */}
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="mt-2 text-2xl font-bold text-primary">${product.price}</p>
      <p className="mt-1 text-sm text-gray-600">Rating: {product.rating} ⭐</p> {/* Added rating display */}
      <div className="mt-4 flex justify-between">
        
        <button
          onClick={handleFavoriteClick}
          className={`rounded px-4 py-2 ${
            isProductInFavorites(product.id)
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          {isProductInFavorites(product.id) ? 'Remove' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}