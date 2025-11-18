'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Users,
  Building,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Calendar,
  Loader2
} from 'lucide-react';
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

interface FormData {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  stateOfOrigin: string;
  lga: string;
  modesOfTransport: string[];
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    stateOfOrigin: '',
    lga: '',
    modesOfTransport: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleTransportModeChange = (mode: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      modesOfTransport: checked
        ? [...prev.modesOfTransport, mode]
        : prev.modesOfTransport.filter(m => m !== mode),
    }));
    if (errors.modesOfTransport) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.modesOfTransport;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.stateOfOrigin) {
      newErrors.stateOfOrigin = 'State of origin is required';
    }
    if (!formData.lga) {
      newErrors.lga = 'LGA is required';
    }
    if (formData.modesOfTransport.length === 0) {
      newErrors.modesOfTransport = 'Please select at least one mode of transport';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/movement-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          gender: '',
          email: '',
          phoneNumber: '',
          stateOfOrigin: '',
          lga: '',
          modesOfTransport: [],
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        const error = await response.json();
        setErrors({ submit: error.error || 'Failed to submit form' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedState = NIGERIAN_STATES.find(s => s.name === formData.stateOfOrigin);
  const lgas = selectedState?.lgas || [];

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: 'Email',
      details: ['info@transportersfortinubu.ng', 'support@transportersfortinubu.ng'],
      description: 'General inquiries and support'
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: 'Phone',
      details: ['+2347033001031 (Hotline)', '+2347033001031 (Office)'],
      description: 'Monday to Friday, 9AM - 6PM'
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: 'Office Address',
      details: ['National Secretariat', 'Abuja, Federal Capital Territory', 'Nigeria'],
      description: 'Visit us during office hours'
    }
  ];

  const regionalOffices = [
    { city: 'Lagos', address: 'Ikoyi, Lagos State', phone: '+2347033001031' },
    { city: 'Kano', address: 'Kano City, Kano State', phone: '+2347033001031' },
    { city: 'Port Harcourt', address: 'Rivers State', phone: '+2347033001031' },
    { city: 'Enugu', address: 'Enugu State', phone: '+2347033001031' },
    { city: 'Ibadan', address: 'Oyo State', phone: '+2347033001031' },
    { city: 'Abuja', address: 'FCT', phone: '+2347033001031' }
  ];

  const membershipTypes = [
    'Individual Transport Worker',
    'Transport Company Owner',
    'Logistics Company',
    'Transport Union Member',
    'Stakeholder/Partner',
    'Supporter/Volunteer'
  ];

  const faqs = [
    {
      question: 'How can I join the movement?',
      answer: 'You can join by filling out the membership form on this page or visiting any of our regional offices.'
    },
    {
      question: 'What are the membership requirements?',
      answer: 'You must be a transport worker, stakeholder, or supporter of Nigeria\'s transportation sector development.'
    },
    {
      question: 'Are there membership fees?',
      answer: 'Basic membership is free. There are optional contribution tiers for those who wish to support our activities.'
    },
    {
      question: 'How can I volunteer?',
      answer: 'Contact us through the form below or visit your nearest regional office to learn about volunteer opportunities.'
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
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact
              <span className="block text-green-600">Transporters for Tinubu 2027</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with us to join the movement, ask questions, or explore partnership opportunities.
              Together, we can transform Nigeria's transportation sector.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us and join our movement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">{info.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-2 mb-3">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Regional Offices */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Regional Offices</h3>
            <p className="text-gray-600">Find us closer to you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalOffices.map((office, index) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{office.city}</h4>
                      <p className="text-sm text-gray-600">{office.address}</p>
                      <p className="text-sm text-gray-700 mt-1">{office.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join Our Movement
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to get involved with Transporters for Tinubu 2027
            </p>
          </div>

          {isSubmitted ? (
            <Card className="p-8 text-center bg-green-50 border-green-200">
              <CardContent className="p-0">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-700">
                  Your message has been received successfully. We'll get back to you soon.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8">
              <CardContent className="p-0">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email (optional)"
                      className={errors.email ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                      className={errors.phoneNumber ? 'border-red-500 mt-1' : 'mt-1'}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  {/* State of Origin */}
                  <div>
                    <Label htmlFor="stateOfOrigin" className="text-sm font-medium">
                      State of Origin <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.stateOfOrigin} onValueChange={(value) => handleInputChange('stateOfOrigin', value)}>
                      <SelectTrigger className={errors.stateOfOrigin ? 'border-red-500' : ''}>
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
                    {errors.stateOfOrigin && <p className="text-red-500 text-sm mt-1">{errors.stateOfOrigin}</p>}
                  </div>

                  {/* LGA */}
                  <div>
                    <Label htmlFor="lga" className="text-sm font-medium">
                      Local Government Area (LGA) <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.lga} onValueChange={(value) => handleInputChange('lga', value)} disabled={!formData.stateOfOrigin}>
                      <SelectTrigger className={errors.lga ? 'border-red-500' : ''}>
                        <SelectValue placeholder={formData.stateOfOrigin ? 'Select LGA' : 'Select state first'} />
                      </SelectTrigger>
                      <SelectContent>
                        {lgas.map((lga) => (
                          <SelectItem key={lga} value={lga}>
                            {lga}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.lga && <p className="text-red-500 text-sm mt-1">{errors.lga}</p>}
                  </div>

                  {/* Modes of Transport */}
                  <div>
                    <Label className="text-sm font-medium">
                      Select Modes of Transport <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-3 mt-3">
                      {TRANSPORT_MODES.map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={mode}
                            checked={formData.modesOfTransport.includes(mode)}
                            onCheckedChange={(checked) => handleTransportModeChange(mode, checked as boolean)}
                          />
                          <Label htmlFor={mode} className="font-normal cursor-pointer">
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.modesOfTransport && <p className="text-red-500 text-sm mt-2">{errors.modesOfTransport}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                  >
                    {isSubmitting ? (
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
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about joining our movement
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
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
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join thousands of transport workers across Nigeria in supporting the vision
            for a transformed transportation sector and prosperous future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <a href="#contact-form">
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <a href="tel:+2347033001031">
                Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}