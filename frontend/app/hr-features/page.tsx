import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { CheckCircle, Users, BarChart, Search, FileText, Brain, Zap, Clock, Lock } from 'lucide-react'
import { Button } from "../components/ui/button"

export default function HrFeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">HR Features</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-xl text-center text-gray-600 dark:text-gray-300">
          Discover how ATS Checker can streamline your recruitment process and help you find the best candidates efficiently.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-6 w-6 text-blue-500" />
              Bulk Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analyze multiple resumes simultaneously, saving time and effort in the initial screening process. Our system can handle large volumes of applications efficiently.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-green-500" />
              Custom Screening Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set up custom screening criteria based on job requirements. Our system will automatically filter and rank candidates according to your specific needs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-500" />
              AI-Powered Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Leverage our advanced AI algorithms to match candidates with job openings. The system learns from your hiring patterns to improve matching accuracy over time.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-6 w-6 text-orange-500" />
              Detailed Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access comprehensive analytics on your hiring process. Gain insights into candidate pools, skill distributions, and recruitment funnel metrics to optimize your strategies.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-indigo-500" />
              Collaborative Hiring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Facilitate team-based hiring with collaborative tools. Share candidate profiles, leave comments, and make decisions collectively within the platform.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-500" />
              Integration Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Seamlessly integrate ATS Checker with your existing HR systems and applicant tracking software to create a unified recruitment ecosystem.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-6 w-6 text-red-500" />
              Time-Saving Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Automate repetitive tasks such as initial resume screening, candidate ranking, and basic communication to free up your time for high-value recruitment activities.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-6 w-6 text-gray-500" />
              Data Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Rest assured with our robust data security measures and compliance with data protection regulations. Your candidates' information is safe and protected.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-teal-500" />
              Customizable Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Generate customized reports on various aspects of your recruitment process. Get the data you need to make informed decisions and report to stakeholders.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment Process?</h2>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join leading companies that have streamlined their hiring process and improved the quality of their hires with ATS Checker.
        </p>
        <Button size="lg" asChild>
          <a href="/pricing">Get Started Now</a>
        </Button>
      </div>
    </div>
  )
}

