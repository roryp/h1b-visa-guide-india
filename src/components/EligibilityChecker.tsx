import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Clock,
  DollarSign
} from '@phosphor-icons/react'

interface Question {
  id: string
  question: string
  options: { value: string; label: string; points: number }[]
  explanation?: string
}

interface EligibilityResult {
  eligible: boolean
  score: number
  maxScore: number
  title: string
  description: string
  recommendations: string[]
  nextSteps: string[]
}

export default function EligibilityChecker() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<EligibilityResult | null>(null)

  const questions: Question[] = [
    {
      id: 'education',
      question: 'What is your highest level of education?',
      options: [
        { value: 'high-school', label: 'High School or equivalent', points: 0 },
        { value: 'diploma', label: 'Diploma/Certificate (1-2 years)', points: 1 },
        { value: 'bachelors', label: 'Bachelor\'s degree (3-4 years)', points: 3 },
        { value: 'masters', label: 'Master\'s degree', points: 4 },
        { value: 'phd', label: 'PhD or higher', points: 4 }
      ],
      explanation: 'H1B requires at least a bachelor\'s degree or equivalent work experience (3 years of experience = 1 year of education).'
    },
    {
      id: 'field',
      question: 'What is your field of study/expertise?',
      options: [
        { value: 'stem', label: 'STEM (Science, Technology, Engineering, Math)', points: 2 },
        { value: 'business', label: 'Business/Management', points: 1 },
        { value: 'healthcare', label: 'Healthcare/Medicine', points: 2 },
        { value: 'finance', label: 'Finance/Accounting', points: 1 },
        { value: 'other', label: 'Other fields', points: 1 }
      ],
      explanation: 'STEM fields often have higher demand and may qualify for additional benefits like extended OPT.'
    },
    {
      id: 'experience',
      question: 'How many years of relevant work experience do you have?',
      options: [
        { value: '0-1', label: '0-1 years', points: 1 },
        { value: '2-3', label: '2-3 years', points: 2 },
        { value: '4-6', label: '4-6 years', points: 3 },
        { value: '7+', label: '7+ years', points: 4 }
      ],
      explanation: 'Relevant experience strengthens your case and can substitute for education requirements in some cases.'
    },
    {
      id: 'english',
      question: 'How would you rate your English proficiency?',
      options: [
        { value: 'basic', label: 'Basic conversational level', points: 1 },
        { value: 'intermediate', label: 'Intermediate (can handle work conversations)', points: 2 },
        { value: 'advanced', label: 'Advanced (fluent in professional settings)', points: 3 },
        { value: 'native', label: 'Native/Near-native level', points: 3 }
      ],
      explanation: 'Strong English skills are essential for most H1B positions and visa interviews.'
    },
    {
      id: 'salary',
      question: 'What salary range are you targeting in the US?',
      options: [
        { value: 'below-60k', label: 'Below $60,000', points: 1 },
        { value: '60k-80k', label: '$60,000 - $80,000', points: 2 },
        { value: '80k-120k', label: '$80,000 - $120,000', points: 3 },
        { value: 'above-120k', label: 'Above $120,000', points: 4 }
      ],
      explanation: 'Higher salaries demonstrate specialized skills and meet prevailing wage requirements more easily.'
    },
    {
      id: 'location',
      question: 'Where are you planning to work in the US?',
      options: [
        { value: 'tech-hubs', label: 'Major tech hubs (Silicon Valley, Seattle, NYC)', points: 3 },
        { value: 'major-cities', label: 'Other major cities (Chicago, Boston, Austin)', points: 2 },
        { value: 'mid-cities', label: 'Mid-size cities', points: 2 },
        { value: 'flexible', label: 'Flexible/Remote work', points: 1 }
      ],
      explanation: 'Tech hubs and major cities typically have more H1B sponsoring employers.'
    }
  ]

  const calculateResult = (): EligibilityResult => {
    let totalScore = 0
    let maxScore = 0

    questions.forEach(question => {
      const answer = answers[question.id]
      const selectedOption = question.options.find(opt => opt.value === answer)
      if (selectedOption) {
        totalScore += selectedOption.points
      }
      maxScore += Math.max(...question.options.map(opt => opt.points))
    })

    const percentage = (totalScore / maxScore) * 100

    if (percentage >= 75) {
      return {
        eligible: true,
        score: totalScore,
        maxScore,
        title: 'Excellent H1B Prospects!',
        description: 'You have strong qualifications for H1B sponsorship. Your profile is competitive and attractive to US employers.',
        recommendations: [
          'Start applying to H1B sponsoring companies immediately',
          'Target companies with proven H1B filing history',
          'Consider premium processing for faster results',
          'Prepare for technical interviews with US companies'
        ],
        nextSteps: [
          'Research target companies and job openings',
          'Optimize your resume for the US job market',
          'Build a portfolio showcasing your best work',
          'Start networking with professionals in your field'
        ]
      }
    } else if (percentage >= 50) {
      return {
        eligible: true,
        score: totalScore,
        maxScore,
        title: 'Good H1B Potential',
        description: 'You meet basic H1B requirements but could strengthen your profile for better opportunities.',
        recommendations: [
          'Focus on companies known for sponsoring international candidates',
          'Consider additional certifications in your field',
          'Gain more relevant work experience if possible',
          'Improve English skills through practice and courses'
        ],
        nextSteps: [
          'Identify areas for skill development',
          'Apply to entry-level positions open to sponsorship',
          'Consider contract-to-hire opportunities',
          'Build relationships with recruiters specializing in H1B'
        ]
      }
    } else {
      return {
        eligible: false,
        score: totalScore,
        maxScore,
        title: 'H1B Eligibility Challenges',
        description: 'You may face significant challenges in securing H1B sponsorship. Consider strengthening your qualifications first.',
        recommendations: [
          'Complete additional education or certifications',
          'Gain more relevant work experience in India',
          'Consider pursuing a US master\'s degree first',
          'Improve English proficiency through formal training'
        ],
        nextSteps: [
          'Evaluate education and certification options',
          'Build a stronger professional portfolio',
          'Consider alternative visa categories (F-1, L-1)',
          'Develop in-demand technical skills'
        ]
      }
    }
  }

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      const calculatedResult = calculateResult()
      setResult(calculatedResult)
      setShowResult(true)
    }
  }

  const resetChecker = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setResult(null)
  }

  const canProceed = answers[questions[currentQuestion]?.id]

  if (showResult && result) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Eligibility Results</h3>
          <p className="text-muted-foreground">Based on your responses</p>
        </div>

        <Card className={`${result.eligible ? 'border-accent/50 bg-accent/5' : 'border-destructive/50 bg-destructive/5'}`}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {result.eligible ? (
                <CheckCircle className="w-16 h-16 text-accent" />
              ) : (
                <AlertCircle className="w-16 h-16 text-destructive" />
              )}
            </div>
            <CardTitle className="text-2xl">{result.title}</CardTitle>
            <p className="text-muted-foreground mt-2">{result.description}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Score: {result.score}/{result.maxScore}
              </Badge>
              <Badge className={result.eligible ? 'bg-accent' : 'bg-destructive'}>
                {Math.round((result.score / result.maxScore) * 100)}%
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={resetChecker} variant="outline">
            Take Assessment Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">H1B Eligibility Checker</h3>
        <p className="text-muted-foreground">
          Answer a few questions to assess your H1B sponsorship prospects
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete
            </div>
          </div>
          <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={answers[questions[currentQuestion].id] || ''} 
            onValueChange={handleAnswer}
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer py-3 px-4 rounded-lg border border-transparent hover:bg-secondary/50 transition-colors"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {questions[currentQuestion].explanation && (
            <div className="bg-secondary/30 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={!canProceed}
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}