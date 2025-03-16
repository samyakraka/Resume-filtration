import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Link from 'next/link'
import { CalendarDays, User, ArrowRight } from 'lucide-react'

const featuredPost = {
  title: "The Impact of AI on Modern Recruitment Practices",
  excerpt: "Explore how artificial intelligence is reshaping the hiring landscape and what it means for both employers and job seekers.",
  date: "2023-06-15",
  author: "Dr. Jane Smith",
  slug: "ai-impact-modern-recruitment"
}

const blogPosts = [
  {
    title: "Optimizing Your Resume for ATS: A Comprehensive Guide",
    excerpt: "Learn the key strategies to ensure your resume passes through Applicant Tracking Systems and reaches human recruiters.",
    date: "2023-06-10",
    author: "John Davis, HR Specialist",
    slug: "optimizing-resume-for-ats"
  },
  {
    title: "The Future of Work: Emerging Trends in the Job Market",
    excerpt: "Discover the latest trends shaping the job market and how to prepare for the future of work.",
    date: "2023-06-05",
    author: "Emily Johnson, Career Strategist",
    slug: "future-of-work-trends"
  },
  {
    title: "Mastering the Art of the Modern Cover Letter",
    excerpt: "Uncover the secrets to crafting a compelling cover letter that complements your resume and captures the attention of hiring managers.",
    date: "2023-05-30",
    author: "Michael Brown, Professional Resume Writer",
    slug: "mastering-modern-cover-letter"
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">ATS Checker Insights</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Stay informed with the latest trends, tips, and strategies in the world of recruitment and career development.
      </p>
      
      <div className="mb-12">
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center mb-4 text-sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{featuredPost.date}</span>
              <User className="w-4 h-4 ml-4 mr-2" />
              <span>{featuredPost.author}</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="mb-6 text-lg">{featuredPost.excerpt}</p>
            <Button asChild variant="secondary">
              <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center">
                Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

