import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { CheckCircle, Zap, BarChart, Users, Search, FileText, Brain, Cog } from 'lucide-react'

export default function LearnMorePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Learn More About ATS Checker</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-xl text-center text-gray-600 dark:text-gray-300">
          Discover how ATS Checker can revolutionize your job application process and improve your chances of landing your dream job.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-6 w-6 text-blue-500" />
              ATS Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our advanced algorithms analyze your resume to ensure it's compatible with popular Applicant Tracking Systems (ATS). We help you avoid common formatting issues that could prevent your resume from reaching human recruiters.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-green-500" />
              Keyword Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We identify industry-specific keywords and skills that are crucial for your target job. Our system suggests improvements to help your resume match the job description more closely, increasing your chances of passing ATS filters.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-500" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Leveraging cutting-edge AI and machine learning technologies, we provide personalized recommendations to enhance your resume. Our system learns from successful resumes in your industry to offer tailored advice.</p>
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
            <p>Receive comprehensive analytics on your resume's performance. We break down your score across various categories, helping you understand your strengths and areas for improvement.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-indigo-500" />
              For Job Seekers and HR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Whether you're a job seeker looking to optimize your resume or an HR professional streamlining your recruitment process, ATS Checker offers tools and insights to meet your needs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cog className="mr-2 h-6 w-6 text-red-500" />
              Continuous Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We constantly update our algorithms and databases to keep up with the latest trends in recruitment and ATS technologies. This ensures that your resume always meets current industry standards.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of successful job seekers who have improved their resumes and landed their dream jobs with ATS Checker.
        </p>
        <a href="/check-resume" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
          Get Started Now
        </a>
      </div>
    </div>
  )
}

