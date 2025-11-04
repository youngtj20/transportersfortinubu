'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Target, 
  Users, 
  Building, 
  TrendingUp, 
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ObjectivesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const objectives = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sensitise Transport Stakeholders",
      description: "To Sensitise Transport Stakeholders on the Imperatives of Tinubu Continuity",
      details: [
        "Monthly stakeholder enlightenment sessions in all 36 states",
        "Production and distribution of educational materials",
        "Digital awareness campaigns through social media platforms",
        "Radio and television programs featuring transport sector achievements",
        "Publication of quarterly progress reports on transportation development"
      ],
      outcome: "Increased awareness of government achievements, better understanding of continuity benefits, and enhanced stakeholder buy-in for the campaign."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Strategic Government Intervention",
      description: "To Put in the Front Burner the Strategic Intervention Required by the Three Tiers of Government in Transportation",
      details: [
        "Federal infrastructure projects and funding allocation",
        "State transportation policies and road maintenance",
        "Local government transport terminals and market access roads",
        "Inter-governmental coordination mechanisms",
        "Public-private partnership frameworks"
      ],
      outcome: "Regular engagement with government officials, submission of policy briefs, participation in budget hearings, and organization of stakeholder conferences."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Organized Transportation Systems",
      description: "To Campaign for Organised Transportation Systems",
      details: [
        "Standardization of transport operations and pricing",
        "Implementation of digital ticketing and payment systems",
        "Development of modern transport terminals and facilities",
        "Professional training and certification programs",
        "Safety and security enhancement measures"
      ],
      outcome: "Modernization of transport operations, adoption of technology, and professionalization of the sector."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Economic Recognition",
      description: "To Draw Attention to the Inevitability of Transportation in Any Economy",
      details: [
        "Job creation and employment generation",
        "Trade facilitation and market access",
        "Industrial development and logistics support",
        "Tourism promotion and hospitality sector growth",
        "Agricultural product transportation and food security"
      ],
      outcome: "Highlighting how transportation drives economic growth, creates employment, and facilitates trade."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Inclusive & Sustainable Transport",
      description: "To Encourage All Inclusive and Sustainable Transportation",
      details: [
        "Affordable transportation options for low-income citizens",
        "Accessible transport facilities for persons with disabilities",
        "Rural transportation connectivity programs",
        "Environmental protection and emission reduction initiatives",
        "Alternative fuel adoption and green transportation technologies"
      ],
      outcome: "Transportation systems that are accessible to all citizens regardless of economic status, physical ability, or geographical location."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-green-800">Objectives</span>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            Our Goals
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Objectives of the Group
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our objectives represent a comprehensive framework for achieving our vision and mission through specific, measurable, and time-bound activities.
          </p>
        </div>
      </section>

      {/* Objectives Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {objective.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">
                        {objective.title}
                      </CardTitle>
                      <p className="text-gray-600">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Components:</h4>
                      <ul className="space-y-2">
                        {objective.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Expected Outcome:</h4>
                      <p className="text-sm text-green-700">{objective.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Achieving These Objectives
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Together, we can transform Nigeria's transportation sector and ensure continued progress under visionary leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Become a Member
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}