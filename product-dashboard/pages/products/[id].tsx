import { GetStaticProps } from 'next';
import { Product } from '@/types';
import { ProductGrid } from '@/components/ProductGrid';
import { SearchBar } from '@/components/SearchBar';
import useStore from '@/store';
import productsData from '@/data/products.json';

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const { searchTerm } = useStore();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <SearchBar />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Access the products array from the data
  const products = productsData.products;

  return {
    props: {
      products,
    },
  };
};