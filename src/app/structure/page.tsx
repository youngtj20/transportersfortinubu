'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  MapPin,
  Shield,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  Target,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function StructurePage() {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const organizationalStructure = [
    {
      level: 1,
      title: 'National Leadership',
      icon: <Shield className="h-8 w-8 text-green-600" />,
      description: 'Overall strategic direction and national coordination',
      positions: [
        {
          title: 'Director-General Convener',
          responsibilities: [
            'Overall leadership and strategic vision',
            'National stakeholder engagement',
            'Policy advocacy at federal level',
            'International representation'
          ],
          contact: 'dg@transporters.org'
        },
        {
          title: 'National Secretariat',
          responsibilities: [
            'Daily operations management',
            'Coordination of regional activities',
            'Administrative support',
            'Communication hub'
          ],
          contact: 'secretariat@transporters.org'
        }
      ],
      stats: { members: 12, offices: 1, coverage: 'National' }
    },
    {
      level: 2,
      title: 'Regional Leadership',
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      description: 'Six geopolitical zones coordination',
      positions: [
        {
          title: 'North Central Regional Coordinator',
          responsibilities: [
            'Coordination of 6 states + FCT',
            'Regional policy implementation',
            'State coordinator supervision',
            'Regional stakeholder management'
          ],
          contact: 'northcentral@transporters.org'
        },
        {
          title: 'North East Regional Coordinator',
          responsibilities: [
            'Coordination of 6 states',
            'Regional development initiatives',
            'Security coordination',
            'Cross-border liaison'
          ],
          contact: 'northeast@transporters.org'
        },
        {
          title: 'North West Regional Coordinator',
          responsibilities: [
            'Coordination of 7 states',
            'Large-scale transport management',
            'Desert transport initiatives',
            'Trade route optimization'
          ],
          contact: 'northwest@transporters.org'
        },
        {
          title: 'South East Regional Coordinator',
          responsibilities: [
            'Coordination of 5 states',
            'Industrial transport support',
            'Port access coordination',
            'Manufacturing logistics'
          ],
          contact: 'southeast@transporters.org'
        },
        {
          title: 'South South Regional Coordinator',
          responsibilities: [
            'Coordination of 6 states',
            'Oil and gas transport logistics',
            'Maritime transport integration',
            'Environmental transport initiatives'
          ],
          contact: 'southsouth@transporters.org'
        },
        {
          title: 'South West Regional Coordinator',
          responsibilities: [
            'Coordination of 6 states',
            'Economic hub transport management',
            'International transport links',
            'Technology integration'
          ],
          contact: 'southwest@transporters.org'
        }
      ],
      stats: { members: 36, offices: 6, coverage: '6 Geopolitical Zones' }
    },
    {
      level: 3,
      title: 'State Leadership',
      icon: <Building className="h-8 w-8 text-green-600" />,
      description: '36 states + Federal Capital Territory coordination',
      positions: [
        {
          title: 'State Coordinators',
          responsibilities: [
            'State-level implementation',
            'Local government coordination',
            'State stakeholder engagement',
            'Local policy adaptation',
            'State government liaison',
            'Member registration and verification'
          ],
          contact: 'states@transporters.org'
        }
      ],
      stats: { members: 108, offices: 37, coverage: '36 States + FCT' }
    },
    {
      level: 4,
      title: 'Local Government Leadership',
      icon: <Users className="h-8 w-8 text-green-600" />,
      description: '774 Local Government Areas representation',
      positions: [
        {
          title: 'Local Government Representatives',
          responsibilities: [
            'Grassroots mobilization',
            'Local member registration',
            'Community engagement',
            'Local issue resolution',
            'Feedback collection',
            'Event coordination at local level'
          ],
          contact: 'lg@transporters.org'
        }
      ],
      stats: { members: 774, offices: 774, coverage: '774 LGAs' }
    }
  ];

  const supportDepartments = [
    {
      name: 'Finance & Administration',
      head: 'Director of Finance',
      functions: [
        'Budget management',
        'Financial reporting',
        'Audit and compliance',
        'Resource allocation'
      ],
      team: 8
    },
    {
      name: 'Programs & Operations',
      head: 'Director of Programs',
      functions: [
        'Program design and implementation',
        'Operational excellence',
        'Performance monitoring',
        'Impact assessment'
      ],
      team: 12
    },
    {
      name: 'Communications & Public Relations',
      head: 'Director of Communications',
      functions: [
        'Media relations',
        'Public engagement',
        'Digital communications',
        'Brand management'
      ],
      team: 6
    },
    {
      name: 'Legal & Compliance',
      head: 'Legal Director',
      functions: [
        'Legal advisory',
        'Regulatory compliance',
        'Contract management',
        'Dispute resolution'
      ],
      team: 4
    },
    {
      name: 'Training & Development',
      head: 'Director of Training',
      functions: [
        'Skills development programs',
        'Capacity building',
        'Certification programs',
        'Knowledge management'
      ],
      team: 10
    },
    {
      name: 'Research & Policy',
      head: 'Director of Research',
      functions: [
        'Policy research',
        'Data analysis',
        'Impact studies',
        'Policy recommendations'
      ],
      team: 7
    }
  ];

  const toggleLevel = (level: number) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
              <Building className="w-4 h-4 mr-2" />
              Organizational Structure
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our
              <span className="block text-green-600">Organizational Structure</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A well-structured organization designed for effective coordination, representation, 
              and service delivery across all levels of Nigeria's transportation sector.
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Leadership Levels</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">930+</div>
                <div className="text-sm text-gray-600">Leadership Positions</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">818</div>
                <div className="text-sm text-gray-600">Office Locations</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">National Coverage</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organizational Hierarchy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Leadership Hierarchy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four-tier structure ensuring effective representation from national to grassroots level
            </p>
          </div>

          <div className="space-y-6">
            {organizationalStructure.map((level) => (
              <Card key={level.level} className="overflow-hidden">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    onClick={() => toggleLevel(level.level)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        {level.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {level.stats.members} members • {level.stats.offices} offices
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          {level.stats.coverage}
                        </div>
                      </div>
                      {expandedLevel === level.level ? 
                        <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      }
                    </div>
                  </Button>

                  {expandedLevel === level.level && (
                    <div className="px-6 pb-6 border-t">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {level.positions.map((position, index) => (
                          <Card key={index} className="p-4 bg-gray-50">
                            <CardContent className="p-0">
                              <h4 className="font-semibold text-gray-900 mb-2">{position.title}</h4>
                              <div className="space-y-2">
                                {position.responsibilities.map((resp, respIndex) => (
                                  <div key={respIndex} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{resp}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                  Contact: {position.contact}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Departments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Support Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized departments providing essential support services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportDepartments.map((dept, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                    <Badge variant="secondary">{dept.team} members</Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Head:</span> {dept.head}
                  </p>

                  <div className="space-y-2">
                    {dept.functions.map((func, funcIndex) => (
                      <div key={funcIndex} className="flex items-center">
                        <Target className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{func}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Chart Visual */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Organizational Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visual representation of our complete organizational structure
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
            <div className="space-y-8">
              {/* Level 1 - National */}
              <div className="text-center">
                <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
                  National Leadership
                </div>
                <div className="text-sm text-gray-600 mt-2">12 members • 1 office</div>
              </div>

              {/* Connection Lines */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-green-300"></div>
              </div>

              {/* Level 2 - Regional */}
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {['North Central', 'North East', 'North West', 'South East', 'South South', 'South West'].map((region) => (
                    <div key={region} className="bg-green-500 text-white px-4 py-2 rounded text-center text-sm font-medium">
                      {region}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">36 members • 6 offices</div>

              {/* Connection Lines */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-green-300"></div>
              </div>

              {/* Level 3 - State */}
              <div className="text-center">
                <div className="bg-green-400 text-white px-6 py-3 rounded-lg font-medium">
                  State Coordinators
                </div>
                <div className="text-sm text-gray-600 mt-2">108 members • 37 offices</div>
              </div>

              {/* Connection Lines */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-green-300"></div>
              </div>

              {/* Level 4 - Local Government */}
              <div className="text-center">
                <div className="bg-green-300 text-white px-6 py-3 rounded-lg font-medium">
                  Local Government Representatives
                </div>
                <div className="text-sm text-gray-600 mt-2">774 members • 774 offices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Structure
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Become part of Nigeria's most comprehensive transport worker organization. 
            Find your place in our structure and contribute to the transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/contact">
                Find Your Role <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <Link href="/about">
                Learn About Our Organization
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}