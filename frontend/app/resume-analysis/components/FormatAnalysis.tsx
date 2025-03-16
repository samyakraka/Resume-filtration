import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"

interface FormatAnalysisProps {
  resumeLength: number
  bulletPointLength: boolean
  sectionOrder: boolean
  atsCompatibility: number;
}

export default function FormatAnalysis({ resumeLength, bulletPointLength, sectionOrder, atsCompatibility }: FormatAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Format Analysis</CardTitle>
        <CardDescription>Evaluation of your resume's structure and layout</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Resume Length</span>
            <Badge variant={resumeLength >= 80 ? "success" : "warning"}>
              {resumeLength >= 80 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
          <Progress value={resumeLength} className="w-full" />
          <p className="text-sm text-gray-500">
            {resumeLength >= 80
              ? "Your resume is within the accepted standards for length."
              : "Your resume might be too short or too long. Aim for 1-2 pages depending on your experience level."}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span>Bullet Point Length</span>
            <Badge variant={bulletPointLength ? "success" : "warning"}>
              {bulletPointLength ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            {bulletPointLength
              ? "All bullet points in your resume fit within the recommended length."
              : "Some of your bullet points may be too long. Aim for 1-2 lines per bullet point."}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span>Section Order</span>
            <Badge variant={sectionOrder ? "success" : "warning"}>
              {sectionOrder ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            {sectionOrder
              ? "Your resume sections are in an optimal order for readability."
              : "Consider reordering your resume sections to improve readability and impact."}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span>ATS Compatibility</span>
            <Badge variant={atsCompatibility >= 80 ? "success" : "warning"}>
              {atsCompatibility >= 80 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
          <Progress value={atsCompatibility} className="w-full" />
          <p className="text-sm text-gray-500">
            {atsCompatibility >= 80
              ? "Your resume is highly compatible with ATS systems."
              : "Consider improving your resume's format to increase ATS compatibility."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

