import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Analysis Results | ATS Checker',
  description: 'Detailed analysis of your resume, including ATS compatibility, content quality, and format evaluation.',
}

export default function ResumeAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}

