'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle, 
  Clock,
  Target,
  TrendingUp,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Award,
  Flag
} from 'lucide-react';
import Link from 'next/link';

export default function TimelinePage() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      phase: "PHASE 1",
      title: "FOUNDATION AND MOBILIZATION",
      period: "January 2025 - December 2025",
      status: "active",
      color: "bg-green-100 text-green-800 border-green-200",
      activities: [
        {
          period: "Jan - Mar 2025",
          activity: "Organizational Setup",
          target: "Establish structures in all 36 states",
          outcome: "Functional organizational framework"
        },
        {
          period: "Apr - Jun 2025",
          activity: "Stakeholder Mapping",
          target: "Identify and engage key transport stakeholders",
          outcome: "Comprehensive stakeholder database"
        },
        {
          period: "Jul - Sep 2025",
          activity: "Initial Mobilization",
          target: "Register 500,000 transporters",
          outcome: "Strong membership base"
        },
        {
          period: "Oct - Dec 2025",
          activity: "Awareness Campaigns",
          target: "Launch media and grassroots campaigns",
          outcome: "Public awareness of objectives"
        }
      ],
      deliverables: [
        "Complete organizational structure in all states and LGAs",
        "Launch of official website and social media platforms",
        "First National Convention of transporters",
        "Publication of transport sector achievement compendium",
        "Establishment of partnerships with major transport unions"
      ],
      stats: { members: '500K', states: '36', events: '24' }
    },
    {
      phase: "PHASE 2",
      title: "CAMPAIGN INTENSIFICATION",
      period: "January 2026 - September 2026",
      status: "upcoming",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      activities: [
        {
          period: "Jan - Mar 2026",
          activity: "Policy Advocacy",
          target: "Submit policy papers to government",
          outcome: "Influence transport policy direction"
        },
        {
          period: "Apr - Jun 2026",
          activity: "Mass Mobilization",
          target: "Expand membership to 1.5 million",
          outcome: "Broad-based transport sector support"
        },
        {
          period: "Jul - Sep 2026",
          activity: "National Campaigns",
          target: "Launch nationwide campaign activities",
          outcome: "National visibility and recognition"
        }
      ],
      deliverables: [
        "National Transport Development Summit",
        "Launch of 'Transport Achievements Documentation' project",
        "Establishment of Transport Development Fund",
        "Regional mobilization rallies in all geopolitical zones",
        "International conference on transport development in Nigeria"
      ],
      stats: { members: '1.5M', states: '36', events: '48' }
    },
    {
      phase: "PHASE 3",
      title: "ELECTION PERIOD ACTIVITIES",
      period: "October 2026 - May 2027",
      status: "upcoming",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      activities: [
        {
          period: "Oct - Dec 2026",
          activity: "Pre-Election Mobilization",
          target: "Reach 2 million transporters",
          outcome: "Maximum membership engagement"
        },
        {
          period: "Jan - Feb 2027",
          activity: "Campaign Peak Activities",
          target: "Daily campaign activities nationwide",
          outcome: "Maximum visibility and impact"
        },
        {
          period: "Mar - May 2027",
          activity: "Election Support",
          target: "Electoral participation coordination",
          outcome: "High transporter voter turnout"
        }
      ],
      deliverables: [
        "Grand National Rally of Transporters",
        "Voter registration drives at transport hubs",
        "Election monitoring and coordination",
        "Post-election unity and reconciliation programs",
        "Documentation of campaign impact and lessons learned"
      ],
      stats: { members: '2M', states: '36', events: '72' }
    }
  ];

  const milestones = [
    {
      title: "Organizational Launch",
      timeline: "March 2025",
      metric: "All 36 states with functional chapters",
      icon: <Flag className="w-6 h-6" />,
      completed: false
    },
    {
      title: "First Million Members",
      timeline: "September 2025",
      metric: "1,000,000 registered transporters",
      icon: <Users className="w-6 h-6" />,
      completed: false
    },
    {
      title: "National Recognition",
      timeline: "June 2026",
      metric: "Media coverage in all major outlets",
      icon: <Star className="w-6 h-6" />,
      completed: false
    },
    {
      title: "Peak Membership",
      timeline: "December 2026",
      metric: "2,000,000 active members",
      icon: <Target className="w-6 h-6" />,
      completed: false
    },
    {
      title: "Electoral Impact",
      timeline: "February 2027",
      metric: "Measurable influence on election outcome",
      icon: <Award className="w-6 h-6" />,
      completed: false
    }
  ];

  const upcomingEvents = [
    {
      title: "National Transport Summit",
      date: "February 15, 2025",
      location: "Abuja",
      type: "Summit",
      attendees: "5,000+"
    },
    {
      title: "Regional Stakeholder Meetings",
      date: "March 20-25, 2025",
      location: "All 6 Geo-political Zones",
      type: "Meetings",
      attendees: "10,000+"
    },
    {
      title: "First National Convention",
      date: "May 1-3, 2025",
      location: "Lagos",
      type: "Convention",
      attendees: "50,000+"
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
              <Calendar className="w-4 h-4 mr-2" />
              Our Journey Timeline
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Roadmap to
              <span className="block text-green-600">Victory 2027</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive timeline spans from 2025 to 2027, strategically designed to build 
              momentum and maximize impact as we approach the 2027 general elections.
            </p>
          </div>

          {/* Timeline Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, index) => (
              <Card 
                key={index} 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  activePhase === index ? 'ring-2 ring-green-600 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setActivePhase(index)}
              >
                <CardContent className="p-0 text-center">
                  <Badge className={`mb-4 ${phase.color} text-lg px-4 py-2`}>
                    {phase.phase}
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{phase.period}</p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div>
                      <span className="font-bold text-green-600">{phase.stats.members}</span>
                      <span className="text-gray-500"> Members</span>
                    </div>
                    <div>
                      <span className="font-bold text-green-600">{phase.stats.states}</span>
                      <span className="text-gray-500"> States</span>
                    </div>
                    <div>
                      <span className="font-bold text-green-600">{phase.stats.events}</span>
                      <span className="text-gray-500"> Events</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Phase Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {phases[activePhase].title}
            </h2>
            <p className="text-xl text-gray-600">{phases[activePhase].period}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>Key Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phases[activePhase].activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="border-l-4 border-green-600 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {activity.period}
                        </Badge>
                        <Badge className={phases[activePhase].color}>
                          {activity.activity}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          Target: {activity.target}
                        </p>
                        <p className="text-sm text-gray-600">
                          Outcome: {activity.outcome}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Key Deliverables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {phases[activePhase].deliverables.map((deliverable, deliverableIndex) => (
                    <li key={deliverableIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Critical Milestones */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Critical Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key success metrics that mark our journey to 2027
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
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg mr-3">
                            <div className="text-green-600">{milestone.icon}</div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                        </div>
                        <Badge variant="outline">{milestone.timeline}</Badge>
                      </div>
                      <p className="text-gray-600">{milestone.metric}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us at these important events in our journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-center mb-4">
                    <Badge className="mb-2 bg-green-100 text-green-800">{event.type}</Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} expected
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join us as we work towards these milestones and create lasting change 
            in Nigeria's transportation sector. Your participation matters!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/contact">
                Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
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