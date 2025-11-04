'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Setting {
  id: string;
  key: string;
  value?: string;
  type: string;
  description?: string;
}

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedIn: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
}

export default function SettingsManagement() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteTitle: 'Transporters for Tinubu 2027',
    siteDescription: 'Supporting the vision for Nigeria\'s transportation future',
    siteUrl: '',
    logoUrl: '',
    faviconUrl: '',
    contactEmail: '',
    contactPhone: '',
    socialFacebook: '',
    socialTwitter: '',
    socialInstagram: '',
    socialLinkedIn: '',
    maintenanceMode: false,
    allowRegistration: false,
    emailNotifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB for logo)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleInputChange('logoUrl', data.url);
        alert('Logo uploaded successfully!');
      } else {
        try {
          const errorData = await response.json();
          const errorMessage = errorData.error || 'Upload failed';
          alert(`Upload failed: ${errorMessage}`);
          console.error('Upload error:', response.status, errorData);
        } catch (parseError) {
          alert(`Upload failed with status ${response.status}`);
          console.error('Upload error:', response.status);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 1MB for favicon)
    if (file.size > 1 * 1024 * 1024) {
      alert('File size must be less than 1MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleInputChange('faviconUrl', data.url);
        alert('Favicon uploaded successfully!');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        
        // Convert settings array to object for easier management
        const settingsObj = data.reduce((acc: any, setting: Setting) => {
          if (setting.type === 'boolean') {
            acc[setting.key] = setting.value === 'true';
          } else {
            acc[setting.key] = setting.value || '';
          }
          return acc;
        }, {});
        
        setSiteSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const settingsArray = Object.entries(siteSettings).map(([key, value]) => ({
        key,
        value: value.toString(),
        type: typeof value === 'boolean' ? 'boolean' : 'text',
      }));

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: settingsArray }),
      });

      if (response.ok) {
        await fetchSettings();
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (key: keyof SiteSettings, value: string | boolean) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Website Settings</h2>
          <p className="text-gray-600">Configure website settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic website configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={siteSettings.siteTitle}
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  type="url"
                  value={siteSettings.siteUrl}
                  onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <Label>Logo</Label>
                <div className="space-y-3">
                  {siteSettings.logoUrl && (
                    <div className="relative w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={siteSettings.logoUrl} 
                        alt="Logo preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                      <button
                        onClick={() => handleInputChange('logoUrl', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full cursor-pointer"
                        disabled={isUploading}
                      >
                        <span>
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </>
                          )}
                        </span>
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended: PNG or SVG, max 5MB, transparent background
                  </p>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <Label>Favicon</Label>
                <div className="space-y-3">
                  {siteSettings.faviconUrl && (
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={siteSettings.faviconUrl} 
                        alt="Favicon preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                      <button
                        onClick={() => handleInputChange('faviconUrl', '')}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full cursor-pointer"
                        disabled={isUploading}
                      >
                        <span>
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Favicon
                            </>
                          )}
                        </span>
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended: ICO or PNG, max 1MB, 32x32 or 64x64 pixels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Contact details displayed on the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={siteSettings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={siteSettings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Social media links and profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="socialFacebook">Facebook</Label>
                <Input
                  id="socialFacebook"
                  value={siteSettings.socialFacebook}
                  onChange={(e) => handleInputChange('socialFacebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <Label htmlFor="socialTwitter">Twitter</Label>
                <Input
                  id="socialTwitter"
                  value={siteSettings.socialTwitter}
                  onChange={(e) => handleInputChange('socialTwitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              
              <div>
                <Label htmlFor="socialInstagram">Instagram</Label>
                <Input
                  id="socialInstagram"
                  value={siteSettings.socialInstagram}
                  onChange={(e) => handleInputChange('socialInstagram', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              
              <div>
                <Label htmlFor="socialLinkedIn">LinkedIn</Label>
                <Input
                  id="socialLinkedIn"
                  value={siteSettings.socialLinkedIn}
                  onChange={(e) => handleInputChange('socialLinkedIn', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced website configuration options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">
                    Enable to show a maintenance page to visitors
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                  <p className="text-sm text-gray-500">
                    Enable user registration on the website
                  </p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={siteSettings.allowRegistration}
                  onCheckedChange={(checked) => handleInputChange('allowRegistration', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send email notifications for important events
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={siteSettings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}