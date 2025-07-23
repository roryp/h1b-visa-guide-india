import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  Clock, 
  Building, 
  FileText, 
  Users, 
  AlertCircle,
  ArrowRight,
  MapPin,
  Calendar
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import Timeline from './components/Timeline'
import EligibilityChecker from './components/EligibilityChecker'
import DocumentChecklist from './components/DocumentChecklist'
import EmployerHub from './components/EmployerHub'
import FAQ from './components/FAQ'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [checklistProgress] = useKV('checklist-progress', 0)
  
  const stats = [
    { label: 'Annual H1B Cap', value: '85,000', icon: Users },
    { label: 'Average Processing Time', value: '3-6 months', icon: Clock },
    { label: 'Indian Approval Rate', value: '~95%', icon: CheckCircle },
    { label: 'Valid Duration', value: '3 years', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">H1B Guide</h1>
                <p className="text-sm text-muted-foreground">For Indian Professionals</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <MapPin className="w-3 h-3 mr-1" />
                India → USA
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Complete H1B Visa Guide
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Navigate the H1B process with confidence. Everything you need to know about 
            working in the USA as an Indian professional.
          </p>
          
          {/* Progress Overview */}
          {checklistProgress > 0 && (
            <Card className="max-w-md mx-auto mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-medium">Your Progress</span>
                </div>
                <Progress value={checklistProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {checklistProgress}% complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 p-3">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="flex items-center gap-2 p-3">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Eligibility</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 p-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="employers" className="flex items-center gap-2 p-3">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Employers</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2 p-3">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="overview">
              <Timeline />
            </TabsContent>
            
            <TabsContent value="eligibility">
              <EligibilityChecker />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentChecklist />
            </TabsContent>
            
            <TabsContent value="employers">
              <EmployerHub />
            </TabsContent>
            
            <TabsContent value="faq">
              <FAQ />
            </TabsContent>
          </div>
        </Tabs>

        {/* Important Notice */}
        <Card className="mt-12 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  This guide provides general information about the H1B process. Immigration laws 
                  and procedures can change. Always consult with an immigration attorney or check 
                  official USCIS sources for the most current requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 H1B Guide. Information for educational purposes only.</p>
            <p className="mt-2">
              Always verify with{' '}
              <a 
                href="https://uscis.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                USCIS.gov
              </a>
              {' '}for official guidance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App