import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { AlertCircle } from 'lucide-react'

interface ImprovementsProps {
  suggestions: string[]
}

export default function Improvements({ suggestions }: ImprovementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Areas for Improvement</CardTitle>
        <CardDescription>Suggestions to enhance your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-500">{suggestion}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button>Get Professional Review</Button>
      </CardFooter>
    </Card>
  )
}

