import { Button } from '../components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import SignInModal from './SignInModal'

export default function HrSection() {
 const [isSignInOpen, setIsSignInOpen] = useState(false)
 const [user, setUser] = useState<{ name: string; email: string } | null>(null)

 useEffect(() => {
   const storedUser = localStorage.getItem('user')
   if (storedUser) {
     setUser(JSON.parse(storedUser))
   }
 }, [])

 const handleCheckResumes = () => {
   if (user) {
     window.location.href = '/hr'
   } else {
     setIsSignInOpen(true)
   }
 }

 return (
   <section className="py-16 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="lg:flex lg:items-center lg:justify-between">
         <div className="max-w-xl lg:max-w-lg">
           <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
             <span className="block">Streamline Your</span>
             <span className="block text-green-600 dark:text-green-400">Hiring Process</span>
           </h2>
           <p className="mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
             Effortlessly analyze multiple resumes, saving time and ensuring you find the best candidates for your organization.
           </p>
           <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
             <Button size="lg" onClick={handleCheckResumes}>
               Check Multiple Resumes
             </Button>
             <Link 
               href="/hr-features" 
               className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-500 dark:hover:text-green-300"
             >
               Learn More <ArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
         </div>
         <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
           <div className="relative h-64 w-full overflow-hidden rounded-lg sm:w-96">
             <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-75"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                 <p className="text-xl font-semibold text-white">Bulk Resume Analysis</p>
                 <p className="mt-2 text-sm text-white opacity-75">Upload up to 50 resumes at once</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignIn={(userData) => {
       setUser(userData)
       localStorage.setItem('user', JSON.stringify(userData))
       window.location.href = '/hr'
     }} />
   </section>
 )
}

