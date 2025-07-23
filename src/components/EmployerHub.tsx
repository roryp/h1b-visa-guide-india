import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Building, 
  MapPin, 
  Users, 
  TrendUp,
  ExternalLink,
  Search,
  Filter,
  Star,
  DollarSign,
  Clock
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface Company {
  id: string
  name: string
  industry: string
  location: string
  size: string
  h1bSponsored: number
  h1bApprovalRate: number
  averageSalary: string
  description: string
  website: string
  tips: string[]
  recentHiring: boolean
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export default function EmployerHub() {
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [savedCompanies, setSavedCompanies] = useKV<string[]>('saved-companies', [])

  const companies: Company[] = [
    {
      id: 'microsoft',
      name: 'Microsoft',
      industry: 'Technology',
      location: 'Seattle, WA',
      size: '220,000+',
      h1bSponsored: 4500,
      h1bApprovalRate: 98,
      averageSalary: '$140,000 - $200,000',
      description: 'Leading technology company with strong H1B sponsorship program',
      website: 'https://careers.microsoft.com',
      recentHiring: true,
      difficulty: 'Medium',
      tips: [
        'Strong preference for STEM graduates',
        'Multiple interview rounds including technical assessments',
        'Active campus recruitment programs',
        'Good work-life balance and benefits'
      ]
    },
    {
      id: 'google',
      name: 'Google',
      industry: 'Technology',
      location: 'Mountain View, CA',
      size: '170,000+',
      h1bSponsored: 3200,
      h1bApprovalRate: 99,
      averageSalary: '$150,000 - $250,000',
      description: 'Top-tier tech company with excellent compensation packages',
      website: 'https://careers.google.com',
      recentHiring: true,
      difficulty: 'Hard',
      tips: [
        'Extremely competitive interview process',
        'Focus on algorithmic problem solving',
        'PhD preferred for research positions',
        'Excellent benefits and stock options'
      ]
    },
    {
      id: 'amazon',
      name: 'Amazon',
      industry: 'Technology',
      location: 'Seattle, WA',
      size: '1,500,000+',
      h1bSponsored: 8000,
      h1bApprovalRate: 96,
      averageSalary: '$120,000 - $180,000',
      description: 'Large scale hiring with opportunities across multiple divisions',
      website: 'https://amazon.jobs',
      recentHiring: true,
      difficulty: 'Medium',
      tips: [
        'High volume hiring across AWS, retail, and logistics',
        'Leadership principles are key to interviews',
        'Multiple technical and behavioral rounds',
        'Fast-paced work environment'
      ]
    },
    {
      id: 'meta',
      name: 'Meta (Facebook)',
      industry: 'Technology',
      location: 'Menlo Park, CA',
      size: '80,000+',
      h1bSponsored: 2100,
      h1bApprovalRate: 97,
      averageSalary: '$155,000 - $220,000',
      description: 'Social media and metaverse technology leader',
      website: 'https://careers.meta.com',
      recentHiring: false,
      difficulty: 'Hard',
      tips: [
        'Focus on system design and coding skills',
        'Cultural fit interviews are important',
        'Recent hiring freezes in some areas',
        'Strong compensation but high performance expectations'
      ]
    },
    {
      id: 'apple',
      name: 'Apple',
      industry: 'Technology',
      location: 'Cupertino, CA',
      size: '165,000+',
      h1bSponsored: 1800,
      h1bApprovalRate: 98,
      averageSalary: '$145,000 - $210,000',
      description: 'Premium technology products and innovative hardware/software',
      website: 'https://jobs.apple.com',
      recentHiring: true,
      difficulty: 'Hard',
      tips: [
        'Secretive culture, NDAs are common',
        'Excellence in design and user experience valued',
        'Hardware and software integration expertise preferred',
        'Long interview processes with multiple stakeholders'
      ]
    },
    {
      id: 'tcs',
      name: 'Tata Consultancy Services (TCS)',
      industry: 'IT Services',
      location: 'Multiple US locations',
      size: '600,000+',
      h1bSponsored: 12000,
      h1bApprovalRate: 85,
      averageSalary: '$70,000 - $95,000',
      description: 'Large Indian IT services company with extensive US operations',
      website: 'https://careers.tcs.com',
      recentHiring: true,
      difficulty: 'Easy',
      tips: [
        'Good option for fresh graduates',
        'Strong training programs',
        'Multiple project opportunities',
        'Lower salary but good learning experience'
      ]
    },
    {
      id: 'infosys',
      name: 'Infosys',
      industry: 'IT Services',
      location: 'Multiple US locations',
      size: '340,000+',
      h1bSponsored: 9500,
      h1bApprovalRate: 87,
      averageSalary: '$75,000 - $100,000',
      description: 'Global IT services and consulting company',
      website: 'https://careers.infosys.com',
      recentHiring: true,
      difficulty: 'Easy',
      tips: [
        'Good entry point for Indian graduates',
        'Diverse project portfolio',
        'Career progression opportunities',
        'Strong presence in financial services'
      ]
    },
    {
      id: 'jpmorgan',
      name: 'JPMorgan Chase',
      industry: 'Financial Services',
      location: 'New York, NY',
      size: '280,000+',
      h1bSponsored: 2800,
      h1bApprovalRate: 94,
      averageSalary: '$110,000 - $150,000',
      description: 'Leading investment bank with strong technology division',
      website: 'https://careers.jpmorgan.com',
      recentHiring: true,
      difficulty: 'Medium',
      tips: [
        'Strong focus on technology and quantitative roles',
        'Finance background preferred but not required',
        'Excellent benefits and job security',
        'Formal training programs available'
      ]
    }
  ]

  const industries = ['all', ...new Set(companies.map(c => c.industry))]
  const locations = ['all', ...new Set(companies.map(c => c.location.split(',')[1]?.trim() || c.location))]

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter
    const matchesLocation = locationFilter === 'all' || company.location.includes(locationFilter)
    
    return matchesSearch && matchesIndustry && matchesLocation
  })

  const toggleSaveCompany = (companyId: string) => {
    setSavedCompanies(current => 
      current.includes(companyId)
        ? current.filter(id => id !== companyId)
        : [...current, companyId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">H1B Employer Hub</h3>
        <p className="text-muted-foreground">
          Discover companies with proven H1B sponsorship track records
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCompanies.length} companies
        </p>
        {savedCompanies.length > 0 && (
          <Badge variant="outline">
            <Star className="w-3 h-3 mr-1" />
            {savedCompanies.length} saved
          </Badge>
        )}
      </div>

      {/* Company Cards */}
      <div className="grid gap-6">
        {filteredCompanies.map(company => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    {company.recentHiring && (
                      <Badge className="bg-green-100 text-green-800">Hiring Now</Badge>
                    )}
                    <Badge className={getDifficultyColor(company.difficulty)}>
                      {company.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{company.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSaveCompany(company.id)}
                >
                  <Star 
                    className={`w-4 h-4 ${
                      savedCompanies.includes(company.id) 
                        ? 'fill-current text-accent' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{company.industry}</p>
                        <p className="text-xs text-muted-foreground">Industry</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{company.location}</p>
                        <p className="text-xs text-muted-foreground">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{company.size}</p>
                        <p className="text-xs text-muted-foreground">Company Size</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{company.averageSalary}</p>
                        <p className="text-xs text-muted-foreground">Salary Range</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">H1B Sponsored (2023)</span>
                      <span className="font-medium">{company.h1bSponsored.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Approval Rate</span>
                      <span className="font-medium text-accent">{company.h1bApprovalRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Application Tips</h4>
                  <ul className="space-y-2">
                    {company.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t">
                <Button asChild size="sm">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Careers
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  View H1B Data
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No companies found</h4>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-3">Research Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Check official H1B disclosure data on DOL website for exact numbers</li>
            <li>• Research company culture and work environment on Glassdoor</li>
            <li>• Network with current employees through LinkedIn</li>
            <li>• Apply early in the year (Jan-Mar) for best chances</li>
            <li>• Consider smaller companies which may have less competition</li>
            <li>• Look for companies actively recruiting at Indian universities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}