import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface ContentAnalysisProps {
  title: string
  items: string[]
}

export default function ContentAnalysis({ title, items }: ContentAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} Analysis</CardTitle>
        <CardDescription>Evaluation of your {title.toLowerCase()} based on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="bg-muted p-3 rounded-md">
                <p>{item}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No {title.toLowerCase()} information found. Consider adding relevant details to your resume.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

