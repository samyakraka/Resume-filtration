import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Briefcase, MapPin, Clock } from 'lucide-react'

const jobListings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for an experienced frontend developer to join our team and help build the next generation of our ATS Checker platform."
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our design team to create intuitive and beautiful user experiences for our web and mobile applications."
  },
  {
    title: "Data Scientist",
    department: "Data",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Help us leverage machine learning and AI to improve our resume analysis algorithms and provide better insights to our users."
  },
  {
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    description: "Work closely with our enterprise clients to ensure they're getting the most value out of our platform and help drive customer satisfaction."
  }
]

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Team</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        We're always looking for talented individuals to help us revolutionize the hiring process. Check out our open positions below.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2">
        {jobListings.map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{job.title}</span>
                <span className="text-sm font-normal text-gray-500">{job.department}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{job.type}</span>
              </div>
              <p className="mb-4">{job.description}</p>
              <Button>Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

