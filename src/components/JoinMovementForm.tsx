'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
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

export function JoinMovementForm() {
  const [isOpen, setIsOpen] = useState(true); // Default to open for visibility
  const [isLoading, setIsLoading] = useState(false); // Remove loading state to ensure form shows
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    stateOfOrigin: '',
    lga: '',
    modesOfTransport: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Simplified the effect to just set the popup to show
  useEffect(() => {
    // For testing purposes, always show the form
    setShowPopup(true);
    setIsOpen(true);
    setIsLoading(false);
  }, []);

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
        setSuccessMessage('Thank you for joining our movement!');
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
          setIsOpen(false);
          setSuccessMessage('');
        }, 2000);
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

  // Always show the form for testing purposes
  if (!showPopup) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join Our Movement</DialogTitle>
          <DialogDescription>
            Be part of the Transporters for Tinubu 2027 campaign. Fill in your details below.
          </DialogDescription>
        </DialogHeader>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
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
              className={errors.fullName ? 'border-red-500' : ''}
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
              className={errors.email ? 'border-red-500' : ''}
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
              className={errors.phoneNumber ? 'border-red-500' : ''}
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
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Join Movement'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}