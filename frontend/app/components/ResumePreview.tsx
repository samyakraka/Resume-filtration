import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Loader2 } from 'lucide-react'

interface ResumePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  resumeData: {
    filename: string
    temp_file_path: string
  }
}

export default function ResumePreviewModal({ isOpen, onClose, resumeData }: ResumePreviewModalProps) {
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && resumeData) {
      setIsLoading(true)
      fetch(`/api/preview_resume?temp_file_path=${encodeURIComponent(resumeData.temp_file_path)}`)
        .then(response => response.json())
        .then(data => {
          setResumeText(data.resume_text)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching resume preview:', error)
          setIsLoading(false)
        })
    }
  }, [isOpen, resumeData])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resume Preview: {resumeData?.filename}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm">{resumeText}</pre>
        )}
      </DialogContent>
    </Dialog>
  )
}

