import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Download, 
  AlertCircle, 
  CheckCircle,
  Clock,
  User,
  GraduationCap,
  Briefcase,
  CurrencyDollar
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface Document {
  id: string
  name: string
  description: string
  required: boolean
  tips: string[]
  examples?: string[]
}

interface DocumentCategory {
  id: string
  title: string
  icon: any
  documents: Document[]
  description: string
}

export default function DocumentChecklist() {
  const [checkedDocuments, setCheckedDocuments] = useKV<string[]>('checked-documents', [])
  const [expandedDocs, setExpandedDocs] = useState<string[]>([])

  const categories: DocumentCategory[] = [
    {
      id: 'personal',
      title: 'Personal Documents',
      icon: User,
      description: 'Identity and personal information documents',
      documents: [
        {
          id: 'passport',
          name: 'Valid Passport',
          description: 'Current Indian passport with at least 6 months validity',
          required: true,
          tips: [
            'Ensure passport has blank pages for visa stamp',
            'Renew if expiring within 6 months',
            'Make multiple copies for your records'
          ]
        },
        {
          id: 'photos',
          name: 'Passport Photos',
          description: '2x2 inch photos meeting US visa requirements',
          required: true,
          tips: [
            'White background, recent photos (within 6 months)',
            'No glasses, head covering, or smiling',
            'Get at least 6 copies'
          ]
        },
        {
          id: 'birth-certificate',
          name: 'Birth Certificate',
          description: 'Official birth certificate with English translation if needed',
          required: false,
          tips: [
            'May be required for dependents',
            'Get notarized English translation if in regional language'
          ]
        },
        {
          id: 'police-clearance',
          name: 'Police Clearance Certificate',
          description: 'From all places lived for 6+ months since age 16',
          required: false,
          tips: [
            'Required if specifically requested',
            'Valid for 1 year from issue date',
            'Include all states/countries of residence'
          ]
        }
      ]
    },
    {
      id: 'education',
      title: 'Educational Documents',
      icon: GraduationCap,
      description: 'Academic credentials and transcripts',
      documents: [
        {
          id: 'degree-certificates',
          name: 'Degree Certificates',
          description: 'All degree certificates (Bachelor\'s, Master\'s, etc.)',
          required: true,
          tips: [
            'Original certificates or certified copies',
            'Include all completed degrees',
            'Get English translations if needed'
          ]
        },
        {
          id: 'transcripts',
          name: 'Official Transcripts',
          description: 'Mark sheets and grade transcripts for all degrees',
          required: true,
          tips: [
            'Sealed envelopes from university registrar',
            'Include semester-wise marks',
            'Get multiple copies (3-4 sets)'
          ]
        },
        {
          id: 'credential-evaluation',
          name: 'Credential Evaluation',
          description: 'US credential evaluation report (if required by employer)',
          required: false,
          tips: [
            'From WES, ECE, or other NACES-approved agencies',
            'Costs around $200-300',
            'Takes 2-4 weeks to complete'
          ],
          examples: ['WES', 'Educational Credential Evaluators (ECE)', 'SpanTran']
        },
        {
          id: 'english-scores',
          name: 'English Proficiency Scores',
          description: 'TOEFL/IELTS scores (if required)',
          required: false,
          tips: [
            'Valid for 2 years from test date',
            'Required by some employers/universities',
            'TOEFL iBT or IELTS Academic preferred'
          ]
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional Documents',
      icon: Briefcase,
      description: 'Work experience and employment records',
      documents: [
        {
          id: 'experience-letters',
          name: 'Experience Letters',
          description: 'Employment letters from all previous employers',
          required: true,
          tips: [
            'Include job title, duration, salary, and responsibilities',
            'On company letterhead with HR contact details',
            'Get letters before leaving any job'
          ]
        },
        {
          id: 'pay-stubs',
          name: 'Pay Stubs/Salary Certificates',
          description: 'Recent salary slips and Form 16 documents',
          required: false,
          tips: [
            'Last 3-6 months of pay stubs',
            'Form 16 for tax verification',
            'Bank statements showing salary credits'
          ]
        },
        {
          id: 'relieving-letters',
          name: 'Relieving Letters',
          description: 'Official relieving/resignation letters',
          required: false,
          tips: [
            'From HR department on letterhead',
            'Confirms last working day and good standing',
            'Important for employment verification'
          ]
        },
        {
          id: 'portfolio',
          name: 'Professional Portfolio',
          description: 'Work samples, projects, and achievements',
          required: false,
          tips: [
            'Showcase best work relevant to target role',
            'Include project descriptions and technologies used',
            'GitHub profiles for technical roles'
          ]
        }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Documents',
      icon: CurrencyDollar,
      description: 'Financial records and bank statements',
      documents: [
        {
          id: 'bank-statements',
          name: 'Bank Statements',
          description: 'Last 6 months of bank statements',
          required: false,
          tips: [
            'Show financial stability and income',
            'Include all accounts with significant balances',
            'Bank-stamped statements preferred'
          ]
        },
        {
          id: 'tax-returns',
          name: 'Tax Returns (ITR)',
          description: 'Income tax returns for last 2-3 years',
          required: false,
          tips: [
            'Filed ITR with income computation',
            'Shows legal income and tax compliance',
            'Include Form 16 from employers'
          ]
        },
        {
          id: 'property-documents',
          name: 'Property Documents',
          description: 'Property ownership or investment documents',
          required: false,
          tips: [
            'Demonstrates ties to India',
            'Property deeds, mutual fund statements',
            'Fixed deposit certificates'
          ]
        }
      ]
    }
  ]

  const allDocuments = categories.flatMap(cat => 
    cat.documents.map(doc => ({ ...doc, categoryId: cat.id }))
  )
  
  const requiredDocuments = allDocuments.filter(doc => doc.required)
  const checkedCount = checkedDocuments.length
  const requiredCheckedCount = requiredDocuments.filter(doc => 
    checkedDocuments.includes(doc.id)
  ).length
  
  const totalProgress = allDocuments.length > 0 ? (checkedCount / allDocuments.length) * 100 : 0
  const requiredProgress = requiredDocuments.length > 0 ? (requiredCheckedCount / requiredDocuments.length) * 100 : 0

  const toggleDocument = (docId: string) => {
    setCheckedDocuments(current => 
      current.includes(docId) 
        ? current.filter(id => id !== docId)
        : [...current, docId]
    )
  }

  const toggleDocExpansion = (docId: string) => {
    setExpandedDocs(current =>
      current.includes(docId)
        ? current.filter(id => id !== docId)
        : [...current, docId]
    )
  }

  const resetChecklist = () => {
    setCheckedDocuments([])
    setExpandedDocs([])
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Document Checklist</h3>
        <p className="text-muted-foreground">
          Ensure you have all required documents for your H1B application
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="font-medium">Required Documents</span>
            </div>
            <Progress value={requiredProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {requiredCheckedCount} of {requiredDocuments.length} completed ({Math.round(requiredProgress)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="font-medium">Overall Progress</span>
            </div>
            <Progress value={totalProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {checkedCount} of {allDocuments.length} completed ({Math.round(totalProgress)}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document Categories */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="flex flex-col items-center gap-1 p-3"
            >
              <category.icon className="w-5 h-5" />
              <span className="text-xs">{category.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </CardTitle>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.documents.map(document => (
                  <Card key={document.id} className="border border-border/50">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={document.id}
                          checked={checkedDocuments.includes(document.id)}
                          onCheckedChange={() => toggleDocument(document.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <label 
                              htmlFor={document.id}
                              className="font-medium cursor-pointer"
                            >
                              {document.name}
                            </label>
                            {document.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {document.description}
                          </p>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDocExpansion(document.id)}
                            className="text-xs p-1 h-auto"
                          >
                            {expandedDocs.includes(document.id) ? 'Hide' : 'Show'} Details
                          </Button>

                          {expandedDocs.includes(document.id) && (
                            <div className="mt-3 space-y-3">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Tips & Requirements:</h5>
                                <ul className="space-y-1">
                                  {document.tips.map((tip, index) => (
                                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                                      <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {document.examples && (
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Examples:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {document.examples.map((example, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {example}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button variant="outline" onClick={resetChecklist} className="w-full sm:w-auto">
          Reset Checklist
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          <p>Keep this checklist handy throughout your H1B process.</p>
          <p>Your progress is automatically saved.</p>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Document Preparation Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start collecting documents early - some may take weeks to obtain</li>
                <li>• Keep original documents safe and make certified copies</li>
                <li>• Get documents translated by certified translators if needed</li>
                <li>• Organize documents in folders by category for easy access</li>
                <li>• Scan all documents and maintain digital backups</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}