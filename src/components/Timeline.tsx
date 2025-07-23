import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  Circle,
  ArrowRight,
  User,
  FileText,
  CurrencyDollar,
  Airplane,
  MapPin
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface TimelineStage {
  id: string
  title: string
  description: string
  duration: string
  icon: any
  details: string[]
  tips: string[]
  status: 'completed' | 'current' | 'upcoming'
}

export default function Timeline() {
  const [userProgress] = useKV('timeline-progress', 0)
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  const stages: TimelineStage[] = [
    {
      id: 'preparation',
      title: 'Preparation & Education',
      description: 'Build qualifications and gain relevant experience',
      duration: '2-4 years',
      icon: User,
      details: [
        'Complete bachelor\'s degree (minimum requirement)',
        'Gain relevant work experience in your field',
        'Improve English language skills (TOEFL/IELTS if needed)',
        'Build technical skills demanded in US market',
        'Create strong professional portfolio/resume'
      ],
      tips: [
        'STEM degrees have higher chances due to additional lottery entries',
        'US master\'s degree provides significant advantage',
        'Consider online certifications from recognized platforms'
      ],
      status: userProgress >= 1 ? 'completed' : userProgress === 0 ? 'current' : 'upcoming'
    },
    {
      id: 'job-search',
      title: 'Job Search & Networking',
      description: 'Find H1B sponsoring employers and apply for positions',
      duration: '3-12 months',
      icon: MapPin,
      details: [
        'Research H1B sponsoring companies in your field',
        'Optimize resume for US job market',
        'Apply through job portals and company websites',
        'Network with professionals already in the US',
        'Prepare for technical and behavioral interviews',
        'Negotiate salary and H1B sponsorship terms'
      ],
      tips: [
        'Target companies with proven H1B sponsorship history',
        'Apply early in the year (January-March) for April filing',
        'Consider working with recruiters who specialize in H1B placements'
      ],
      status: userProgress >= 2 ? 'completed' : userProgress === 1 ? 'current' : 'upcoming'
    },
    {
      id: 'job-offer',
      title: 'Job Offer & Contract',
      description: 'Secure employment offer with H1B sponsorship commitment',
      duration: '1-2 weeks',
      icon: FileText,
      details: [
        'Receive formal job offer with H1B sponsorship clause',
        'Review salary, benefits, and employment terms',
        'Understand company\'s H1B filing timeline',
        'Sign employment contract or offer letter',
        'Coordinate with company\'s immigration attorney'
      ],
      tips: [
        'Ensure offer letter explicitly mentions H1B sponsorship',
        'Understand your role responsibilities for LCA filing',
        'Ask about company\'s H1B success rate and timeline'
      ],
      status: userProgress >= 3 ? 'completed' : userProgress === 2 ? 'current' : 'upcoming'
    },
    {
      id: 'petition-filing',
      title: 'H1B Petition Filing',
      description: 'Employer files H1B petition and enters lottery (if applicable)',
      duration: 'March-April',
      icon: CurrencyDollar,
      details: [
        'Employer files Labor Condition Application (LCA)',
        'Gather required documents (transcripts, experience letters)',
        'Employer submits H1B petition (Form I-129)',
        'Enter H1B lottery if cap-subject position',
        'Pay required government fees',
        'Await lottery results (if applicable)'
      ],
      tips: [
        'Premium processing available for faster results ($2,805 fee)',
        'Master\'s degree holders get additional lottery chance',
        'Keep all original documents ready for submission'
      ],
      status: userProgress >= 4 ? 'completed' : userProgress === 3 ? 'current' : 'upcoming'
    },
    {
      id: 'petition-processing',
      title: 'USCIS Processing',
      description: 'USCIS reviews and adjudicates the H1B petition',
      duration: '3-6 months',
      icon: Clock,
      details: [
        'USCIS reviews submitted petition',
        'Respond to any Requests for Evidence (RFE)',
        'Await approval or denial decision',
        'Receive I-797 approval notice if approved',
        'Check for any administrative errors'
      ],
      tips: [
        'Premium processing reduces timeline to 15 days',
        'RFE response time is critical - usually 30-90 days',
        'Keep employment status current while waiting'
      ],
      status: userProgress >= 5 ? 'completed' : userProgress === 4 ? 'current' : 'upcoming'
    },
    {
      id: 'visa-application',
      title: 'Visa Application & Interview',
      description: 'Apply for H1B visa stamp at US consulate (if outside US)',
      duration: '2-8 weeks',
      icon: Airplane,
      details: [
        'Complete DS-160 online application',
        'Pay visa application fees',
        'Schedule visa interview appointment',
        'Prepare required documents for interview',
        'Attend visa interview at US consulate',
        'Await visa processing and passport return'
      ],
      tips: [
        'Interview wait times vary by consulate location',
        'Carry original I-797 approval notice to interview',
        'Be prepared to explain your job role and company'
      ],
      status: userProgress >= 6 ? 'completed' : userProgress === 5 ? 'current' : 'upcoming'
    },
    {
      id: 'arrival',
      title: 'US Entry & Work Authorization',
      description: 'Enter US and begin employment with H1B status',
      duration: '1-2 weeks',
      icon: CheckCircle,
      details: [
        'Enter US with valid H1B visa',
        'Receive I-94 entry record',
        'Complete employer onboarding process',
        'Apply for Social Security Number',
        'Set up bank account and other essentials',
        'Begin work on or after petition start date'
      ],
      tips: [
        'Cannot start work before petition effective date',
        'Keep I-797 and I-94 documents safe',
        'Understand H1B status limitations and requirements'
      ],
      status: userProgress >= 7 ? 'completed' : userProgress === 6 ? 'current' : 'upcoming'
    }
  ]

  const getStageIcon = (stage: TimelineStage) => {
    const IconComponent = stage.icon
    if (stage.status === 'completed') {
      return <CheckCircle className="w-6 h-6 text-accent" />
    } else if (stage.status === 'current') {
      return <IconComponent className="w-6 h-6 text-primary" />
    } else {
      return <Circle className="w-6 h-6 text-muted-foreground" />
    }
  }

  const getStageStatus = (stage: TimelineStage) => {
    switch (stage.status) {
      case 'completed':
        return <Badge className="bg-accent text-accent-foreground">Completed</Badge>
      case 'current':
        return <Badge className="bg-primary text-primary-foreground">Current</Badge>
      default:
        return <Badge variant="outline">Upcoming</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">H1B Process Timeline</h3>
        <p className="text-muted-foreground">
          Your complete journey from preparation to working in the US
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card 
            key={stage.id} 
            className={`transition-all duration-200 ${
              stage.status === 'current' ? 'ring-2 ring-primary/20 bg-primary/5' : ''
            } ${
              expandedStage === stage.id ? 'shadow-lg' : ''
            }`}
          >
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getStageIcon(stage)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{stage.title}</CardTitle>
                    {getStageStatus(stage)}
                  </div>
                  <CardDescription className="text-base mb-2">
                    {stage.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stage.duration}
                    </span>
                    <span className="text-xs">
                      Step {index + 1} of {stages.length}
                    </span>
                  </div>
                </div>
                <ArrowRight 
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedStage === stage.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </CardHeader>

            {expandedStage === stage.id && (
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Activities</h4>
                    <ul className="space-y-2">
                      {stage.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Pro Tips</h4>
                    <ul className="space-y-2">
                      {stage.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-4 h-4 bg-accent/20 rounded-full flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-2">Track Your Progress</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Update your current stage to get personalized guidance and see what's next.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {stages.map((stage, index) => (
                <Button
                  key={stage.id}
                  variant={userProgress === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    // This would update progress - implementing in a real app
                  }}
                  className="text-xs"
                >
                  Stage {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}