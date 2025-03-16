import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { FileText, Code, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const docSections = [
  {
    title: "Getting Started",
    description: "Learn how to set up and use ATS Checker",
    icon: FileText,
    link: "/documentation/getting-started"
  },
  {
    title: "API Reference",
    description: "Detailed documentation of our API endpoints",
    icon: Code,
    link: "/documentation/api-reference"
  },
  {
    title: "Configuration",
    description: "Customize ATS Checker to fit your needs",
    icon: Settings,
    link: "/documentation/configuration"
  },
  {
    title: "FAQs",
    description: "Answers to commonly asked questions",
    icon: HelpCircle,
    link: "/documentation/faqs"
  }
]

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Documentation</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Explore our comprehensive documentation to get the most out of ATS Checker.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {docSections.map((section, index) => (
          <Link href={section.link} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="w-6 h-6 mr-2 text-blue-500" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

