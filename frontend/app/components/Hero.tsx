import { Button } from '../components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SignInModal from './SignInModal'

export default function Hero() {
 const [isSignInOpen, setIsSignInOpen] = useState(false)
 const [user, setUser] = useState<{ name: string; email: string } | null>(null)

 useEffect(() => {
   const storedUser = localStorage.getItem('user')
   if (storedUser) {
     setUser(JSON.parse(storedUser))
   }
 }, [])

 const handleCheckResume = () => {
   if (user) {
     window.location.href = '/check-resume'
   } else {
     setIsSignInOpen(true)
   }
 }

 return (
   <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
       <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
         <span className="block">Optimize Your Resume for</span>
         <span className="block text-green-600 dark:text-green-400">ATS Success</span>
       </h1>
       <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
         Increase your chances of landing an interview by ensuring your resume passes through Applicant Tracking Systems with flying colors.
       </p>
       <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
         <div className="rounded-md shadow">
           <Button size="lg" onClick={handleCheckResume}>
             Check Your Resume
           </Button>
         </div>
         <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
           <Link href="/learn-more" passHref>
             <Button variant="outline" size="lg">
               Learn More
             </Button>
           </Link>
         </div>
       </div>
     </div>
     <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignIn={(userData) => {
       setUser(userData)
       localStorage.setItem('user', JSON.stringify(userData))
       window.location.href = '/check-resume'
     }} />
   </div>
 )
}

