'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, User } from 'lucide-react'
import { Button } from '../components/ui/button'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }

    checkUserAuth() // Check on initial load
    window.addEventListener('storage', checkUserAuth)

    return () => {
      window.removeEventListener('storage', checkUserAuth)
    }
  }, [])

  const handleSignIn = (userData: { name: string; email: string }) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    window.dispatchEvent(new Event('storage'))
  }

  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
              ATS Checker
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/check-resume" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Check Resume
            </Link>
            <Link href="/guides" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Guides
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsSignInOpen(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setIsSignUpOpen(true)}>
                  Sign Up
                </Button>
              </>
            )}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {user && (
              <Button variant="ghost" size="icon" className="mr-2">
                <User className="h-5 w-5" />
              </Button>
            )}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mr-2"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/check-resume" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
              Check Resume
            </Link>
            <Link href="/guides" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
              Guides
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
              Blog
            </Link>
            {user ? (
              <div className="space-y-2">
                <span className="block text-gray-700 dark:text-gray-300 px-3 py-2">Welcome, {user.name}</span>
                <Button variant="outline" onClick={handleSignOut} className="w-full">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsSignInOpen(true)} className="w-full mt-2">
                  Sign In
                </Button>
                <Button onClick={() => setIsSignUpOpen(true)} className="w-full mt-2">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignIn={handleSignIn} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </nav>
  )
}

