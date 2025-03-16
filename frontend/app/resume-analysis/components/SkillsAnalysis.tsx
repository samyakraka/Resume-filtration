import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

interface SkillsAnalysisProps {
  skills: {
    technical: string[];
    soft: string[];
    improvements: string[];
  }
}

export default function SkillsAnalysis({ skills }: SkillsAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Analysis</CardTitle>
        <CardDescription>Evaluation of your skills based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Skill Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {skills.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

