'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { CheckCircle, XCircle, AlertCircle, FileText, Briefcase, GraduationCap, Code, Target, Download, FileSpreadsheet } from 'lucide-react'
import SkillsAnalysis from './components/SkillsAnalysis'
import ExperienceAnalysis from './components/ExpericenceAnalysis'
import EducationAnalysis from './components/EducationAnalysis'
import AchievementsAnalysis from './components/AchievementAnalysis'
import ProjectsAnalysis from './components/ProjectAnalysis'
import Improvements from './components/Improvements'
import FAQSection from './components/FAQSection'

export default function ResumeAnalysisPage() {
  const searchParams = useSearchParams()
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resultsParam = searchParams.get('results')
    if (resultsParam) {
      try {
        const parsedResults = JSON.parse(decodeURIComponent(resultsParam))
        setAnalysisResults(parsedResults)
      } catch (decodeError) {
        console.error('Error parsing analysis results:', decodeError)
        setError('Failed to parse analysis results. Please try again.')
      }
    }
  }, [searchParams])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  if (!analysisResults) {
    return <div className="container mx-auto px-4 py-8">Loading analysis results...</div>
  }

  const { 
    skills,
    experience,
    education,
    achievements,
    projects,
    cgpa,
    areas_of_strength,
    areas_for_improvement,
    overall_score,
    job_fit_analysis
  } = analysisResults

  const scoreColor = overall_score >= 80 ? 'text-green-500' : overall_score >= 60 ? 'text-yellow-500' : 'text-red-500'

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Resume Analysis Results</h1>
      
      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Based on content, format, and ATS compatibility</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <motion.div
              className={`text-6xl font-bold ${scoreColor}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {overall_score}/100
            </motion.div>
            <Progress value={overall_score} className="w-full mt-4" />
            <p className="mt-2 text-sm text-gray-500">{areas_for_improvement.length} areas for improvement found</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => console.log("Download report")}>
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button variant="outline" onClick={() => console.log("Export CSV")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Fit Analysis</CardTitle>
            <CardDescription>How well your resume matches the job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{job_fit_analysis}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="mt-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
        </TabsList>
        <TabsContent value="skills">
          <SkillsAnalysis skills={skills} />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceAnalysis experience={experience} />
        </TabsContent>
        <TabsContent value="education">
          <EducationAnalysis education={education} cgpa={cgpa} />
        </TabsContent>
        <TabsContent value="achievements">
          <AchievementsAnalysis achievements={achievements} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsAnalysis projects={projects} />
        </TabsContent>
        <TabsContent value="improvements">
          <Improvements 
            skillsImprovements={skills.improvements}
            experienceImprovements={experience.improvements}
            educationImprovements={education.improvements}
            achievementsImprovements={achievements.improvements}
            projectsImprovements={projects.improvements}
            areasForImprovement={areas_for_improvement}
          />
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Areas of Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {areas_of_strength.map((strength, index) => (
              <li key={index} className="text-sm text-gray-600">{strength}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <FAQSection className="mt-8" />
    </div>
  )
}

