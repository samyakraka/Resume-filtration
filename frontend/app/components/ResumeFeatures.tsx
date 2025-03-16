'use client'

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

export default function ResumeFeatures() {
  const [isEvaluating, setIsEvaluating] = useState(false)

  const handleEvaluate = () => {
    setIsEvaluating(true)
    // Simulating evaluation process
    setTimeout(() => {
      setIsEvaluating(false)
      alert('Evaluation complete!')
    }, 3000)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Resume Features</h2>

      <div>
        <Label htmlFor="workExperience">Work Experience</Label>
        <div className="flex gap-4 mt-1">
          <Input type="number" id="workExperience" placeholder="Years" />
          <Input type="text" placeholder="Job roles or projects" />
        </div>
      </div>

      <div>
        <Label htmlFor="certifications">Certifications and Training</Label>
        <div className="flex gap-4 mt-1">
          <Input type="text" id="certifications" placeholder="Certifications" />
          <Input type="date" />
        </div>
      </div>

      <div>
        <Label htmlFor="leadership">Leadership and Teamwork</Label>
        <Textarea id="leadership" placeholder="Descriptions or STAR narratives" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="problemSolving">Problem-Solving and Critical Thinking</Label>
        <Textarea id="problemSolving" placeholder="Situational responses" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="adaptability">Adaptability and Learning Agility</Label>
        <div className="space-y-2 mt-1">
          <Textarea id="adaptability" placeholder="Examples" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scenario1">Scenario 1</SelectItem>
              <SelectItem value="scenario2">Scenario 2</SelectItem>
              <SelectItem value="scenario3">Scenario 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="culturalFit">Cultural Fit and Values</Label>
        <div className="space-y-2 mt-1">
          <Textarea id="culturalFit" placeholder="Responses" />
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">Option 3</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label htmlFor="passion">Passion and Motivation</Label>
        <Textarea id="passion" placeholder="Essays or statements" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="extracurricular">Extracurricular Achievements</Label>
        <div className="flex gap-4 mt-1">
          <Input type="text" id="extracurricular" placeholder="Details" />
          <Input type="date" />
        </div>
      </div>

      <div>
        <Label htmlFor="communication">Communication Skills</Label>
        <div className="space-y-2 mt-1">
          <Input type="file" accept="video/*" />
          <Textarea placeholder="Written essays" />
        </div>
      </div>

      <div>
        <Label htmlFor="technicalProficiency">Technical Proficiency</Label>
        <div className="space-y-2 mt-1">
          <Input type="file" id="technicalProficiency" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select assessment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assessment1">Assessment 1</SelectItem>
              <SelectItem value="assessment2">Assessment 2</SelectItem>
              <SelectItem value="assessment3">Assessment 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="awards">Awards and Recognitions</Label>
        <div className="flex gap-4 mt-1">
          <Input type="text" id="awards" placeholder="Award names" />
          <Input type="number" placeholder="Year received" />
        </div>
      </div>

      <div>
        <Label htmlFor="availability">Availability and Commitment</Label>
        <div className="space-y-2 mt-1">
          <Input type="date" id="availability" />
          <div className="flex items-center space-x-2">
            <Checkbox id="relocation" />
            <Label htmlFor="relocation">Willing to relocate</Label>
          </div>
        </div>
      </div>

      <Button onClick={handleEvaluate} disabled={isEvaluating}>
        {isEvaluating ? 'Evaluating...' : 'Evaluate Resumes'}
      </Button>
    </div>
  )
}

