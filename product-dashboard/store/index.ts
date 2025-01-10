import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface StoreState {
  theme: 'light' | 'dark';
  favorites: Product[];
  searchTerm: string;
  toggleTheme: () => void;
  setSearchTerm: (term: string) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isProductInFavorites: (productId: number) => boolean;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      favorites: [],
      searchTerm: '',
      toggleTheme: () => set(state => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      addToFavorites: (product) => 
        set(state => ({
          favorites: [...state.favorites, product]
        })),
      removeFromFavorites: (productId) => 
        set(state => ({
          favorites: state.favorites.filter(item => item.id !== productId)
        })),
      isProductInFavorites: (productId) => 
        get().favorites.some(item => item.id === productId)
    }),
    {
      name: 'product-storage'
    }
  )
);

export default useStore;