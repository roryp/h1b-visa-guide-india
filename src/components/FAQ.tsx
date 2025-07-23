import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Users,
  Airplane,
  GraduationCap
} from '@phosphor-icons/react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  important?: boolean
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqs: FAQItem[] = [
    {
      id: 'cap-lottery',
      question: 'What are my chances in the H1B lottery as an Indian applicant?',
      answer: 'The H1B cap is 85,000 visas annually (65,000 regular + 20,000 for US master\'s graduates). In recent years, USCIS receives 300,000+ applications, making the lottery highly competitive. Indians with US master\'s degrees have slightly better odds due to the additional 20,000 slots. Without a US master\'s, the odds are roughly 25-30%. The key is to apply through multiple employers if possible and ensure your application is complete and error-free.',
      category: 'lottery',
      tags: ['lottery', 'chances', 'cap', 'competition'],
      important: true
    },
    {
      id: 'premium-processing',
      question: 'Should I opt for premium processing for my H1B petition?',
      answer: 'Premium processing costs $2,805 (as of 2024) and guarantees a response within 15 calendar days instead of 3-6 months. It\'s recommended if: you need to start work soon, want faster certainty about your case, or if you\'re changing employers and need quick approval. Note that premium processing doesn\'t improve your chances of approval - it only speeds up the decision.',
      category: 'processing',
      tags: ['premium processing', 'timeline', 'fees', 'speed'],
      important: true
    },
    {
      id: 'salary-requirements',
      question: 'What salary should I expect and what are the minimum requirements?',
      answer: 'Your H1B salary must meet the prevailing wage for your position and location. For software engineers: entry-level positions typically start at $70,000-$90,000 in smaller cities and $100,000-$130,000 in major tech hubs. Experienced professionals can earn $120,000-$200,000+. The Department of Labor determines prevailing wages based on job duties, experience level, education, and geographic location. Your employer must pay at least this amount.',
      category: 'salary',
      tags: ['salary', 'prevailing wage', 'minimum', 'compensation'],
      important: true
    },
    {
      id: 'job-search-timing',
      question: 'When should I start looking for H1B sponsoring jobs?',
      answer: 'Start your job search 6-8 months before April (the filing season). Many companies begin their H1B recruitment in October-November for the following year\'s cap. Apply early because: 1) Companies have limited H1B slots, 2) Interview processes can take 2-3 months, 3) You need time for document preparation, 4) Some companies have internal deadlines in February-March.',
      category: 'job-search',
      tags: ['timing', 'job search', 'application', 'deadlines']
    },
    {
      id: 'h1b-transfer',
      question: 'Can I change jobs on H1B? How does H1B transfer work?',
      answer: 'Yes, you can change employers through H1B transfer (technically a new H1B petition). The new employer files an H1B petition for you, and you can start working once it\'s filed (not approved) if you maintain valid H1B status. The process takes 2-6 months. Key points: 1) You can\'t have gaps in employment, 2) New employer must file before your current H1B expires, 3) You\'re not subject to the cap/lottery for transfers.',
      category: 'transfer',
      tags: ['job change', 'transfer', 'employer change', 'portability']
    },
    {
      id: 'spouse-work',
      question: 'Can my spouse work in the US on H4 visa?',
      answer: 'H4 spouses can work if the H1B holder: 1) Has an approved I-140 (green card petition), OR 2) Has been in H1B status for 6+ years under AC21. The spouse must apply for an Employment Authorization Document (EAD). Processing takes 3-6 months. Children on H4 cannot work but can study. H4 EAD policy has faced some uncertainty, so stay updated on current regulations.',
      category: 'family',
      tags: ['spouse', 'H4', 'work authorization', 'EAD', 'family']
    },
    {
      id: 'green-card-process',
      question: 'How long does the green card process take for Indians?',
      answer: 'Due to per-country limits, the green card process for Indians is extremely long - currently 50-150+ years for EB2/EB3 categories. However, you can extend H1B beyond 6 years once your I-140 is approved or if a labor certification has been pending for 365+ days. Many Indians pursue EB1 (extraordinary ability) or invest in EB5 programs for faster processing. Consider Canada PR as an alternative.',
      category: 'green-card',
      tags: ['green card', 'permanent residence', 'EB2', 'EB3', 'timeline'],
      important: true
    },
    {
      id: 'education-equivalency',
      question: 'My degree is from India. Do I need credential evaluation?',
      answer: 'A US bachelor\'s degree equivalent is required for H1B. Most Indian 3-year bachelor\'s degrees don\'t qualify alone - you typically need a 3-year degree PLUS a master\'s degree, OR a 4-year bachelor\'s degree. Some employers require credential evaluation from agencies like WES, ECE, or SpanTran ($200-$300, takes 2-4 weeks). Engineering degrees from AICTE-approved institutions are generally well-recognized.',
      category: 'education',
      tags: ['degree', 'credential evaluation', 'education', 'equivalency', 'WES']
    },
    {
      id: 'visa-interview',
      question: 'What should I expect in the H1B visa interview at the US consulate?',
      answer: 'H1B visa interviews typically last 2-5 minutes. Common questions: 1) What\'s your job role? 2) Why does this position require a bachelor\'s degree? 3) How does your education relate to the job? 4) What does your company do? 5) What\'s your salary? Bring: passport, DS-160 confirmation, I-797 approval notice, employment letter, education documents. Wait times for appointments vary by consulate (Chennai, Mumbai, Delhi, Kolkata).',
      category: 'visa-interview',
      tags: ['visa interview', 'consulate', 'questions', 'documents', 'preparation']
    },
    {
      id: 'rfe-response',
      question: 'What is an RFE and how should I respond?',
      answer: 'Request for Evidence (RFE) means USCIS needs additional documentation to make a decision. Common RFE topics: 1) Specialty occupation (proving the job requires a degree), 2) Beneficiary qualifications (education/experience), 3) Employer-employee relationship. You typically have 30-90 days to respond. Work with an experienced attorney, provide exactly what\'s requested, and include a cover letter explaining how you meet requirements.',
      category: 'processing',
      tags: ['RFE', 'evidence', 'response', 'documentation', 'USCIS']
    },
    {
      id: 'multiple-employers',
      question: 'Can multiple employers file H1B petitions for me?',
      answer: 'Yes, multiple employers can file separate H1B petitions for you, increasing your lottery chances. Each petition requires separate fees and documentation. If multiple petitions are selected, you can choose which job to accept. However, ensure each employer has a genuine job offer and is willing to proceed with the full process. Some employers may withdraw if they discover multiple filings.',
      category: 'strategy',
      tags: ['multiple employers', 'lottery', 'strategy', 'chances']
    },
    {
      id: 'stem-opt',
      question: 'How does STEM OPT help with H1B applications?',
      answer: 'STEM OPT provides 36 months of work authorization for STEM graduates (12 months regular OPT + 24 months STEM extension). This gives you 3 chances at the H1B lottery while maintaining legal status. Requirements: 1) STEM degree from US institution, 2) Employment with E-Verify enrolled employer, 3) Apply before regular OPT expires. STEM OPT is crucial for Indians due to H1B lottery competitiveness.',
      category: 'stem-opt',
      tags: ['STEM OPT', 'extension', 'work authorization', 'lottery chances', 'students']
    },
    {
      id: 'cap-exempt',
      question: 'What are cap-exempt H1B positions?',
      answer: 'Cap-exempt H1Bs aren\'t subject to the 85,000 annual limit. Eligible employers: 1) Universities and related nonprofits, 2) Nonprofit research organizations, 3) Government research organizations. These positions can be filed year-round and have higher approval rates. However, salaries are typically lower than private sector jobs. You can transfer from cap-exempt to cap-subject positions later.',
      category: 'cap-exempt',
      tags: ['cap exempt', 'university', 'nonprofit', 'research', 'year-round']
    },
    {
      id: 'amendment-change',
      question: 'Do I need an H1B amendment for job changes at the same employer?',
      answer: 'H1B amendments are required for: 1) Significant job duty changes, 2) Work location changes (different Metropolitan Statistical Area), 3) Salary decreases. Minor changes like promotions with similar duties typically don\'t require amendments. Always consult with your employer\'s attorney before making changes. Working without proper authorization can jeopardize your status.',
      category: 'amendments',
      tags: ['amendment', 'job change', 'location change', 'duties', 'same employer']
    },
    {
      id: 'tax-implications',
      question: 'What are the tax implications of H1B status?',
      answer: 'H1B holders are considered resident aliens for tax purposes and must pay federal, state, and local taxes. You\'ll receive Form W-2 from your employer and must file tax returns by April 15. Key points: 1) No Social Security/Medicare tax exemptions (unlike some other visas), 2) You may be eligible for certain tax treaties, 3) Maintain records for potential future green card applications, 4) Consider professional tax preparation for complex situations.',
      category: 'taxes',
      tags: ['taxes', 'resident alien', 'W-2', 'tax return', 'obligations']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Topics', icon: Search },
    { id: 'lottery', name: 'Lottery & Cap', icon: Users },
    { id: 'processing', name: 'Processing', icon: Clock },
    { id: 'salary', name: 'Salary & Benefits', icon: DollarSign },
    { id: 'job-search', name: 'Job Search', icon: FileText },
    { id: 'visa-interview', name: 'Visa Interview', icon: Airplane },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'family', name: 'Family & Dependents', icon: Users },
    { id: 'green-card', name: 'Green Card', icon: FileText },
    { id: 'stem-opt', name: 'STEM OPT', icon: GraduationCap }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const importantFAQs = faqs.filter(faq => faq.important)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h3>
        <p className="text-muted-foreground">
          Common questions about H1B process for Indian professionals
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Important FAQs */}
      {searchTerm === '' && selectedCategory === 'all' && (
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Most Important Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {importantFAQs.map(faq => (
                <div 
                  key={faq.id}
                  className="p-3 bg-background rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => {
                    const element = document.getElementById(`faq-${faq.id}`)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <p className="font-medium text-sm">{faq.question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredFAQs.length} questions found
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-primary hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* FAQ Accordion */}
      {filteredFAQs.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQs.map(faq => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              id={`faq-${faq.id}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left py-4">
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-1">
                    <p className="font-medium">{faq.question}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {faq.important && (
                        <Badge variant="destructive" className="text-xs">Important</Badge>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="text-muted-foreground leading-relaxed">
                  {faq.answer.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No questions found</h4>
            <p className="text-muted-foreground">
              Try different search terms or browse by category
            </p>
          </CardContent>
        </Card>
      )}

      {/* Additional Resources */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-3">Need More Help?</h4>
          <div className="space-y-2 text-sm">
            <p>• <strong>Official USCIS Website:</strong> <a href="https://uscis.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">uscis.gov</a></p>
            <p>• <strong>Department of Labor:</strong> <a href="https://dol.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dol.gov</a> (for prevailing wage data)</p>
            <p>• <strong>US State Department:</strong> <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">travel.state.gov</a> (for visa interviews)</p>
            <p>• <strong>H1B Salary Database:</strong> <a href="https://h1bdata.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">h1bdata.info</a></p>
            <p className="mt-4 text-muted-foreground">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Always consult with qualified immigration attorneys for case-specific advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}