'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Shield, 
  Users,
  Heart,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Handshake,
  Lightbulb,
  TrendingUp,
  Building,
  Truck,
  Bus,
  Plane
} from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  const [activeObjective, setActiveObjective] = useState(0);

  const missionObjectives = [
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Empower Transport Workers',
      description: 'Champion the rights, welfare, and professional development of all transport workers across Nigeria.',
      keyActions: [
        'Advocate for better working conditions',
        'Provide skills training and development',
        'Ensure fair compensation and benefits',
        'Promote workplace safety standards'
      ],
      impact: 'Improved livelihoods for 1M+ workers'
    },
    {
      icon: <Building className="h-12 w-12 text-green-600" />,
      title: 'Modernize Infrastructure',
      description: 'Drive the development of modern, efficient, and sustainable transportation infrastructure nationwide.',
      keyActions: [
        'Advocate for increased infrastructure investment',
        'Support smart transportation initiatives',
        'Promote sustainable development practices',
        'Ensure equitable distribution of projects'
      ],
      impact: '15,000km of new roads and transport networks'
    },
    {
      icon: <Globe className="h-12 w-12 text-green-600" />,
      title: 'Boost Economic Growth',
      description: 'Position transportation as a key driver of Nigeria\'s economic development and prosperity.',
      keyActions: [
        'Reduce transportation costs by 30%',
        'Improve trade and logistics efficiency',
        'Create 500,000 new jobs',
        'Attract foreign investment'
      ],
      impact: '25% contribution to national GDP'
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: 'Ensure Safety & Security',
      description: 'Guarantee safe, secure, and reliable transportation services for all passengers and goods.',
      keyActions: [
        'Implement advanced security systems',
        'Establish emergency response protocols',
        'Conduct regular safety inspections',
        'Promote passenger awareness programs'
      ],
      impact: '99% safety record across all transport modes'
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Service',
      description: 'Dedicated to serving our members, communities, and nation with excellence and integrity.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: 'Integrity',
      description: 'Upholding the highest standards of honesty, transparency, and ethical conduct.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: 'Unity',
      description: 'Fostering collaboration and solidarity among all transport workers and stakeholders.'
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: 'Excellence',
      description: 'Striving for exceptional performance and continuous improvement in all endeavors.'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Innovation',
      description: 'Embracing creative solutions and modern approaches to transportation challenges.'
    },
    {
      icon: <Handshake className="h-8 w-8 text-orange-500" />,
      title: 'Partnership',
      description: 'Building strong alliances with government, private sector, and community partners.'
    }
  ];

  const strategicPriorities = [
    {
      title: 'Policy Advocacy',
      description: 'Influence transportation policies that benefit workers and drive national development',
      progress: 75,
      color: 'bg-green-600'
    },
    {
      title: 'Member Welfare',
      description: 'Enhance the welfare and working conditions of all transport workers',
      progress: 60,
      color: 'bg-blue-600'
    },
    {
      title: 'Infrastructure Development',
      description: 'Support modern infrastructure projects across all transportation modes',
      progress: 45,
      color: 'bg-purple-600'
    },
    {
      title: 'Skills Development',
      description: 'Provide training and capacity building for transport workers',
      progress: 80,
      color: 'bg-orange-600'
    }
  ];

  const successMetrics = [
    { metric: 'Workers Empowered', value: '500,000+', target: '1,000,000' },
    { metric: 'Jobs Created', value: '125,000', target: '500,000' },
    { metric: 'Infrastructure Projects', value: '450', target: '1,000' },
    { metric: 'Safety Improvement', value: '85%', target: '99%' }
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
              <Target className="w-4 h-4 mr-2" />
              Our Mission & Purpose
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Driving Progress,
              <span className="block text-green-600">Transforming Nigeria</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our mission is to champion the transformation of Nigeria's transportation sector 
              while empowering workers and driving sustainable national development.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-green-100">
            <CardContent className="text-center">
              <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission Statement</h2>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "To unite and empower transport workers across Nigeria, advocate for progressive policies, 
                and support the development of world-class transportation infrastructure that drives 
                economic growth, creates jobs, and improves the quality of life for all Nigerians."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Objectives */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Objectives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four key focus areas that guide our mission and activities
            </p>
          </div>

          {/* Objective Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {missionObjectives.map((objective, index) => (
              <Button
                key={index}
                variant={activeObjective === index ? 'default' : 'outline'}
                onClick={() => setActiveObjective(index)}
                className={`px-6 py-3 ${
                  activeObjective === index 
                    ? 'bg-green-600 text-white' 
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                {objective.title}
              </Button>
            ))}
          </div>

          {/* Active Objective Content */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Card className="p-8 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-green-100 rounded-lg mr-4">
                      {missionObjectives[activeObjective].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {missionObjectives[activeObjective].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {missionObjectives[activeObjective].description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {missionObjectives[activeObjective].keyActions.map((action, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Expected Impact: {missionObjectives[activeObjective].impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-0">
                  <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Making a Difference</h4>
                  <p className="text-sm text-gray-600">
                    Every action we take is designed to create lasting positive change 
                    in Nigeria's transportation landscape.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our decisions, actions, and relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Priorities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Strategic Priorities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key focus areas for achieving our mission and vision
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {strategicPriorities.map((priority, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{priority.title}</h3>
                      <p className="text-gray-600 text-sm">{priority.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600 ml-4">{priority.progress}%</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${priority.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${priority.progress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">Progress towards target</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Measuring Our Impact
            </h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Track record of achievements and future targets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-green-100 font-medium mb-1">{metric.metric}</div>
                <div className="text-green-200 text-sm">Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Be part of this transformative journey. Together, we can build a transportation 
            sector that serves as the engine of Nigeria's prosperity and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg">
              <Link href="/contact">
                Get Involved <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
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