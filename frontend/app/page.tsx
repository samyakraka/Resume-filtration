'use client'

import { useState, useEffect, useRef } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import HrSection from './components/HrSection'

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [showLogoutMessage, setShowLogoutMessage] = useState(false)
  const initialRender = useRef(true)

  useEffect(() => {
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
        setShowLogoutMessage(false)
      } else {
        if (user !== null) {
          // User has just logged out
          setShowLogoutMessage(true)
          setTimeout(() => setShowLogoutMessage(false), 3000) // Hide message after 3 seconds
        }
        setUser(null)
      }
    }

    if (initialRender.current) {
      initialRender.current = false
      checkUserAuth() // Check on initial load
    }

    window.addEventListener('storage', checkUserAuth)

    return () => {
      window.removeEventListener('storage', checkUserAuth)
    }
  }, [])

  return (
    <div>
      {user && (
        <div className="bg-green-100 dark:bg-green-900 p-4 text-center">
          <p className="text-green-800 dark:text-green-200">
            Welcome back, {user.name}! You&apos;re logged in with {user.email}.
          </p>
        </div>
      )}
      {showLogoutMessage && (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 text-center">
          <p className="text-blue-800 dark:text-blue-200">
            Successfully logged out. Thank you for using ATS Checker!
          </p>
        </div>
      )}
      <Hero />
      <Features />
      <HrSection />
    </div>
  )
}

