import { CheckCircle, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    name: 'ATS Compatibility Check',
    description: 'Ensure your resume is compatible with popular Applicant Tracking Systems.',
    icon: CheckCircle,
  },
  {
    name: 'Instant Feedback',
    description: 'Get real-time feedback on how to improve your resume for better results.',
    icon: Zap,
  },
  {
    name: 'Keyword Optimization',
    description: 'Optimize your resume with industry-specific keywords to increase your chances.',
    icon: TrendingUp,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Boost Your Job Application Success
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Our ATS Checker provides powerful tools to help you land more interviews.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 dark:bg-green-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

