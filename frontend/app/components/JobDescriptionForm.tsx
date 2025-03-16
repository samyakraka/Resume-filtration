import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Slider } from '../components/ui/slider'
import { toast } from 'react-hot-toast'

interface JobDescriptionFormProps {
  onAnalyze: (jobDescription: any) => void
}

export default function JobDescriptionForm({ onAnalyze }: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState({
    yearsExperience: 5,
    pythonExpertise: 0,
    djangoExpertise: 0,
    flaskExpertise: 0,
    mlAiUnderstanding: 0,
    databaseExperience: [],
    gitExpertise: 0,
    dockerExpertise: 0,
    education: '',
    additionalSkills: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if at least one filter is applied
    const hasFilters = Object.values(jobDescription).some(value => 
      (Array.isArray(value) && value.length > 0) || 
      (typeof value === 'string' && value.trim() !== '') ||
      (typeof value === 'number' && value > 0)
    )

    if (!hasFilters) {
      toast.error('Please fill in at least one field before analyzing.')
      return
    }

    onAnalyze(jobDescription)
  }

  const handleChange = (field: string, value: string | string[] | number) => {
    setJobDescription(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    setJobDescription(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="yearsExperience">Years of Python Development Experience</Label>
        <Slider
          id="yearsExperience"
          min={0}
          max={15}
          step={1}
          value={[jobDescription.yearsExperience]}
          onValueChange={(value) => handleChange('yearsExperience', value[0])}
        />
        <div className="text-sm text-muted-foreground mt-1">{jobDescription.yearsExperience} years</div>
      </div>

      <div>
        <Label>Expertise Level</Label>
        {['Python', 'Django', 'Flask', 'Git', 'Docker'].map((skill) => (
          <div key={skill} className="mt-2">
            <Label htmlFor={skill.toLowerCase()}>{skill}</Label>
            <Slider
              id={skill.toLowerCase()}
              min={0}
              max={5}
              step={1}
              value={[jobDescription[`${skill.toLowerCase()}Expertise` as keyof typeof jobDescription] as number]}
              onValueChange={(value) => handleChange(`${skill.toLowerCase()}Expertise`, value[0])}
            />
            <div className="text-sm text-muted-foreground mt-1">
              {jobDescription[`${skill.toLowerCase()}Expertise` as keyof typeof jobDescription]} / 5
            </div>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="mlAiUnderstanding">ML/AI Concepts Understanding</Label>
        <Slider
          id="mlAiUnderstanding"
          min={0}
          max={5}
          step={1}
          value={[jobDescription.mlAiUnderstanding]}
          onValueChange={(value) => handleChange('mlAiUnderstanding', value[0])}
        />
        <div className="text-sm text-muted-foreground mt-1">{jobDescription.mlAiUnderstanding} / 5</div>
      </div>

      <div>
        <Label>Database Experience</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['PostgreSQL', 'MongoDB'].map((db) => (
            <div key={db} className="flex items-center space-x-2">
              <Checkbox
                id={db.toLowerCase()}
                checked={jobDescription.databaseExperience.includes(db)}
                onCheckedChange={() => handleCheckboxChange('databaseExperience', db)}
              />
              <Label htmlFor={db.toLowerCase()}>{db}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="education">Education</Label>
        <Select onValueChange={(value) => handleChange('education', value)}>
          <SelectTrigger id="education">
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bachelors">Bachelor's in Computer Science or related</SelectItem>
            <SelectItem value="masters">Master's in Computer Science or related</SelectItem>
            <SelectItem value="phd">PhD in Computer Science or related</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="additionalSkills">Additional Skills or Requirements</Label>
        <Textarea
          id="additionalSkills"
          placeholder="e.g., Scalable application development, Machine learning implementation, Database optimization"
          value={jobDescription.additionalSkills}
          onChange={(e) => handleChange('additionalSkills', e.target.value)}
        />
      </div>

      <Button type="submit">Analyze Resumes</Button>
    </form>
  )
}

