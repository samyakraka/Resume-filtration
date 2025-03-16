'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import { toast } from 'react-hot-toast'

export default function CheckResumePage() {
 const [file, setFile] = useState<File | null>(null)
 const [jobDescription, setJobDescription] = useState('')
 const [field, setField] = useState('')
 const [isScanning, setIsScanning] = useState(false)
 const router = useRouter()

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     setFile(e.target.files[0])
   }
 }

 const handleScan = async () => {
  if (!file) {
    toast.error('Please upload a resume')
    return
  }

  if (!field) {
    toast.error('Please select a field')
    return
  }

  setIsScanning(true)
  const formData = new FormData()
  formData.append('file', file)
  formData.append('jobDescription', jobDescription)
  formData.append('field', field)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-single`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    if (data.status === 'success') {
      router.push('/resume-analysis?results=' + encodeURIComponent(JSON.stringify(data.analysis)))
    } else {
      throw new Error(data.message || 'Resume analysis failed')
    }
  } catch (error) {
    console.error('Scan error:', error)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      toast.error('Unable to connect to the server. Please try again later or contact support.')
    } else if (error instanceof Error) {
      toast.error(`Analysis failed: ${error.message}`)
    } else {
      toast.error('An unexpected error occurred. Please try again.')
    }
  } finally {
    setIsScanning(false)
  }
}

 return (
   <div className="container mx-auto px-4 py-16">
     <h1 className="text-4xl font-bold text-center mb-8">Check Your Resume</h1>
     
     <Card className="max-w-2xl mx-auto">
       <CardHeader>
         <CardTitle>Upload Your Resume</CardTitle>
         <CardDescription>
           Let our AI-powered ATS checker analyze your resume and provide valuable insights.
         </CardDescription>
       </CardHeader>
       <CardContent className="space-y-6">
         <div className="space-y-2">
           <Label htmlFor="resume-upload">Upload Resume</Label>
           <div className="flex items-center justify-center w-full">
             <label
               htmlFor="resume-upload"
               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
             >
               <div className="flex flex-col items-center justify-center pt-5 pb-6">
                 <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                   <span className="font-semibold">Click to upload</span> or drag and drop
                 </p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">
                   PDF only (MAX. 5MB)
                 </p>
               </div>
               <Input
                 id="resume-upload"
                 type="file"
                 accept=".pdf"
                 className="hidden"
                 onChange={handleFileChange}
               />
             </label>
           </div>
         </div>

         {file && (
           <div className="flex items-center p-4 bg-blue-50 rounded-lg">
             <FileText className="w-6 h-6 text-blue-500 mr-2" />
             <span className="text-sm text-blue-700">{file.name}</span>
           </div>
         )}

         <div className="space-y-2">
           <Label htmlFor="field">Field</Label>
           <Select onValueChange={setField}>
             <SelectTrigger>
               <SelectValue placeholder="Select your field" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="technical">Technical</SelectItem>
               <SelectItem value="finance">Finance</SelectItem>
               <SelectItem value="marketing">Marketing</SelectItem>
               <SelectItem value="healthcare">Healthcare</SelectItem>
               <SelectItem value="other">Other</SelectItem>
             </SelectContent>
           </Select>
         </div>

         <div className="space-y-2">
           <Label htmlFor="job-description">Job Description (Optional)</Label>
           <Textarea
             id="job-description"
             placeholder="Paste the job description here for more accurate results"
             value={jobDescription}
             onChange={(e) => setJobDescription(e.target.value)}
             rows={6}
           />
         </div>
       </CardContent>
       <CardFooter>
         <Button
           onClick={handleScan}
           disabled={isScanning || !file}
           className="w-full"
         >
           {isScanning ? (
             <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Analyzing...
             </>
           ) : (
             'Analyze Resume'
           )}
         </Button>
       </CardFooter>
     </Card>

     {isScanning && <LoadingScreen />}

     <div className="mt-8 max-w-2xl mx-auto">
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center">
             <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
             Tips for Best Results
           </CardTitle>
         </CardHeader>
         <CardContent>
           <ul className="list-disc pl-5 space-y-2">
             <li>Ensure your resume is in PDF format</li>
             <li>Remove any images, charts, or graphics from your resume</li>
             <li>Use standard fonts and simple formatting</li>
             <li>Include relevant keywords from the job description</li>
             <li>Proofread your resume for spelling and grammatical errors</li>
           </ul>
         </CardContent>
       </Card>
     </div>
   </div>
 )
}

