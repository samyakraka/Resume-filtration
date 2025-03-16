import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface ExperienceAnalysisProps {
  experience: {
    entries: string[];
    improvements: string[];
  }
}

export default function ExperienceAnalysis({ experience }: ExperienceAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Analysis</CardTitle>
        <CardDescription>Evaluation of your work experience based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Experience</h3>
            <ul className="list-disc pl-5 space-y-2">
              {experience.entries.map((entry, index) => (
                <li key={index} className="text-sm text-gray-600">{entry}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {experience.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

