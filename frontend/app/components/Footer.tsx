import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
              ATS Checker
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Optimizing resumes for success in the modern job market.
            </p>
            <div className="flex space-x-6">
              {/* Add social media icons here */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-200 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Resume Check
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Keyword Optimization
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Format Analysis
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-200 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/pricing" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/documentation" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Jobs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-200 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-300 xl:text-center">
            &copy; 2023 ATS Checker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

