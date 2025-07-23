# H1B Visa Guide for Indian Professionals

Provide comprehensive, actionable information about the H1B visa process specifically tailored for Indian professionals seeking employment in the United States.

**Experience Qualities**:
1. **Trustworthy** - Information should feel authoritative and reliable, backed by official sources
2. **Accessible** - Complex immigration processes presented in clear, digestible steps
3. **Empowering** - Users should feel confident and prepared to navigate their H1B journey

**Complexity Level**: Light Application (multiple features with basic state)
The app presents structured information across multiple sections with interactive elements like checklists and timeline tracking, but doesn't require complex user accounts or advanced functionality.

## Essential Features

### Timeline & Process Overview
- **Functionality**: Interactive timeline showing the complete H1B process from job search to visa approval
- **Purpose**: Helps users understand the multi-year process and plan accordingly
- **Trigger**: Landing on the main page
- **Progression**: View timeline → Click stages for details → Access relevant checklists → Track personal progress
- **Success criteria**: Users can identify their current stage and next steps

### Eligibility Checker
- **Functionality**: Interactive questionnaire to determine H1B eligibility
- **Purpose**: Saves time by helping users understand if they qualify before investing effort
- **Trigger**: Clicking "Check Eligibility" button
- **Progression**: Answer questions about education/experience → Get instant results → Receive personalized recommendations
- **Success criteria**: Clear yes/no result with explanations and next steps

### Document Checklist
- **Functionality**: Comprehensive, trackable checklist of required documents
- **Purpose**: Ensures users don't miss critical paperwork that could delay their application
- **Trigger**: Accessing "Documents" section or from timeline
- **Progression**: View categorized documents → Check off completed items → See progress indicator → Get document-specific tips
- **Success criteria**: Users can track completion and access all necessary documentation

### Employer Information Hub
- **Functionality**: Database of H1B-friendly companies with sponsorship track records
- **Purpose**: Helps job seekers target the right employers and understand company-specific processes
- **Trigger**: Navigating to "Employers" section
- **Progression**: Browse by industry/location → View company details → Access application tips → Save favorites
- **Success criteria**: Users can identify potential employers and understand their H1B policies

### FAQ & Common Scenarios
- **Functionality**: Searchable FAQ covering India-specific concerns
- **Purpose**: Addresses unique challenges faced by Indian applicants (cap issues, processing times, etc.)
- **Trigger**: Searching or browsing FAQ section
- **Progression**: Search question → View detailed answer → Access related topics → Contact resources if needed
- **Success criteria**: Users find answers to their specific concerns quickly

## Edge Case Handling

- **No Internet**: Graceful offline message with cached essential information
- **Mobile Navigation**: Collapsible menu and optimized touch targets for mobile browsing
- **Data Loading**: Skeleton screens and loading states for smooth experience
- **Search No Results**: Helpful suggestions and alternative search terms
- **Outdated Information**: Clear disclaimers about consulting official sources for latest updates

## Design Direction

The design should feel professional yet approachable - like a trusted advisor who understands the complexity of immigration while making it manageable. Clean, government-adjacent aesthetic with confident blues and whites that convey reliability without being sterile.

## Color Selection

Complementary (opposite colors) - Using trust-inspiring blues with warm accent colors to balance professionalism with approachability.

- **Primary Color**: Deep Professional Blue (oklch(0.45 0.15 240)) - Conveys trust, reliability, and official credibility
- **Secondary Colors**: Light Blue (oklch(0.85 0.08 240)) for backgrounds and Neutral Gray (oklch(0.65 0.02 240)) for supporting text
- **Accent Color**: Warm Orange (oklch(0.65 0.15 45)) - For CTAs, progress indicators, and success states to add warmth and energy
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark Blue text (oklch(0.25 0.12 240)) - Ratio 8.2:1 ✓
  - Card (Light Blue oklch(0.95 0.03 240)): Dark Blue text (oklch(0.25 0.12 240)) - Ratio 7.1:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 240)): White text (oklch(1 0 0)) - Ratio 5.8:1 ✓
  - Accent (Warm Orange oklch(0.65 0.15 45)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓

## Font Selection

Professional sans-serif typography that balances accessibility with authority - Inter for its excellent readability in both print and digital contexts, with clear hierarchy that helps users navigate complex information.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal letter spacing  
  - H3 (Subsections): Inter Medium/20px/normal letter spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Small Text/Captions: Inter Regular/14px/normal line height

## Animations

Subtle, purposeful animations that guide users through complex information without distraction - smooth transitions between sections and gentle micro-interactions that provide feedback and maintain engagement during long reading sessions.

- **Purposeful Meaning**: Smooth page transitions communicate progress through the visa journey, while gentle hover effects on interactive elements encourage exploration
- **Hierarchy of Movement**: Timeline progression and checklist completions deserve prominent animation focus, while navigation and state changes use subtle fades

## Component Selection

- **Components**: Cards for information sections, Accordion for FAQ, Tabs for timeline stages, Progress bars for checklists, Buttons for actions, Badge for status indicators, Alert for important notices
- **Customizations**: Timeline component with connecting lines, Progress tracking component, Custom employer cards with logos and stats
- **States**: Buttons (default/hover/active/disabled), Checkboxes (unchecked/checked/indeterminate), Cards (default/interactive/selected)
- **Icon Selection**: CheckCircle for completed items, Clock for timeline, Building for employers, FileText for documents, AlertCircle for important info
- **Spacing**: Consistent 4/6/8/12/16px spacing using Tailwind scale, generous padding on cards (p-6), comfortable gaps between sections (gap-8)
- **Mobile**: Timeline transforms to vertical layout, cards stack single-column, navigation collapses to hamburger menu, touch-friendly 44px minimum targets