import Link from 'next/link'
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">Kaminari Starter</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="https://nextjs.org/docs" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Next.js Docs
                </Link>
              </li>
              <li>
                <Link href="https://github.com/your-username/kaminari" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Kaminari GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}

