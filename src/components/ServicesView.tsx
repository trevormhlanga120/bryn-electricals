import React from 'react';
import { SERVICES_DATA } from '../data';
import { AppPage, ServiceItem } from '../types';
import ServiceIcon from './ServiceIcon';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  HelpCircle,
  FileText,
  BadgeAlert
} from 'lucide-react';

interface ServicesViewProps {
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  setCurrentPage: (page: AppPage) => void;
}

export default function ServicesView({ selectedServiceId, setSelectedServiceId, setCurrentPage }: ServicesViewProps) {
  
  // Set default active service if none is selected
  const activeServiceId = selectedServiceId || SERVICES_DATA[0].id;
  const activeService = SERVICES_DATA.find(s => s.id === activeServiceId) || SERVICES_DATA[0];

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBookingTrigger = (serviceName: string) => {
    // We can pre-populate the local storage or pass state. 
    // We will store the selected service in localStorage quickly so the booking component reads it on mount!
    localStorage.setItem('apex_preselected_service', serviceName);
    setCurrentPage(AppPage.BOOK_A_SERVICE);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div id="services-view-root">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Capabilities Sheet
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Comprehensive Service Portfolio
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Explore dedicated technical specification breakdown panels for our 9 engineering divisions. Select any category to view solutions.
          </p>
        </div>
      </section>

      {/* CORE WORKSPACE */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: NAVIGATION LIST */}
            <div className="lg:col-span-4 bg-white border border-slate-200 p-4 space-y-2 sticky top-[100px]" id="services-sidebar-navigation">
              <span className="block font-display font-black text-xs uppercase tracking-wider text-slate-400 px-3 mb-4">
                Core Divisions
              </span>
              
              <div className="space-y-1">
                {SERVICES_DATA.map((service) => {
                  const isActive = service.id === activeServiceId;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleSelectService(service.id)}
                      id={`sidebar-select-${service.id}`}
                      className={`w-full text-left px-4 py-3.5 text-xs font-bold font-display uppercase tracking-wide transition-all border-l-4 flex items-center justify-between ${
                        isActive
                          ? 'bg-brand-primary text-brand-accent border-brand-accent'
                          : 'bg-white text-slate-700 border-transparent hover:bg-slate-50 hover:text-brand-primary'
                      }`}
                    >
                      <span className="truncate pr-2">{service.name}</span>
                      <ServiceIcon 
                        name={service.iconName} 
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-accent' : 'text-slate-400'}`} 
                      />
                    </button>
                  );
                })}
              </div>

              {/* Assistance Box */}
              <div className="mt-8 bg-slate-900 text-white p-6 rounded-none space-y-4">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent">
                  Need Immediate Help?
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Not sure which service fits your current dashboard symptoms? Get in touch with our Pretoria West dispatch office direct.
                </p>
                <div className="space-y-1.5 text-xs text-white">
                  <a href="tel:+27610450608" id="quick-link-tele-side" className="block text-brand-accent hover:underline font-semibold font-display">
                    📞 +27 61 045 0608
                  </a>
                  <p className="text-[10px] text-slate-400">Response time: ≤ 15 Minutes</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTIVE SERVICE PANEL */}
            <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-10 space-y-8" id="services-main-panel">
              
              {/* Image & Title Header */}
              <div className="space-y-6">
                
                {/* Visual block */}
                <div className="relative h-64 sm:h-96 w-full bg-slate-900 border border-slate-200 overflow-hidden">
                  <img 
                    src={activeService.image} 
                    alt={activeService.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-primary py-2.5 px-4 text-white text-xs font-bold font-display uppercase tracking-widest border-l-4 border-brand-accent flex items-center space-x-2">
                    <ServiceIcon name={activeService.iconName} className="w-4 h-4 text-brand-accent" />
                    <span>BRYN AUTO SPECIFICATION SECTION</span>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-2">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
                    {activeService.name}
                  </h2>
                  <div className="w-16 h-1 bg-brand-accent"></div>
                </div>

                <p className="text-brand-text text-sm sm:text-base leading-relaxed font-sans">
                  {activeService.description}
                </p>

              </div>

              {/* CORE BENEFITS */}
              <div className="p-6 bg-slate-50 border-l-4 border-emerald-600 space-y-4">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-emerald-800 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
                  Primary Benefits of this Repair Schema
                </h3>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-xs text-brand-text leading-relaxed font-sans font-medium">
                      <span className="text-emerald-500 font-bold shrink-0 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PROBLEMS SOLVED */}
              <div className="p-6 bg-slate-50 border-l-4 border-brand-accent space-y-4">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent flex items-center">
                  <BadgeAlert className="w-4 h-4 text-brand-accent mr-2" />
                  Symptoms and Failure Modes Prevented
                </h3>
                
                <ul className="space-y-3">
                  {activeService.problemsSolved.map((problem, i) => (
                    <li key={i} className="flex items-start text-xs text-brand-text leading-relaxed font-sans">
                      <span className="text-brand-accent font-bold shrink-0 mr-2.5">!</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACTION CALL TO ACTION */}
              <div className="p-6 border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wide text-brand-primary">
                    Book Scheduled Servicing For Your Specific Model
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Confirm your date slots online. We will prepare code scopes prior to vehicle arrival.
                  </p>
                </div>
                <button
                  onClick={() => handleBookingTrigger(activeService.name)}
                  id="srv-inline-booking-trigger"
                  className="btn-premium bg-brand-accent hover:bg-red-700 text-white text-xs font-bold px-6 py-3.5 tracking-wider uppercase inline-block shrink-0"
                >
                  {activeService.ctaText}
                </button>
              </div>

              {/* RELATED SERVICES PANEL */}
              {activeService.relatedServiceIds.length > 0 && (
                <div className="border-t border-slate-200 pt-6">
                  <span className="block font-display font-bold text-[11px] uppercase tracking-widest text-slate-400 mb-4">
                    Related Engineering Modules
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.relatedServiceIds.map((relatedId) => {
                      const relatedObj = SERVICES_DATA.find(s => s.id === relatedId);
                      if (!relatedObj) return null;
                      return (
                        <button
                          key={relatedId}
                          id={`related-btn-${relatedId}`}
                          onClick={() => handleSelectService(relatedId)}
                          className="text-left p-4 border border-slate-100 hover:border-brand-accent bg-white hover:bg-slate-50 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <span className="block text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-display uppercase tracking-wide truncate">
                              {relatedObj.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              Explore relative operations
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-accent transition-colors shrink-0 ml-2" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
