'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Download, FileSpreadsheet, ChevronDown, ChevronUp, Eye, Award, Briefcase, GraduationCap, Code, Target } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

interface Result {
  scores: {
    skills: { score: number; matched: string[]; missing: string[] };
    experience: { score: number; years: number };
    education: { score: number };
    achievements: { score: number; found: any[] };
    projects: { score: number; found: any[] };
    cgpa: { score: number; found: number | null };
  };
  overall_score: number;
  report: string;
  resume_data: any;
}

interface ResumeResultsProps {
  results: { [key: string]: Result };
}

export default function ResumeResults({ results }: ResumeResultsProps) {
  const [expandedResume, setExpandedResume] = useState<string | null>(null)

  const handleDownload = (filename: string) => {
    // Implement download logic here
    console.log(`Downloading ${filename}`)
  }

  const handleExportCSV = () => {
    // Implement CSV export logic here
    console.log('Exporting CSV')
  }

  const toggleExpand = (name: string) => {
    setExpandedResume(expandedResume === name ? null : name)
  }

  const sortedResults = Object.entries(results).sort((a, b) => b[1].overall_score - a[1].overall_score)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Resume Analysis Results</h2>
        <Button onClick={handleExportCSV} variant="outline">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      {sortedResults.map(([name, result], index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
              <CardTitle className="flex justify-between items-center">
                <span className="text-2xl">{name}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant={result.overall_score >= 80 ? "success" : result.overall_score >= 60 ? "warning" : "destructive"}>
                    {Math.round(result.overall_score)}%
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(name)}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleExpand(name)}>
                    {expandedResume === name ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-blue-500" />
                    Overall Match
                  </h3>
                  <Progress value={result.overall_score} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This resume matches {Math.round(result.overall_score)}% of the job requirements.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-green-500" />
                    Skills Match
                  </h3>
                  <Progress value={result.scores.skills.score} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Matched {result.scores.skills.matched.length} out of {result.scores.skills.matched.length + result.scores.skills.missing.length} required skills.
                  </p>
                </div>
              </div>
              <AnimatePresence>
                {expandedResume === name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="experience">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                            Experience
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{result.scores.experience.years} years (Score: {Math.round(result.scores.experience.score)}%)</p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="education">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <GraduationCap className="mr-2 h-5 w-5 text-green-500" />
                            Education
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>Score: {Math.round(result.scores.education.score)}%</p>
                          {result.scores.cgpa.found && (
                            <p className="mt-2">CGPA: {result.scores.cgpa.found} (Score: {Math.round(result.scores.cgpa.score)}%)</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="achievements">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Award className="mr-2 h-5 w-5 text-yellow-500" />
                            Achievements
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>Score: {Math.round(result.scores.achievements.score)}%</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {result.scores.achievements.found.map((achievement, i) => (
                              <li key={i} className="text-sm">
                                {achievement.text} 
                                <Badge variant="secondary" className="ml-2">
                                  Score: {Math.round(achievement.score)}
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="projects">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Code className="mr-2 h-5 w-5 text-purple-500" />
                            Projects
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>Score: {Math.round(result.scores.projects.score)}%</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {result.scores.projects.found.map((project, i) => (
                              <li key={i} className="text-sm">{project.text}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Detailed Report</h3>
                      <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-60">
                        {result.report}
                      </pre>
                    </div>
                    <div className="mt-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Resume Data
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>Resume Data for {name}</DialogTitle>
                            <DialogDescription>
                              This is the structured data extracted from the resume.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                            <pre className="text-sm whitespace-pre-wrap">
                              {JSON.stringify(result.resume_data, null, 2)}
                            </pre>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

