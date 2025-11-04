'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Target, 
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  Rocket,
  Building,
  Truck,
  Bus,
  Plane,
  Train
} from 'lucide-react';
import Link from 'next/link';

export default function VisionPage() {
  const [activePillar, setActivePillar] = useState(0);

  const visionPillars = [
    {
      icon: <Building className="h-12 w-12 text-green-600" />,
      title: 'Modern Infrastructure',
      description: 'Developing world-class transportation infrastructure that meets global standards and supports economic growth.',
      features: [
        'Modern road networks across all states',
        'Smart transportation systems',
        'Sustainable infrastructure development',
        'Integrated transport hubs'
      ],
      stats: { value: '15,000km', label: 'New Roads Planned' }
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Worker Empowerment',
      description: 'Empowering transport workers with better working conditions, training, and opportunities for growth.',
      features: [
        'Skills development programs',
        'Better welfare packages',
        'Health and safety standards',
        'Career advancement opportunities'
      ],
      stats: { value: '1M+', label: 'Workers to Benefit' }
    },
    {
      icon: <Globe className="h-12 w-12 text-green-600" />,
      title: 'Economic Growth',
      description: 'Driving national economic development through efficient and reliable transportation systems.',
      features: [
        'Reduced transportation costs',
        'Improved trade facilitation',
        'Enhanced market access',
        'Increased foreign investment'
      ],
      stats: { value: '25%', label: 'GDP Growth Target' }
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: 'Safety & Security',
      description: 'Ensuring safe and secure transportation for all passengers and goods across Nigeria.',
      features: [
        'Advanced security systems',
        'Emergency response protocols',
        'Regular safety inspections',
        'Passenger protection programs'
      ],
      stats: { value: '99%', label: 'Safety Target' }
    }
  ];

  const futureGoals = [
    {
      year: '2025',
      title: 'Foundation Phase',
      description: 'Establish core infrastructure and regulatory frameworks',
      achievements: [
        'Complete national transport policy review',
        'Launch infrastructure development fund',
        'Establish transport worker training centers'
      ]
    },
    {
      year: '2026',
      title: 'Expansion Phase',
      description: 'Scale up operations and expand reach across all states',
      achievements: [
        'Complete 50% of planned road projects',
        'Deploy smart transport systems',
        'Achieve nationwide worker registration'
      ]
    },
    {
      year: '2027',
      title: 'Transformation Phase',
      description: 'Full implementation and realization of the vision',
      achievements: [
        'Complete all major infrastructure projects',
        'Achieve 100% worker empowerment',
        'Establish Nigeria as transport hub'
      ]
    }
  ];

  const transportModes = [
    { icon: <Truck className="h-8 w-8" />, name: 'Road Transport', progress: 85 },
    { icon: <Train className="h-8 w-8" />, name: 'Rail Transport', progress: 70 },
    { icon: <Plane className="h-8 w-8" />, name: 'Air Transport', progress: 90 },
    { icon: <Bus className="h-8 w-8" />, name: 'Public Transit', progress: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
              <Eye className="w-4 h-4 mr-2" />
              Our Vision for the Future
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A Vision for
              <span className="block text-green-600">Transformed Transportation</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              By 2027, we envision a Nigeria with world-class transportation infrastructure that 
              drives economic growth, empowers workers, and improves the lives of all citizens.
            </p>
          </div>

          {/* Vision Statement */}
          <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-green-100">
            <CardContent className="text-center">
              <Lightbulb className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision Statement</h2>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "To create a modern, efficient, and sustainable transportation system that serves as 
                the backbone of Nigeria's economic development, providing dignity and prosperity 
                for all transport workers while delivering world-class services to the nation."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Four Pillars of Our Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The core foundations that will transform Nigeria's transportation landscape
            </p>
          </div>

          {/* Pillar Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {visionPillars.map((pillar, index) => (
              <Button
                key={index}
                variant={activePillar === index ? 'default' : 'outline'}
                onClick={() => setActivePillar(index)}
                className={`px-6 py-3 ${
                  activePillar === index 
                    ? 'bg-green-600 text-white' 
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                {pillar.title}
              </Button>
            ))}
          </div>

          {/* Active Pillar Content */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Card className="p-8 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-green-100 rounded-lg mr-4">
                      {visionPillars[activePillar].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {visionPillars[activePillar].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {visionPillars[activePillar].description}
                  </p>

                  <div className="space-y-3">
                    {visionPillars[activePillar].features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {visionPillars[activePillar].stats.value}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {visionPillars[activePillar].stats.label}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Roadmap to 2027
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic plan to achieve the transportation transformation vision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureGoals.map((goal, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-center mb-4">
                    <Badge className="mb-2 bg-green-100 text-green-800 text-lg px-4 py-2">
                      {goal.year}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-center">{goal.description}</p>
                  
                  <div className="space-y-2">
                    {goal.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <Target className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Modes Progress */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transforming All Transport Modes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive development across all transportation sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transportModes.map((mode, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <div className="text-green-600">{mode.icon}</div>
                      </div>
                      <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{mode.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mode.progress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2">Development Progress</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Expected Impact by 2027
            </h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              The transformative change our vision will bring to Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-green-100">Lives Improved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30%</div>
              <div className="text-green-100">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500K</div>
              <div className="text-green-100">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">#1</div>
              <div className="text-green-100">In Africa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Be Part of This Vision
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join us in transforming Nigeria's transportation sector. Together, we can build 
            a future where transportation drives national prosperity and benefits all citizens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg">
              <Link href="/contact">
                Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
              <Link href="/mission">
                Learn About Our Mission
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}