import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

interface JobDescriptionInputProps {
  onSubmit: (jobDescription: string) => void
  onError: (error: string) => void
}

export default function JobDescriptionInput({ onSubmit, onError }: JobDescriptionInputProps) {
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobDescription.trim()) {
      onSubmit(jobDescription)
    } else {
      onError('Job description cannot be empty')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>Enter the job description to match against the resumes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Enter the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            className="mb-4"
          />
          <Button type="submit" disabled={!jobDescription.trim()}>
            Analyze Resumes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

