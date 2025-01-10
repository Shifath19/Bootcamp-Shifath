import Link from 'next/link';
import { ToggleTheme } from './ToggleTheme';
import useStore from '@/store';
import { Heart } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { favorites } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <nav className=" top-0 z-10 border-b bg-background justify-around">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-around">
            <div className="flex items-center space-x-4 ">
              <Link href="/" className="font-bold text-xl">
                Dashboard
              </Link>
              <Link href="/products">Products</Link>
              <Link href="/favorites" className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                <span>({favorites.length})</span>
              </Link>
            </div>
            
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}