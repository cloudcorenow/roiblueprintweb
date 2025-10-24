import React from "react";
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  Building, 
  Lightbulb,
  TrendingUp,
  Shield,
  Target,
  Award,
  BookOpen,
  Zap,
  PieChart,
  Settings,
  Briefcase,
  Heart,
  Cpu,
  Factory,
  Stethoscope,
  Code,
  Wrench,
  Truck,
  ShoppingCart,
  Coffee,
  ArrowRight,
  Star,
  Info
} from "lucide-react";

export default function RDTaxCreditGuide() {
  return (
    <section>
      {/* Header */}
      <div className="hero" style={{ 
        minHeight: "50vh",
        paddingTop: "8rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="modern-badge modern-badge-primary mb-6">
              <BookOpen className="w-4 h-4" />
              COMPREHENSIVE GUIDE
            </div>
            <h1>R&D Tax Credit Complete Guide</h1>
            <p>
              Everything you need to know about qualifying for and maximizing your 
              Research & Development tax credits. Turn your innovation investments 
              into significant tax savings.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 text-white rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary-600 mb-2">6-8%</h3>
            <p className="text-neutral-600">Average credit rate of qualified R&D expenses</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-success-500 text-white rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-success-600 mb-2">$250K</h3>
            <p className="text-neutral-600">Max payroll tax offset for small businesses</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent-500 text-white rounded-full flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-accent-600 mb-2">20+</h3>
            <p className="text-neutral-600">Years of federal R&D credit availability</p>
          </div>
        </div>

        {/* What is R&D Tax Credit */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h2 className="mb-4">What is the R&D Tax Credit?</h2>
              <p className="text-lg text-neutral-600 mb-4">
                The Research and Development (R&D) tax credit is a federal incentive that rewards 
                businesses for investing in innovation. It provides a dollar-for-dollar reduction 
                in your tax liability based on qualified research expenses.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-primary-800">Key Benefit</span>
                </div>
                <p className="text-primary-700 mb-0">
                  Unlike deductions that reduce taxable income, tax credits directly reduce 
                  the amount of tax you owe, making them significantly more valuable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">How the R&D Tax Credit Works</h2>
              <p className="text-neutral-600 mb-6">
                The credit is calculated as a percentage of your qualified research expenses. 
                You can choose between two calculation methods to maximize your benefit.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <h4 className="font-semibold">Regular Method</h4>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">
                    Based on current year expenses compared to a base period average
                  </p>
                  <div className="text-xs text-neutral-500">
                    Best for: Established businesses with consistent R&D spending
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <h4 className="font-semibold">Alternative Simplified Credit (ASC)</h4>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">
                    14% of qualified expenses exceeding 50% of average prior 3 years
                  </p>
                  <div className="text-xs text-neutral-500">
                    Best for: Growing companies or those new to R&D credits
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifying Expenses */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <PieChart className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">What Expenses Qualify?</h2>
              <p className="text-neutral-600 mb-6">
                The IRS allows four main categories of expenses to count toward your R&D credit calculation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Employee Wages</h4>
                      <p className="text-sm text-neutral-600">
                        Salaries and benefits for employees directly engaged in qualified research activities
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-success-100 text-success-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Supply Costs</h4>
                      <p className="text-sm text-neutral-600">
                        Materials and supplies consumed in the research process (not equipment)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Contract Research</h4>
                      <p className="text-sm text-neutral-600">
                        65% of amounts paid to third parties for qualified research on your behalf
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Cloud Computing</h4>
                      <p className="text-sm text-neutral-600">
                        Certain cloud computing costs directly related to qualified research
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Four-Part Test */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-danger-100 text-danger-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">The IRS Four-Part Test</h2>
              <p className="text-neutral-600 mb-6">
                To qualify for R&D credits, your activities must pass all four criteria established by the IRS.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-primary-800">Permitted Purpose</h4>
                    </div>
                    <p className="text-sm text-primary-700">
                      Activities must aim to improve functionality, performance, reliability, or quality of a business component.
                    </p>
                  </div>
                  
                  <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-success-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-success-800">Technical Nature</h4>
                    </div>
                    <p className="text-sm text-success-700">
                      Must rely on principles of physical or biological sciences, engineering, or computer science.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-warning-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-warning-800">Technological Uncertainty</h4>
                    </div>
                    <p className="text-sm text-warning-700">
                      The appropriate design, methodology, or outcome cannot be readily determined by a competent professional.
                    </p>
                  </div>
                  
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">4</span>
                      </div>
                      <h4 className="font-semibold text-accent-800">Process of Experimentation</h4>
                    </div>
                    <p className="text-sm text-accent-700">
                      Must involve systematic trial and error, modeling, simulation, or testing of alternatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industries That Qualify */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">Industries That Often Qualify</h2>
              <p className="text-neutral-600 mb-6">
                R&D credits aren't limited to traditional research companies. Many industries engage in qualifying activities.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                  <Code className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-blue-800 mb-2">Technology & Software</h4>
                  <p className="text-xs text-blue-700">Software development, AI, cloud computing, cybersecurity</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <Factory className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-800 mb-2">Manufacturing</h4>
                  <p className="text-xs text-green-700">Process improvement, automation, product development</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center">
                  <Stethoscope className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-red-800 mb-2">Healthcare & Biotech</h4>
                  <p className="text-xs text-red-700">Medical devices, pharmaceuticals, clinical research</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                  <Wrench className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-purple-800 mb-2">Engineering</h4>
                  <p className="text-xs text-purple-700">Construction methods, materials, energy efficiency</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                  <Truck className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-orange-800 mb-2">Transportation</h4>
                  <p className="text-xs text-orange-700">Logistics optimization, fleet management, autonomous systems</p>
                </div>
                
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 text-center">
                  <ShoppingCart className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-teal-800 mb-2">Retail & E-commerce</h4>
                  <p className="text-xs text-teal-700">POS systems, inventory management, customer analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">SUCCESS STORY</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">SaaS Startup Saves $250,000</h3>
              <p className="text-primary-100 mb-6">
                A 3-year-old AI scheduling software company spent $400,000 on engineering salaries, 
                data testing, and cloud computing. With little income tax liability, they used the 
                payroll tax offset option.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Results Achieved:</h4>
                  <ul className="space-y-1 text-sm text-primary-100">
                    <li>• $125,000 credit in year 1</li>
                    <li>• $125,000 credit in year 2</li>
                    <li>• Funded 2 additional developers</li>
                    <li>• Accelerated product launch</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Key Lesson:</h4>
                  <p className="text-sm text-primary-100">
                    Even without profits, startups can turn R&D credits into real growth capital 
                    through the payroll tax offset provision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-danger-100 text-danger-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">Common Mistakes to Avoid</h2>
              <p className="text-neutral-600 mb-6">
                Avoid these pitfalls that can reduce your credit or trigger IRS scrutiny.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-danger-100 text-danger-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-danger-800 mb-1">Poor Documentation</h4>
                      <p className="text-sm text-neutral-600">
                        Failing to maintain detailed records linking expenses to specific R&D activities
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-danger-100 text-danger-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-danger-800 mb-1">Overestimating Wages</h4>
                      <p className="text-sm text-neutral-600">
                        Including non-qualifying time or activities in wage calculations
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-danger-100 text-danger-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-danger-800 mb-1">Double Dipping</h4>
                      <p className="text-sm text-neutral-600">
                        Using the same expenses for multiple tax benefits or deductions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-danger-100 text-danger-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-danger-800 mb-1">Missing the Four-Part Test</h4>
                      <p className="text-sm text-neutral-600">
                        Claiming activities that don't meet all IRS qualification criteria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Requirements */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">Essential Documentation</h2>
              <p className="text-neutral-600 mb-6">
                Proper documentation is crucial for defending your R&D credit claims during an audit.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                    Financial Records
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Payroll records with R&D time tracking</li>
                    <li>• Supply and material invoices</li>
                    <li>• Contract research agreements</li>
                    <li>• Cloud computing service bills</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                    Technical Documentation
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Project descriptions and objectives</li>
                    <li>• Technical challenges and uncertainties</li>
                    <li>• Experimentation processes and results</li>
                    <li>• Design iterations and testing records</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">Step-by-Step Claiming Process</h2>
              <p className="text-neutral-600 mb-6">
                Follow this systematic approach to maximize your R&D credit claim.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Identify Qualifying Activities",
                    description: "Review projects against the IRS four-part test to determine eligible R&D activities.",
                    icon: Target
                  },
                  {
                    step: 2,
                    title: "Gather Documentation",
                    description: "Collect financial records, technical documentation, and evidence of experimentation.",
                    icon: FileText
                  },
                  {
                    step: 3,
                    title: "Calculate Your Credit",
                    description: "Use both regular and ASC methods to determine which provides the greater benefit.",
                    icon: Calculator
                  },
                  {
                    step: 4,
                    title: "Complete Form 6765",
                    description: "Fill out IRS Form 6765 with your credit calculation and supporting details.",
                    icon: CheckCircle
                  },
                  {
                    step: 5,
                    title: "File with Tax Return",
                    description: "Submit Form 6765 with your federal tax return to claim the credit.",
                    icon: ArrowRight
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className="w-5 h-5 text-primary-600" />
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timing Tips */}
        <div className="bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-warning-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-warning-800 mb-4">Timing Strategies for Maximum Benefit</h3>
              <p className="text-warning-700 mb-6">
                Strategic timing of your R&D activities and claims can significantly increase your credit amount.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-warning-800 mb-2">Plan Around Tax Year</h4>
                  <p className="text-sm text-warning-700">
                    Schedule major R&D projects within the same fiscal year to maximize qualified expenses 
                    and increase your credit calculation base.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-warning-800 mb-2">Year-End Review</h4>
                  <p className="text-sm text-warning-700">
                    Conduct a thorough review before year-end to identify all qualifying activities 
                    and ensure proper documentation is in place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Credits */}
        <div className="card mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="mb-4">Don't Forget State R&D Credits</h2>
              <p className="text-neutral-600 mb-6">
                Many states offer additional R&D tax credits that can stack with federal benefits, 
                potentially doubling your tax savings.
              </p>
              
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
                <h4 className="font-semibold text-accent-800 mb-4">States with Strong R&D Programs:</h4>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-accent-700">California</div>
                    <div className="text-xs text-accent-600">15% credit rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-accent-700">Texas</div>
                    <div className="text-xs text-accent-600">5% credit rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-accent-700">New York</div>
                    <div className="text-xs text-accent-600">9% credit rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-accent-700">Massachusetts</div>
                    <div className="text-xs text-accent-600">10% credit rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Claim Your R&D Credits?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Don't leave money on the table. Our experts will help you identify all qualifying 
            activities and maximize your R&D tax credit benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-secondary">
              Get Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="/services" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              View Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}