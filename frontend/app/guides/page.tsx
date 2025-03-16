import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BookOpen, FileText, Briefcase, Search } from 'lucide-react'
import Link from 'next/link'

const guides = [
  {
    title: "Resume Writing 101",
    description: "Learn the basics of crafting an effective resume",
    icon: FileText,
    link: "/guides/resume-writing-101"
  },
  {
    title: "Mastering ATS Keywords",
    description: "Understand how to use keywords to pass ATS scans",
    icon: Search,
    link: "/guides/mastering-ats-keywords"
  },
  {
    title: "Industry-Specific Resume Tips",
    description: "Tailor your resume for different industries",
    icon: Briefcase,
    link: "/guides/industry-specific-tips"
  },
  {
    title: "Interview Preparation",
    description: "Get ready for your interview with our comprehensive guide",
    icon: BookOpen,
    link: "/guides/interview-preparation"
  }
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Career Guides</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Explore our comprehensive guides to help you navigate your career journey and optimize your job search process.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {guides.map((guide, index) => (
          <Link href={guide.link} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <guide.icon className="w-6 h-6 mr-2 text-blue-500" />
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{guide.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

