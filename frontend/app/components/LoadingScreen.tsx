import { Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const steps = [
  "Extracting resume content...",
  "Analyzing skills and experience...",
  "Evaluating education and achievements...",
  "Calculating overall scores...",
  "Preparing final results..."
]

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg font-medium text-center mb-4">Analyzing Resumes...</p>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${index <= currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />
              <p className={`text-sm ${index <= currentStep ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {step}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">This may take a few moments</p>
    </div>
  </div>
)
}

