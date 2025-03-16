import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>ATS Checker Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using ATS Checker, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          
          <h2>2. Use of Service</h2>
          <p>You may use ATS Checker only for lawful purposes and in accordance with these Terms of Service. You agree not to use ATS Checker in any way that violates any applicable local, state, national, or international law or regulation.</p>
          
          <h2>3. User Accounts</h2>
          <p>To access certain features of ATS Checker, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password.</p>
          
          <h2>4. Intellectual Property</h2>
          <p>The content, features, and functionality of ATS Checker are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>In no event shall ATS Checker, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          
          <h2>6. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.</p>
          
          <h2>7. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at terms@atschecker.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

