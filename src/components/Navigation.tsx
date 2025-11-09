'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, X, Home, Users, Target, Flag, Building, Calendar, Phone, Shield, ChevronRight, Mail } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  order: number;
  published: boolean;
  target: string;
  children?: MenuItem[];
}

const defaultNavigation = [
  { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { 
    name: 'About Us', 
    href: '/about', 
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { name: 'Blog', href: '/blog', icon: <Mail className="h-5 w-5" /> },
    ]
  },
  { name: 'Vision', href: '/vision', icon: <Target className="h-5 w-5" /> },
  { name: 'Mission', href: '/mission', icon: <Flag className="h-5 w-5" /> },
  { name: 'Structure', href: '/structure', icon: <Building className="h-5 w-5" /> },
  { name: 'Timeline', href: '/timeline', icon: <Calendar className="h-5 w-5" /> },
  { name: 'Contact', href: '/contact', icon: <Phone className="h-5 w-5" /> },
];

const getIconComponent = (iconName?: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    home: <Home className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    target: <Target className="h-5 w-5" />,
    flag: <Flag className="h-5 w-5" />,
    building: <Building className="h-5 w-5" />,
    calendar: <Calendar className="h-5 w-5" />,
    phone: <Phone className="h-5 w-5" />,
    mail: <Mail className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
  };
  return iconMap[iconName?.toLowerCase() || ''] || <ChevronRight className="h-5 w-5" />;
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [siteTitle, setSiteTitle] = useState<string>('Transporters for Tinubu');
  const [siteSubtitle, setSiteSubtitle] = useState<string>('2027');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
    fetchSettings();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      if (response.ok) {
        const data = await response.json();
        // Filter only published items and sort by order
        const publishedItems = data
          .filter((item: MenuItem) => item.published)
          .sort((a: MenuItem, b: MenuItem) => a.order - b.order)
          .map((item: MenuItem) => ({
            ...item,
            children: item.children
              ?.filter((child: MenuItem) => child.published)
              .sort((a: MenuItem, b: MenuItem) => a.order - b.order) || [],
          }));
        setMenuItems(publishedItems);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setMenuItems([]);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const settings = await response.json();
        
        // Extract logo
        const logoSetting = settings.find((s: any) => s.key === 'logoUrl');
        if (logoSetting && logoSetting.value) {
          setLogoUrl(logoSetting.value);
        }
        
        // Extract site title
        const titleSetting = settings.find((s: any) => s.key === 'siteTitle');
        if (titleSetting && titleSetting.value) {
          setSiteTitle(titleSetting.value);
        }
        
        // Extract social media links
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
      console.error('Error fetching settings:', error);
    }
  };

  // Use database menu items if available, otherwise fall back to defaults
  const navigation = menuItems.length > 0 ? menuItems : defaultNavigation;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="h-12 w-auto object-contain"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
            )}
            {/* Only show site title if no logo */}
            {!logoUrl && (
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">{siteTitle}</span>
                <span className="block text-sm text-green-600 font-semibold">{siteSubtitle}</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const label = 'label' in item ? item.label : item.name;
              const href = 'url' in item ? item.url : item.href;
              const target = 'target' in item ? item.target : '_self';
              const submenu = (item as any).submenu || (item as any).children;
              
              if (submenu && submenu.length > 0) {
                return (
                  <div key={label} className="relative group">
                    <button className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative flex items-center">
                      {label}
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:rotate-90 transition-transform duration-200" />
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </button>
                    <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                      {submenu.map((subitem: any) => {
                        const subLabel = 'label' in subitem ? subitem.label : subitem.name;
                        const subHref = 'url' in subitem ? subitem.url : subitem.href;
                        const subTarget = 'target' in subitem ? subitem.target : '_self';
                        return (
                          <Link
                            key={subLabel}
                            href={subHref}
                            target={subTarget}
                            rel={subTarget === '_blank' ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          >
                            {subLabel}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={label}
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              );
            })}
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/admin">Admin Login</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-4">
            <Button asChild variant="outline" size="sm" className="hidden sm:flex border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/admin">Admin</Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-green-50">
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white border-l border-gray-200">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8 mt-2">
                  <div className="flex items-center space-x-3">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt="Logo" 
                        className="h-10 w-auto object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">T</span>
                      </div>
                    )}
                    <div>
                      <span className="text-lg font-bold text-gray-900">Transporters</span>
                      <span className="block text-sm text-green-600 font-semibold">2027</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isDbItem = 'label' in item;
                    const label = isDbItem ? item.label : (item as any).name;
                    const href = isDbItem ? item.url : (item as any).href;
                    const target = isDbItem ? item.target : '_self';
                    const icon = isDbItem ? getIconComponent(item.icon) : (item as any).icon;
                    const submenu = (item as any).submenu || (item as any).children;
                    const isExpanded = expandedMenu === label;

                    if (submenu && submenu.length > 0) {
                      return (
                        <div key={label}>
                          <button
                            onClick={() => setExpandedMenu(isExpanded ? null : label)}
                            className="w-full group flex items-center justify-between p-4 rounded-xl hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-100"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-green-100 transition-colors duration-200">
                                <div className="text-gray-600 group-hover:text-green-600 transition-colors duration-200">
                                  {icon}
                                </div>
                              </div>
                              <span className="text-gray-900 font-medium group-hover:text-green-600 transition-colors duration-200">
                                {label}
                              </span>
                            </div>
                            <ChevronRight className={`h-4 w-4 text-gray-400 group-hover:text-green-600 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                          {isExpanded && (
                            <div className="pl-4 space-y-1 mt-1">
                              {submenu.map((subitem: any) => {
                                const subLabel = 'label' in subitem ? subitem.label : subitem.name;
                                const subHref = 'url' in subitem ? subitem.url : subitem.href;
                                const subTarget = 'target' in subitem ? subitem.target : '_self';
                                return (
                                  <Link
                                    key={subLabel}
                                    href={subHref}
                                    target={subTarget}
                                    rel={subTarget === '_blank' ? 'noopener noreferrer' : undefined}
                                    className="block p-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subLabel}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={label}
                        href={href}
                        target={target}
                        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="group flex items-center justify-between p-4 rounded-xl hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-green-100 transition-colors duration-200">
                            <div className="text-gray-600 group-hover:text-green-600 transition-colors duration-200">
                              {icon}
                            </div>
                          </div>
                          <span className="text-gray-900 font-medium group-hover:text-green-600 transition-colors duration-200">
                            {label}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
                      </Link>
                    );
                  })}
                </div>

                {/* Admin Login Section */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">Admin Access</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    Access the admin dashboard to manage content and view analytics.
                  </p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      Admin Login
                    </Link>
                  </Button>
                </div>

                {/* Footer Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">
                      Supporting progressive leadership
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">Active Movement</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
