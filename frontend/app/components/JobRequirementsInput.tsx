'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

interface JobRequirementsInputProps {
  onSubmit: (jobRequirements: any) => void
}

export default function JobRequirementsInput({ onSubmit }: JobRequirementsInputProps) {
  const [jobRequirements, setJobRequirements] = useState({
    skills: '',
    experience: '',
    education: '',
    cgpa: '',
    additionalRequirements: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...jobRequirements,
      skills: jobRequirements.skills.split(',').map(skill => skill.trim())
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setJobRequirements(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Requirements</CardTitle>
        <CardDescription>Enter the job requirements to match against the resumes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="skills">Required Skills (comma-separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={jobRequirements.skills}
                onChange={handleChange}
                placeholder="e.g. Python, SQL, Cloud Computing"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="experience">Required Experience (years)</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={jobRequirements.experience}
                onChange={handleChange}
                placeholder="e.g. 2"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="education">Required Education</Label>
              <Input
                id="education"
                name="education"
                value={jobRequirements.education}
                onChange={handleChange}
                placeholder="e.g. Bachelor of Technology"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cgpa">Required CGPA</Label>
              <Input
                id="cgpa"
                name="cgpa"
                type="number"
                step="0.1"
                value={jobRequirements.cgpa}
                onChange={handleChange}
                placeholder="e.g. 8.0"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="additionalRequirements">Additional Requirements</Label>
              <Textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={jobRequirements.additionalRequirements}
                onChange={handleChange}
                placeholder="e.g. Badminton, Cricket"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Analyze Resumes</Button>
      </CardFooter>
    </Card>
  )
}

