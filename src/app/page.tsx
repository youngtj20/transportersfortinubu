'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  Target, 
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Calendar,
  Award,
  Handshake,
  Truck,
  Bus,
  Plane
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [stats, setStats] = useState([
    { value: 0, label: 'Transport Workers', target: 50000, suffix: '+' },
    { value: 0, label: 'States Covered', target: 36, suffix: '' },
    { value: 0, label: 'Support Centers', target: 774, suffix: '+' },
    { value: 0, label: 'Years of Excellence', target: 2027, suffix: '' }
  ]);
  // Add state to track if component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true after component mounts
    setIsMounted(true);
    
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          const progress = Math.min(stat.value + (stat.target / steps), stat.target);
          return { ...stat, value: Math.floor(progress) };
        })
      );
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'United Voice',
      description: 'Bringing together transport workers from across Nigeria for a common cause.'
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: 'Clear Vision',
      description: 'Supporting progressive leadership that understands transportation needs.'
    },
    {
      icon: <Handshake className="h-8 w-8 text-green-600" />,
      title: 'Strong Partnerships',
      description: 'Building alliances with stakeholders and government agencies.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Economic Growth',
      description: 'Driving economic development through improved transportation systems.'
    }
  ];

  const transportSectors = [
    { icon: <Truck className="h-12 w-12" />, name: 'Road Transport', count: '25,000+' },
    { icon: <Bus className="h-12 w-12" />, name: 'Public Transit', count: '15,000+' },
    { icon: <Plane className="h-12 w-12" />, name: 'Aviation Support', count: '5,000+' },
    { icon: <MapPin className="h-12 w-12" />, name: 'Logistics', count: '10,000+' }
  ];

  const testimonials = [
    {
      name: 'Ahmed Ibrahim',
      role: 'Transport Union Leader',
      content: 'This initiative represents the future of transportation in Nigeria. We are proud to be part of this movement.',
      rating: 5
    },
    {
      name: 'Sarah Okonkwo',
      role: 'Fleet Manager',
      content: 'The vision and leadership shown here gives us hope for better infrastructure and policies.',
      rating: 5
    },
    {
      name: 'Muhammad Bello',
      role: 'Logistics Coordinator',
      content: 'Finally, a movement that truly understands the challenges we face as transport workers.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative pt-20 pb-0 px-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/infrastructure.jpg" 
            alt="Nigeria Port Infrastructure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-green-500 text-white hover:bg-green-600 inline-block">
              <Star className="w-4 h-4 mr-2" />
              Supporting Progressive Leadership
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Transporters for
              <span className="block text-green-400">Tinubu 2027</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              United in supporting President Bola Ahmed Tinubu's vision for a transformed 
              transportation sector that drives Nigeria's economic growth and development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-lg font-semibold">
                <Link href="/contact">
                  Join Us Today
                </Link>
              </Button>
            </div>
          </div>

          {/* Animated Stats - only animate after component mounts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                    {/* Show target value immediately if not mounted, otherwise show animated value */}
                    {isMounted ? stat.value.toLocaleString() : stat.target.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why We Stand Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our collective strength lies in our shared vision for Nigeria's transportation future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardContent className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Sectors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Across All Transport Sectors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Representing every facet of Nigeria's diverse transportation industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transportSectors.map((sector, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="flex justify-center text-green-600 mb-4">{sector.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sector.name}</h3>
                  <p className="text-2xl font-bold text-green-600">{sector.count}</p>
                  <p className="text-sm text-gray-600">Workers</p>
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
            Be Part of the Movement
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join thousands of transport workers across Nigeria in supporting a vision 
            that promises progress, development, and prosperity for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/contact">
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <Link href="/timeline">
                View Our Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Voices from the Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what transport workers and leaders are saying about our movement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div>
                  <span className="text-lg font-bold">Transporters for Tinubu</span>
                  <span className="block text-sm text-green-400">2027</span>
                </div>
              </div>
              <p className="text-gray-400">
                Supporting progressive leadership for Nigeria's transportation future.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/vision" className="text-gray-400 hover:text-white transition-colors">Vision</Link></li>
                <li><Link href="/mission" className="text-gray-400 hover:text-white transition-colors">Mission</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
              <ul className="space-y-2">
                <li><Link href="/structure" className="text-gray-400 hover:text-white transition-colors">Our Structure</Link></li>
                <li><Link href="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Abuja, Nigeria
                </li>
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  info@transportersfortinubu.ng
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Transporters for Tinubu 2027. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}