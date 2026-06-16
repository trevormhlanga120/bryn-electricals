import React, { useState, useEffect } from 'react';
import { BrynLogo } from './BrynLogo';
import { AppPage } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Shield, 
  MessageSquare,
  ArrowRight,
  Gauge,
  Home,
  Activity,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  setSelectedServiceId?: (id: string | null) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, setCurrentPage, setSelectedServiceId, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'HOME', page: AppPage.HOME },
    { label: 'ABOUT US', page: AppPage.ABOUT },
    { label: 'SERVICES', page: AppPage.SERVICES },
    { label: 'AUTO ELECTRICAL', page: AppPage.AUTO_ELECTRICAL },
    { label: 'GALLERY', page: AppPage.GALLERY },
    { label: 'BOOK A SERVICE', page: AppPage.BOOK_A_SERVICE },
    { label: 'FAQ', page: AppPage.FAQ },
    { label: 'CONTACT', page: AppPage.CONTACT }
  ];

  const handleNavClick = (page: AppPage) => {
    if (setSelectedServiceId && page === AppPage.SERVICES) {
      setSelectedServiceId(null); // Reset filters
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const formattedPhone = '+27 61 045 0608';
  const rawPhone = '+27610450608';
  const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=Hi,%20I%20would%20like%20to%20book%20a%20service%20for%20my%20vehicle.`;

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-sans text-brand-text">
      
      {/* TOP HEADER UTILITY BAR */}
      <div className="bg-brand-primary text-white border-b border-slate-800 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
              Pretoria, South Africa
            </span>
            <span className="flex items-center text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
              Mon - Fri: 08:00 - 17:00 | Sat: 08:00 - 13:00
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href={`tel:${rawPhone}`} 
              className="flex items-center text-slate-300 hover:text-brand-accent transition-colors font-semibold"
              id="header-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent className mr-1.5" />
              Call: {formattedPhone}
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              id="header-whatsapp-link"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              WhatsApp Live
            </a>
          </div>
        </div>
      </div>

      {/* STICKY MAIN NAVIGATION */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 bg-brand-primary ${
          isScrolled 
            ? 'shadow-md py-3' 
            : 'py-4'
        }`}
        id="main-navigation-bar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo / Brand identity */}
          <div 
            onClick={() => handleNavClick(AppPage.HOME)} 
            className="flex items-center cursor-pointer select-none py-1"
            id="nav-logo"
          >
            <BrynLogo className="h-11 sm:h-14 w-auto" lightMode={false} showSubText={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav-menu">
            {menuItems.map((item) => (
              <button
                key={item.page}
                id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 text-xs font-semibold tracking-wide font-display border-b-2 transition-all ${
                  currentPage === item.page
                    ? 'text-brand-accent border-brand-accent'
                    : 'text-white border-transparent hover:text-brand-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call to action button desktop */}
          <div className="hidden lg:flex items-center" id="desktop-nav-cta">
            <button
              onClick={() => handleNavClick(AppPage.BOOK_A_SERVICE)}
              id="cta-nav-booking-btn"
              className="bg-brand-accent hover:bg-red-700 text-white text-xs font-bold font-display px-4.5 py-2.5 tracking-wider uppercase transition-colors"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Menu trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <a 
              href={`tel:${rawPhone}`}
              className="bg-slate-800 p-2 text-white hover:text-brand-accent rounded-sm"
              aria-label="Call Now"
              id="quick-mobile-call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-brand-accent p-2"
              aria-label="Toggle navigation menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Side Drawer (Right Sliding with Overlay Backdrop) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-slate-950/70 z-50 backdrop-blur-xs"
                id="mobile-nav-backdrop"
              />

              {/* Slide-in Sidebar Panel from Right */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                className="lg:hidden fixed right-0 top-0 h-full w-[290px] sm:w-[340px] bg-slate-900 border-l border-slate-800 shadow-2xl z-55 flex flex-col justify-between" 
                id="mobile-nav-drawer"
              >
                {/* Drawer Header */}
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                  <div className="flex items-center">
                    <BrynLogo className="h-8 w-auto" lightMode={false} showSubText={false} />
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white p-2"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                  
                  {/* General Menu Items */}
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display mb-2">
                      Navigation
                    </span>
                    {menuItems.map((item) => (
                      <button
                        key={item.page}
                        id={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                        onClick={() => handleNavClick(item.page)}
                        className={`w-full text-left px-3 py-2.5 text-xs font-bold font-display tracking-widest uppercase transition-all flex items-center justify-between border-l-2 ${
                          currentPage === item.page
                            ? 'bg-slate-850 text-brand-accent border-brand-accent'
                            : 'text-gray-300 border-transparent hover:bg-slate-800/50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </button>
                    ))}
                  </div>

                  {/* Immediate Action Buttons Inside Drawer */}
                  <div className="space-y-2 pt-2">
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display mb-2">
                      Admissions Support
                    </span>
                    <a
                      href={`tel:${rawPhone}`}
                      className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-3 text-xs font-bold uppercase tracking-wider font-display flex items-center justify-center space-x-2 border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Call Dispatch Room</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-xs font-bold uppercase tracking-wider font-display flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Live</span>
                    </a>
                  </div>

                </div>

                {/* Right To Repair / SLA Footer Block in side drawer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-wider font-display text-brand-accent">
                    <span>Freedom To Choose</span>
                    <span className="inline-block w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                    Bryn Auto Electrical Services and Repair (Pty) Ltd supports SA's Right to Repair. Ensuring genuine service integrity and diagnostics expertise.
                  </p>
                  <div className="text-[9px] text-slate-500 flex justify-between font-mono pt-1">
                    <span>REG: SA Private Co.</span>
                    <span>Specialist support</span>
                  </div>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* RENDER ACTIVE PAGE */}
      <main className="flex-grow pb-24 lg:pb-0">
        {children}
      </main>

      {/* MOBILE BOTTOM FLOATING DOCK BAR - DESIGNED FOR CALL, WHATSAPP, BOOK */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-slate-800 shadow-2xl p-0 flex items-center justify-between" 
        id="mobile-floating-dock"
      >
        <a 
          href={`tel:${rawPhone}`}
          id="mobile-dock-call"
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-slate-300 hover:text-white transition-all border-r border-slate-900 h-14"
        >
          <Phone className="w-5 h-5 text-brand-accent shrink-0" />
          <span className="text-[10px] font-bold font-display uppercase tracking-widest mt-1">Call</span>
        </a>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          id="mobile-dock-whatsapp"
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-emerald-400 hover:text-emerald-300 transition-colors border-r border-slate-900 h-14"
        >
          <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-[10px] font-bold font-display uppercase tracking-widest mt-1">WhatsApp</span>
        </a>

        <button 
          onClick={() => handleNavClick(AppPage.BOOK_A_SERVICE)}
          id="mobile-dock-book"
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-brand-accent hover:text-red-400 transition-all h-14"
        >
          <Calendar className="w-5 h-5 text-brand-accent shrink-0" />
          <span className="text-[10px] font-bold font-display uppercase tracking-widest mt-1 text-slate-200">Book Service</span>
        </button>
      </div>

      {/* CORPORATE FOOTER */}
      <footer className="bg-brand-primary text-white pt-16 pb-8 border-t border-slate-800" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Branding info */}
          <div className="space-y-4" id="footer-branding-col">
            <div className="flex items-center">
              <BrynLogo className="h-14 w-auto" lightMode={false} showSubText={true} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional heavy-duty repairs, electronic diagnostic operations, and certified auto-electrical wiring solutions. Managed by BRYN AUTO ELECTRICAL SERVICES AND REPAIR (PTY) LTD, registered in South Africa.
            </p>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center">
                <Shield className="w-3.5 h-3.5 text-brand-accent mr-2 flex-shrink-0" />
                South Africa Right To Repair Compliant
              </p>
              <p className="flex items-center">
                <Shield className="w-3.5 h-3.5 text-brand-accent mr-2 flex-shrink-0" />
                South African Registered Private Company
              </p>
            </div>
          </div>

          {/* Column 2: Quick navigation */}
          <div id="footer-navigation-col">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-200 uppercase mb-5 border-b border-brand-accent pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button onClick={() => handleNavClick(AppPage.HOME)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Home Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(AppPage.ABOUT)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Company Background
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(AppPage.SERVICES)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Services Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(AppPage.AUTO_ELECTRICAL)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Specialised Auto Electrical
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(AppPage.GALLERY)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Workshop Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(AppPage.BOOK_A_SERVICE)} className="hover:text-brand-accent transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-accent" /> Scheduled Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div id="footer-contact-col" className="space-y-4">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-200 uppercase mb-1 border-b border-brand-accent pb-2 inline-block">
              Contact Center
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Have questions or need to secure emergency roadside battery analysis?
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <a href={`tel:${rawPhone}`} className="flex items-center hover:text-brand-accent transition-colors">
                <Phone className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0" />
                <span>+27 61 045 0608</span>
              </a>
              <a href="mailto:info@brynauto.co.za" className="flex items-center hover:text-brand-accent transition-colors">
                <Mail className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0" />
                <span>info@brynauto.co.za</span>
              </a>
              <span className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0 mt-0.5" />
                <span className="leading-tight">170 Myburgh St, Capital Park, Pretoria, 0084</span>
              </span>
            </div>
          </div>

          {/* Column 4: Hours & Action */}
          <div id="footer-hours-col" className="space-y-4">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-200 uppercase mb-1 border-b border-brand-accent pb-2 inline-block">
              Business Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-1.5 text-gray-300">
                <span>Monday - Friday</span>
                <span className="font-semibold text-slate-100">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5 text-gray-300">
                <span>Saturday</span>
                <span className="font-semibold text-slate-100">08:00 - 13:00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sundays & Holidays</span>
                <span className="text-brand-accent font-semibold">Closed</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleNavClick(AppPage.BOOK_A_SERVICE)}
                id="footer-cta-booking-btn"
                className="w-full text-center bg-brand-accent hover:bg-slate-100 hover:text-brand-primary text-white py-3 text-xs font-bold uppercase tracking-wider font-display transition-all"
              >
                Instant Online Booking
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 font-sans">
          <p>© 2026 BRYN AUTO ELECTRICAL SERVICES AND REPAIR (PTY) LTD. All Rights Reserved. Private Company registered in South Africa. Reg: 2024/942183/07.</p>
          <div className="flex space-x-6">
            <button onClick={() => handleNavClick(AppPage.ABOUT)} className="hover:text-white">Profile</button>
            <button onClick={() => handleNavClick(AppPage.SERVICES)} className="hover:text-white">Services Schema</button>
            <button onClick={() => handleNavClick(AppPage.FAQ)} className="hover:text-white">Terms & SLA</button>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT BUTTON (STRICT SOLID STYLE - VISIBLE ONLY ON DESKTOP/TABLET TO PREVENT MOBILE CLUTTER) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-45 bg-emerald-600 hover:bg-emerald-700 text-white p-4 shadow-xl hidden lg:flex items-center justify-center hover:scale-105 transition-transform"
        title="Direct WhatsApp Support"
        id="floating-whatsapp-action"
        referrerPolicy="no-referrer"
      >
        <MessageSquare className="w-6 h-6 shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-0 font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap block">
          Chat Live
        </span>
      </a>

    </div>
  );
}
