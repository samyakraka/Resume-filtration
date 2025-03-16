import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { CheckCircle, Users, Zap, BarChart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About ATS Checker</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>At ATS Checker, we're committed to empowering job seekers and HR professionals alike. Our mission is to streamline the hiring process by providing cutting-edge resume analysis tools that bridge the gap between talented candidates and their dream jobs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-blue-500" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We're a team of passionate developers, data scientists, and HR experts who understand the challenges of modern recruitment. By combining our diverse expertise, we've created a powerful platform that leverages AI and machine learning to revolutionize how resumes are evaluated.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-500" />
              Our Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>ATS Checker utilizes state-of-the-art natural language processing and machine learning algorithms. We continuously refine our models to ensure the most accurate and fair assessment of resumes, helping both candidates and employers find their perfect match.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-6 w-6 text-purple-500" />
            Our Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Since our inception, ATS Checker has:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyzed over 1 million resumes</li>
            <li>Helped 100,000+ job seekers improve their applications</li>
            <li>Partnered with 500+ companies to optimize their hiring processes</li>
            <li>Reduced average time-to-hire by 30% for our corporate clients</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Us in Shaping the Future of Recruitment</h2>
        <p className="max-w-2xl mx-auto">
          Whether you're a job seeker looking to stand out or an employer seeking the best talent, ATS Checker is here to guide you through the evolving landscape of modern hiring. Together, we can create more opportunities and build stronger teams.
        </p>
      </div>
    </div>
  )
}

