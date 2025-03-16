import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface AchievementsAnalysisProps {
  achievements: {
    entries: string[];
    improvements: string[];
  }
}

export default function AchievementsAnalysis({ achievements }: AchievementsAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements Analysis</CardTitle>
        <CardDescription>Evaluation of your achievements based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Achievements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {achievements.entries.map((achievement, index) => (
                <li key={index} className="text-sm text-gray-600">{achievement}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Achievement Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {achievements.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

