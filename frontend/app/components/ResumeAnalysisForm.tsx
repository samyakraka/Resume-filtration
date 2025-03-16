'use client'

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { toast } from 'react-hot-toast'

interface ResumeAnalysisFormProps {
  onAnalyze: (jobDescription: string) => void
}

export default function ResumeAnalysisForm({ onAnalyze }: ResumeAnalysisFormProps) {
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description before analyzing.')
      return
    }

    onAnalyze(jobDescription)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter the job description here..."
          className="mt-1"
          rows={10}
        />
      </div>

      <Button type="submit">Analyze Resumes</Button>
    </form>
  )
}

