// import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function Home() {
  return (
    <div 
    className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center" 
    style={{ 
      backgroundImage: 'url(/bg.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',  // Added blur effect to the background
      position: 'relative' // Added position for absolute positioning of text
    }} 
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center"> {/* Added wrapper for text */}
      <h1 className="text-5xl font-extrabold text-white">Welcome to Product Dashboard</h1> {/* Updated font size, weight, and color */}
      <p className="mt-4 text-2xl text-white"> {/* Updated font size and color */}
        Browse our collection of products and manage your favorites
      </p>
      <Link
            href="/products"
            className="mt-8 rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white hover:bg-gray-800 border rounded-md" // Added border radius
          >
            View Products
          </Link>
    </div>
  </div>
  );
}