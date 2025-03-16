import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>ATS Checker Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, upload a resume, or contact us for support. This may include your name, email address, and resume content.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect ATS Checker and our users.</p>
          
          <h2>3. Information Sharing and Disclosure</h2>
          <p>We do not share your personal information with third parties except as described in this policy. We may share your information with service providers who perform services on our behalf.</p>
          
          <h2>4. Data Security</h2>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
          
          <h2>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. You can do this through your account settings or by contacting us directly.</p>
          
          <h2>6. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
          
          <h2>7. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at privacy@atschecker.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

