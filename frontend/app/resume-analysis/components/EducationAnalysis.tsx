import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface EducationAnalysisProps {
  education: {
    entries: string[];
    improvements: string[];
  };
  cgpa: number | null;
}

export default function EducationAnalysis({ education, cgpa }: EducationAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education Analysis</CardTitle>
        <CardDescription>Evaluation of your educational background based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Education</h3>
            <ul className="list-disc pl-5 space-y-2">
              {education.entries.map((entry, index) => (
                <li key={index} className="text-sm text-gray-600">{entry}</li>
              ))}
            </ul>
          </div>
          {cgpa && (
            <div>
              <h3 className="text-lg font-semibold mb-2">CGPA/GPA</h3>
              <p className="text-sm text-gray-600">{cgpa}</p>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold mb-2">Education Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {education.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

