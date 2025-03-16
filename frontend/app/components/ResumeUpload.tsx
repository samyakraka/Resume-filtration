'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Loader2, UploadCloud } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ResumeUploadProps {
  numResumes: number
  onUploadComplete: () => void
}

export default function ResumeUpload({ numResumes, onUploadComplete }: ResumeUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const handleUpload = async () => {
    if (!files || files.length !== numResumes) {
      toast.error(`Please select exactly ${numResumes} resume(s)`)
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
    formData.append('num_resumes', numResumes.toString())

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Resumes uploaded successfully')
        onUploadComplete()
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload resumes')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Resumes</CardTitle>
        <CardDescription>Upload {numResumes} resume(s) for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, DOCX (MAX. 10MB per file)
              </p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.docx"
            />
          </Label>
        </div>
        {files && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {files.length} file(s) selected
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={isUploading || !files || files.length !== numResumes}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload and Process'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

