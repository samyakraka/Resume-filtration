import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"

export default function ATSCompatibility() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ATS Compatibility</CardTitle>
        <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Overall ATS Score</span>
            <Badge variant="success">Excellent</Badge>
          </div>
          <Progress value={95} className="w-full" />
          <p className="text-sm text-gray-500">Your resume is highly compatible with most ATS systems.</p>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Key Factors:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Simple, clean formatting</li>
              <li>Standard section headings</li>
              <li>Absence of images or complex graphics</li>
              <li>Use of common fonts</li>
              <li>Proper file format (PDF)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

