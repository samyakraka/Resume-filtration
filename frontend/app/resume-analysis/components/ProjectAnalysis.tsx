import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface ProjectsAnalysisProps {
  projects: {
    entries: string[];
    improvements: string[];
  }
}

export default function ProjectsAnalysis({ projects }: ProjectsAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Analysis</CardTitle>
        <CardDescription>Evaluation of your projects based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Projects</h3>
            <ul className="list-disc pl-5 space-y-2">
              {projects.entries.map((project, index) => (
                <li key={index} className="text-sm text-gray-600">{project}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {projects.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

