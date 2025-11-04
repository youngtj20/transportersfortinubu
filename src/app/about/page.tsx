'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Award,
  History,
  Globe,
  Heart,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const milestones = [
    { year: '2023', title: 'Movement Founded', description: 'Initial gathering of transport workers across Nigeria' },
    { year: '2024', title: 'National Expansion', description: 'Established presence in all 36 states and FCT' },
    { year: '2025', title: 'Strategic Alliances', description: 'Formed partnerships with key stakeholders' },
    { year: '2027', title: 'Election Support', description: 'Full mobilization for Tinubu 2027 campaign' }
  ];

  const leadership = [
    {
      name: 'Director-General Convener',
      title: 'National Leadership',
      description: 'Leading the national initiative with decades of transportation experience',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Regional Coordinators',
      title: 'Regional Leadership',
      description: 'Six regional coordinators managing state-level operations',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'State Coordinators',
      title: 'State Leadership',
      description: '36 state coordinators driving local initiatives',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Local Government Representatives',
      title: 'Grassroots Leadership',
      description: '774 LG representatives ensuring nationwide reach',
      image: '/api/placeholder/150/150'
    }
  ];

  const achievements = [
    { icon: <Users className="h-8 w-8 text-green-600" />, title: '50,000+ Members', description: 'Strong membership base across all transport sectors' },
    { icon: <MapPin className="h-8 w-8 text-green-600" />, title: 'Nationwide Presence', description: 'Operations in all 36 states and FCT' },
    { icon: <Award className="h-8 w-8 text-green-600" />, title: 'Government Recognition', description: 'Official recognition from transportation authorities' },
    { icon: <Heart className="h-8 w-8 text-green-600" />, title: 'Community Impact', description: 'Positive impact on local communities' }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: 'Integrity',
      description: 'Upholding the highest standards of honesty and transparency in all our dealings.'
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Unity',
      description: 'Bringing together transport workers from all backgrounds for a common purpose.'
    },
    {
      icon: <Target className="h-12 w-12 text-green-600" />,
      title: 'Excellence',
      description: 'Striving for excellence in everything we do, from service to leadership.'
    },
    {
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: 'Service',
      description: 'Dedicated to serving our members and the Nigerian transportation community.'
    }
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
              <Users className="w-4 h-4 mr-2" />
              About Our Movement
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About
              <span className="block text-green-600">Transporters for Tinubu 2027</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A united movement of transport workers across Nigeria, supporting President Bola Ahmed 
              Tinubu's vision for a transformed transportation sector that drives national development.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">36</div>
                <div className="text-sm text-gray-600">States + FCT</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">774</div>
                <div className="text-sm text-gray-600">LG Coverage</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Years Strong</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'values', label: 'Our Values' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'timeline', label: 'Timeline' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 ${
                  activeTab === tab.id 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Born from a shared vision for Nigeria's transportation future, our movement represents 
                  the collective voice of transport workers nationwide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Foundation</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Transporters for Tinubu 2027 emerged from the growing need for a unified voice 
                    in Nigeria's transportation sector. Recognizing the transformative potential of 
                    President Tinubu's leadership, transport workers from across the country came 
                    together to support a vision that promises progress and development.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our movement is built on the principles of unity, integrity, and service. We 
                    believe that by working together, we can create a transportation system that 
                    serves all Nigerians and drives economic growth.
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/mission">
                      Learn About Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">National Reach</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Inclusive</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Progressive</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Trustworthy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === 'leadership' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Structure</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A hierarchical structure designed for effective coordination and representation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map((leader, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-sm text-green-600 font-medium mb-3">{leader.title}</p>
                      <p className="text-sm text-gray-600">{leader.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The principles that guide our actions and decisions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex justify-center mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Milestones that mark our journey of growth and impact
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-6 flex items-start space-x-4">
                    <CardContent className="p-0 flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">{achievement.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Key milestones in our development as a movement
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200"></div>
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <Badge className="mb-2 bg-green-100 text-green-800">{milestone.year}</Badge>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Growing Movement
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Be part of the transformation in Nigeria's transportation sector. 
            Together, we can build a brighter future for all transport workers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/contact">
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <Link href="/vision">
                Learn About Our Vision
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}