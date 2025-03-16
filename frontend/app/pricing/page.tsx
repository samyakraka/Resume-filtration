'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Check, X } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Basic',
    price: {
      monthly: 29,
      annually: 290,
    },
    description: 'Perfect for individuals and small teams',
    features: [
      'Up to 50 resume analyses per month',
      'Basic ATS compatibility check',
      'Keyword optimization suggestions',
      'Email support',
    ],
    notIncluded: [
      'Advanced AI-powered insights',
      'Bulk resume processing',
      'Custom branding',
      'API access',
    ],
  },
  {
    name: 'Pro',
    price: {
      monthly: 79,
      annually: 790,
    },
    description: 'Ideal for growing businesses and HR departments',
    features: [
      'Up to 200 resume analyses per month',
      'Advanced ATS compatibility check',
      'AI-powered resume scoring',
      'Bulk resume processing',
      'Keyword optimization suggestions',
      'Priority email support',
    ],
    notIncluded: [
      'Custom branding',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      annually: 'Custom',
    },
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited resume analyses',
      'Advanced ATS compatibility check',
      'AI-powered resume scoring',
      'Bulk resume processing',
      'Keyword optimization suggestions',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      '24/7 phone and email support',
    ],
    notIncluded: [],
  },
]

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(false)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-8">
        Choose the perfect plan for your recruitment needs
      </p>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${!annualBilling ? 'font-bold' : ''}`}>Monthly</span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              annualBilling ? 'bg-green-500' : 'bg-gray-200'
            }`}
            onClick={() => setAnnualBilling(!annualBilling)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                annualBilling ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${annualBilling ? 'font-bold' : ''}`}>
            Annual <span className="text-green-500 font-bold">(Save 17%)</span>
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl font-bold mb-4">
                {typeof plan.price.monthly === 'number' ? (
                  <>
                    ${annualBilling ? plan.price.annually / 12 : plan.price.monthly}
                    <span className="text-lg font-normal text-gray-500">/mo</span>
                  </>
                ) : (
                  plan.price.monthly
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-400">
                    <X className="h-5 w-5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-bold mb-2">Can I change my plan later?</h3>
            <p className="text-gray-600 dark:text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Is there a free trial available?</h3>
            <p className="text-gray-600 dark:text-gray-300">Yes, we offer a 14-day free trial for our Basic and Pro plans. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

