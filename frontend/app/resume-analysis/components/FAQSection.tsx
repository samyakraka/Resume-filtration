import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

interface FAQSectionProps {
  className?: string
}

export default function FAQSection({ className }: FAQSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is an ATS-compliant resume?</AccordionTrigger>
            <AccordionContent>
              An ATS-compliant resume is one that can be easily scanned and interpreted by an Applicant Tracking System (ATS). This means your resume should be formatted clearly, with relevant keywords included, and avoid complex layouts or graphics that might confuse the ATS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I quantify my achievements?</AccordionTrigger>
            <AccordionContent>
              To quantify achievements, focus on measurable results. Instead of saying "Improved sales," try "Increased sales by 25% over 6 months." Look for numbers, percentages, time frames, and specific outcomes in your work history to make your accomplishments more impactful.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What's the ideal length for a resume?</AccordionTrigger>
            <AccordionContent>
              For most candidates, a one-page resume is sufficient. If you have extensive relevant experience (usually 10+ years), a two-page resume may be appropriate. The key is to include only the most relevant and impactful information for the job you're applying to.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Should I include a "Books" section on my resume?</AccordionTrigger>
            <AccordionContent>
              Adding a "Books" section can be beneficial if it's relevant to the job you're applying for. It can demonstrate continuous learning, intellectual curiosity, and alignment with the company's values. However, only include it if you have space and if the books are relevant to your field or the position.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What are hard skills vs soft skills?</AccordionTrigger>
            <AccordionContent>
              Hard skills are specific, teachable abilities that can be defined and measured, such as typing speed, proficiency in a software program, or fluency in a foreign language. Soft skills, on the other hand, are interpersonal attributes that affect how you work and interact with others, such as communication, teamwork, and adaptability.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

