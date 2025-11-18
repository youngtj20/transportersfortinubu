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
  Plane,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  X,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { NIGERIAN_STATES } from '@/lib/nigerian-states';

const TRANSPORT_MODES = [
  'Road Transport',
  'Rail Transport',
  'Air Transport',
  'Water Transport',
  'Pipeline Transport',
  'Non-Motorized Transport',
  'Others',
];

interface JoinFormData {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  stateOfOrigin: string;
  lga: string;
  modesOfTransport: string[];
}

export default function HomePage() {
  const [stats, setStats] = useState([
    { value: 0, label: 'Transport Workers', target: 50000, suffix: '+' },
    { value: 0, label: 'States Covered', target: 25, suffix: '+' },
    { value: 0, label: 'Support Centers', target: 774, suffix: '+' },
    { value: 0, label: 'Years of Excellence', target: 2027, suffix: '' }
  ]);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState<JoinFormData>({
    fullName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    stateOfOrigin: '',
    lga: '',
    modesOfTransport: [],
  });
  const [joinFormErrors, setJoinFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingJoinForm, setIsSubmittingJoinForm] = useState(false);
  const [joinFormSubmitted, setJoinFormSubmitted] = useState(false);
  // Add state to track if component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true after component mounts
    setIsMounted(true);
    
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats(prevStats => 
        prevStats.map(stat => {
          const progress = (stat.target / steps) * currentStep;
          return { ...stat, value: Math.floor(Math.min(progress, stat.target)) };
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const settings = await response.json();
        
        const facebookSetting = settings.find((s: any) => s.key === 'socialFacebook');
        const twitterSetting = settings.find((s: any) => s.key === 'socialTwitter');
        const instagramSetting = settings.find((s: any) => s.key === 'socialInstagram');
        const linkedinSetting = settings.find((s: any) => s.key === 'socialLinkedIn');
        
        setSocialLinks({
          facebook: facebookSetting?.value || '',
          twitter: twitterSetting?.value || '',
          instagram: instagramSetting?.value || '',
          linkedin: linkedinSetting?.value || '',
        });
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

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
              <Button 
                onClick={() => setIsJoinModalOpen(true)}
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-lg font-semibold"
              >
                Join Us Today
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
              <p className="text-gray-400 mb-6">
                Supporting progressive leadership for Nigeria's transportation future.
              </p>
              
              {/* Social Media Links */}
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.facebook && (
                    <a 
                      href={socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                      title="Follow us on Facebook"
                    >
                      <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a 
                      href={socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                      title="Follow us on Twitter"
                    >
                      <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a 
                      href={socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                      title="Follow us on Instagram"
                    >
                      <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a 
                      href={socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                      title="Follow us on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  )}
                </div>
              </div>
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

      {/* Join Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Join Our Movement</h2>
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {joinFormSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-700 mb-6">
                    Your membership application has been received successfully. We'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => {
                      setIsJoinModalOpen(false);
                      setJoinFormSubmitted(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  
                  // Validation
                  const newErrors: Record<string, string> = {};
                  if (!joinFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
                  if (!joinFormData.gender) newErrors.gender = 'Gender is required';
                  if (!joinFormData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
                  if (!/^\+?[\d\s\-()]{10,}$/.test(joinFormData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid phone number';
                  if (!joinFormData.stateOfOrigin) newErrors.stateOfOrigin = 'State of origin is required';
                  if (!joinFormData.lga) newErrors.lga = 'LGA is required';
                  if (joinFormData.modesOfTransport.length === 0) newErrors.modesOfTransport = 'Please select at least one mode of transport';
                  if (joinFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(joinFormData.email)) newErrors.email = 'Please enter a valid email address';

                  if (Object.keys(newErrors).length > 0) {
                    setJoinFormErrors(newErrors);
                    return;
                  }

                  setIsSubmittingJoinForm(true);
                  try {
                    const response = await fetch('/api/movement-members', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(joinFormData),
                    });

                    if (response.ok) {
                      setJoinFormSubmitted(true);
                      setJoinFormData({
                        fullName: '',
                        gender: '',
                        email: '',
                        phoneNumber: '',
                        stateOfOrigin: '',
                        lga: '',
                        modesOfTransport: [],
                      });
                      setTimeout(() => {
                        setIsJoinModalOpen(false);
                        setJoinFormSubmitted(false);
                      }, 2000);
                    } else {
                      const error = await response.json();
                      setJoinFormErrors({ submit: error.error || 'Failed to submit form' });
                    }
                  } catch (error) {
                    console.error('Error submitting form:', error);
                    setJoinFormErrors({ submit: 'An error occurred. Please try again.' });
                  } finally {
                    setIsSubmittingJoinForm(false);
                  }
                }} className="space-y-4">
                  {joinFormErrors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                      {joinFormErrors.submit}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <Label htmlFor="modal-fullName" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="modal-fullName"
                      value={joinFormData.fullName}
                      onChange={(e) => {
                        setJoinFormData({ ...joinFormData, fullName: e.target.value });
                        if (joinFormErrors.fullName) {
                          const newErrors = { ...joinFormErrors };
                          delete newErrors.fullName;
                          setJoinFormErrors(newErrors);
                        }
                      }}
                      placeholder="Enter your full name"
                      className={joinFormErrors.fullName ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {joinFormErrors.fullName && <p className="text-red-500 text-sm mt-1">{joinFormErrors.fullName}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <Label htmlFor="modal-gender" className="text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select value={joinFormData.gender} onValueChange={(value) => {
                      setJoinFormData({ ...joinFormData, gender: value });
                      if (joinFormErrors.gender) {
                        const newErrors = { ...joinFormErrors };
                        delete newErrors.gender;
                        setJoinFormErrors(newErrors);
                      }
                    }}>
                      <SelectTrigger className={joinFormErrors.gender ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {joinFormErrors.gender && <p className="text-red-500 text-sm mt-1">{joinFormErrors.gender}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="modal-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="modal-email"
                      type="email"
                      value={joinFormData.email}
                      onChange={(e) => {
                        setJoinFormData({ ...joinFormData, email: e.target.value });
                        if (joinFormErrors.email) {
                          const newErrors = { ...joinFormErrors };
                          delete newErrors.email;
                          setJoinFormErrors(newErrors);
                        }
                      }}
                      placeholder="Enter your email (optional)"
                      className={joinFormErrors.email ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {joinFormErrors.email && <p className="text-red-500 text-sm mt-1">{joinFormErrors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="modal-phone" className="text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="modal-phone"
                      value={joinFormData.phoneNumber}
                      onChange={(e) => {
                        setJoinFormData({ ...joinFormData, phoneNumber: e.target.value });
                        if (joinFormErrors.phoneNumber) {
                          const newErrors = { ...joinFormErrors };
                          delete newErrors.phoneNumber;
                          setJoinFormErrors(newErrors);
                        }
                      }}
                      placeholder="Enter your phone number"
                      className={joinFormErrors.phoneNumber ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {joinFormErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{joinFormErrors.phoneNumber}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <Label htmlFor="modal-state" className="text-sm font-medium">
                      State of Origin <span className="text-red-500">*</span>
                    </Label>
                    <Select value={joinFormData.stateOfOrigin} onValueChange={(value) => {
                      setJoinFormData({ ...joinFormData, stateOfOrigin: value, lga: '' });
                      if (joinFormErrors.stateOfOrigin) {
                        const newErrors = { ...joinFormErrors };
                        delete newErrors.stateOfOrigin;
                        setJoinFormErrors(newErrors);
                      }
                    }}>
                      <SelectTrigger className={joinFormErrors.stateOfOrigin ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.map((state) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {joinFormErrors.stateOfOrigin && <p className="text-red-500 text-sm mt-1">{joinFormErrors.stateOfOrigin}</p>}
                  </div>

                  {/* LGA */}
                  <div>
                    <Label htmlFor="modal-lga" className="text-sm font-medium">
                      Local Government Area (LGA) <span className="text-red-500">*</span>
                    </Label>
                    <Select value={joinFormData.lga} onValueChange={(value) => {
                      setJoinFormData({ ...joinFormData, lga: value });
                      if (joinFormErrors.lga) {
                        const newErrors = { ...joinFormErrors };
                        delete newErrors.lga;
                        setJoinFormErrors(newErrors);
                      }
                    }} disabled={!joinFormData.stateOfOrigin}>
                      <SelectTrigger className={joinFormErrors.lga ? 'border-red-500' : ''}>
                        <SelectValue placeholder={joinFormData.stateOfOrigin ? 'Select LGA' : 'Select state first'} />
                      </SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.find(s => s.name === joinFormData.stateOfOrigin)?.lgas.map((lga) => (
                          <SelectItem key={lga} value={lga}>
                            {lga}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {joinFormErrors.lga && <p className="text-red-500 text-sm mt-1">{joinFormErrors.lga}</p>}
                  </div>

                  {/* Transport Modes */}
                  <div>
                    <Label className="text-sm font-medium">
                      Select Modes of Transport <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-2 mt-2">
                      {TRANSPORT_MODES.map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={`modal-${mode}`}
                            checked={joinFormData.modesOfTransport.includes(mode)}
                            onCheckedChange={(checked) => {
                              setJoinFormData({
                                ...joinFormData,
                                modesOfTransport: checked
                                  ? [...joinFormData.modesOfTransport, mode]
                                  : joinFormData.modesOfTransport.filter(m => m !== mode),
                              });
                              if (joinFormErrors.modesOfTransport) {
                                const newErrors = { ...joinFormErrors };
                                delete newErrors.modesOfTransport;
                                setJoinFormErrors(newErrors);
                              }
                            }}
                          />
                          <Label htmlFor={`modal-${mode}`} className="font-normal cursor-pointer">
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {joinFormErrors.modesOfTransport && <p className="text-red-500 text-sm mt-2">{joinFormErrors.modesOfTransport}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmittingJoinForm}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg mt-6"
                  >
                    {isSubmittingJoinForm ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Join Movement <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}