'use client'

import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { AlertTriangle } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import { toast } from 'react-hot-toast'
import SignInModal from '../components/SignInModal'
import ResumeCountInput from '../components/ResumeCountInput'
import ResumeUpload from '../components/ResumeUpload'
import JobRequirementsInput from '../components/JobRequirementsInput'
import ResumeResults from '../components/ResumeResults'

export default function HrPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [numResumes, setNumResumes] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSignIn = (userData: { name: string; email: string }) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleResumeCountSubmit = (count: number) => {
    setNumResumes(count)
    setStep(2)
  }

  const handleUploadComplete = () => {
    setStep(3)
  }

  const handleJobRequirementsSubmit = async (jobRequirements: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobRequirements }),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setStep(4)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to analyze resumes')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              Access Restricted
            </CardTitle>
            <CardDescription>
              You must be logged in to access the HR Resume Analysis Dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please sign in to view and analyze resumes, or contact your administrator if you believe this is an error.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsSignInOpen(true)} className="w-full">Sign In</Button>
          </CardFooter>
        </Card>
        <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignIn={handleSignIn} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">HR Resume Analysis Dashboard</h1>

      {step === 1 && (
        <ResumeCountInput onSubmit={handleResumeCountSubmit} />
      )}

      {step === 2 && (
        <ResumeUpload numResumes={numResumes} onUploadComplete={handleUploadComplete} />
      )}

      {step === 3 && (
        <JobRequirementsInput onSubmit={handleJobRequirementsSubmit} />
      )}

      {isLoading && <LoadingScreen />}

      {step === 4 && results && (
        <ResumeResults results={results} />
      )}
    </div>
  )
}

