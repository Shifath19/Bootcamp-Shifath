import { useEffect } from 'react';
import useStore from '@/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
