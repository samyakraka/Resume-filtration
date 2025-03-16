import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

interface ResumeCountInputProps {
  onSubmit: (count: number) => void
}

export default function ResumeCountInput({ onSubmit }: ResumeCountInputProps) {
  const [count, setCount] = useState(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(count)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Resumes</CardTitle>
        <CardDescription>Enter the number of resumes you want to analyze</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resumeCount">Number of Resumes</Label>
              <Input
                id="resumeCount"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value)))}
                min="1"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Next</Button>
      </CardFooter>
    </Card>
  )
}

