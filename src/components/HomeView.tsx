import React from 'react';
import { AppPage, ServiceItem } from '../types';
import { SERVICES_DATA, ELECTRICAL_SYSTEMS, GALLERY_DATA, TESTIMONIALS, LOCAL_IMAGES } from '../data';
import ServiceIcon from './ServiceIcon';
import DiagnosticHelper from './DiagnosticHelper';
import OptimizedImage from './OptimizedImage';
import { 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Wrench, 
  ShieldCheck, 
  Clock3, 
  TrendingUp, 
  Users2,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setCurrentPage: (page: AppPage) => void;
  setSelectedServiceId: (id: string | null) => void;
}

export default function HomeView({ setCurrentPage, setSelectedServiceId }: HomeViewProps) {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = React.useState(0);
  const [activeWhyChooseIndex, setActiveWhyChooseIndex] = React.useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = React.useState(0);
  
  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage(AppPage.SERVICES);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const rawPhone = '+27610450608';
  const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20automotive%20services.`;

  // Why Choose Us array matching design requirements
  const whyChooseUsData = [
    {
      title: 'Advanced Diagnostics',
      desc: 'Equipped with dealer-grade OBD scan systems, high-speed controllers analysis, and digital harness simulators.',
      icon: <Award className="w-8 h-8 text-white" />
    },
    {
      title: 'Experienced Technicians',
      desc: 'Our staff comprise certified master automotive mechanics and qualified auto-electrical design engineers.',
      icon: <Users2 className="w-8 h-8 text-white" />
    },
    {
      title: 'Affordable Pricing',
      desc: 'Honest transparent quoting with itemized parts and labor breakdowns. Strictly no hidden dealership surcharges.',
      icon: <CheckCircle2 className="w-8 h-8 text-white" />
    },
    {
      title: 'Fast Turnaround',
      desc: 'Efficient scheduling, prompt component testing, and strategic spare sourcing to get you back on SA roads immediately.',
      icon: <Clock3 className="w-8 h-8 text-white" />
    },
    {
      title: 'Quality Workmanship',
      desc: 'Strict adherence to original manufacturer instructions and high safety margins. Solid guarantees on parts fitted.',
      icon: <ShieldCheck className="w-8 h-8 text-white" />
    },
    {
      title: 'Customer Satisfaction',
      desc: 'A spotless record of private and commercial fleet partnerships based on clear updates and proactive advice.',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    }
  ];

  const brandNames = [
    { name: 'Toyota', sub: 'Hilux & Quantum Leads' },
    { name: 'Volkswagen', sub: 'Polo & Amarok Specialists' },
    { name: 'Ford', sub: 'Ranger & Everest Support' },
    { name: 'Mercedes-Benz', sub: 'ECU Coding & Power' },
    { name: 'BMW', sub: 'Adaptive lighting & Systems' },
    { name: 'Hyundai', sub: 'H1 & Passenger Fleet' },
    { name: 'Nissan', sub: 'NP200 & Navara Services' },
    { name: 'Isuzu', sub: 'D-Max Engineering' }
  ];

  return (
    <div id="home-view-container">

      {/* SECTION 1 - HERO */}
      {/* DESKTOP HERO VIEW */}
      <section 
        className="hidden md:block relative text-white py-20 lg:py-32 overflow-hidden border-b-4 border-brand-accent bg-cover bg-center bg-no-repeat" 
        id="hero-section"
        style={{ backgroundImage: `url(${LOCAL_IMAGES.heroBg})` }}
      >
        {/* Deep, high-contrast visual overlay to guarantee content legibility */}
        <div className="absolute inset-0 bg-slate-950/85 md:bg-brand-primary/90 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-slate-850 text-brand-accent px-3 py-1.5 text-[10px] sm:text-xs font-bold font-display uppercase tracking-wider border-l-2 border-brand-accent"
            >
              <span className="w-1.5 h-1.5 rounded-none bg-brand-accent animate-pulse"></span>
              <span>Accredited Service & Engineering Center  - South Africa</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white"
            >
              Professional Automotive Repairs & <span className="text-brand-accent">Auto Electrical Solutions</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-sm sm:text-lg font-normal leading-relaxed max-w-2xl font-sans"
            >
              Reliable vehicle servicing, comprehensive diagnostics, complex electrical repairs, and electronic security installations for private owners, corporate executives, and commercial utility fleets.
            </motion.p>
            
            <div className="pt-4 grid grid-cols-1 sm:flex sm:flex-row gap-3">
              <button
                onClick={() => setCurrentPage(AppPage.BOOK_A_SERVICE)}
                id="hero-btn-book"
                className="btn-premium bg-brand-accent hover:bg-red-700 text-white px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-center cursor-pointer font-display"
              >
                Book A Service
              </button>
              <a
                href={`tel:${rawPhone}`}
                id="hero-btn-call"
                className="btn-premium bg-slate-850 hover:bg-slate-800 text-white border border-slate-750 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center space-x-2 font-display"
              >
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>Call Dispatch Now</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-btn-whatsapp"
                className="btn-premium bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center space-x-2 font-display"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-6 text-slate-300">
              <div>
                <span className="block font-display font-black text-2xl lg:text-3xl text-brand-accent">100%</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">SA Right To Repair</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl lg:text-3xl text-brand-accent">9+</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Core Engineering Specs</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl lg:text-3xl text-brand-accent">10M+</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Harness Paths Managed</span>
              </div>
            </div>

          </div>

          {/* Hero Image Block - Fully responsive, cleanly framed, strictly no neon details */}
          <div className="lg:col-span-5 relative" id="hero-img-block">
            <div className="border-[12px] border-slate-800 bg-slate-800 relative shadow-2xl">
              <img 
                src={LOCAL_IMAGES.hero} 
                alt="Bryn Auto High-End Automotive Workshop in action" 
                className="w-full h-auto object-cover filter brightness-95 text-xs text-transparent"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-brand-primary py-2 px-3 text-xs font-bold uppercase tracking-widest font-display text-white border-l-4 border-brand-accent">
                PRETORIA SERVICE HUB
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MOBILE PREMIUM COMPACT HERO VIEW (<768px, ~70% Height, Luxury Presentation) */}
      <section 
        className="md:hidden relative text-white overflow-hidden border-b-4 border-brand-accent min-h-[72vh] flex flex-col justify-center bg-cover bg-center bg-no-repeat" 
        id="mobile-hero-section"
        style={{ backgroundImage: `url(${LOCAL_IMAGES.heroBg})` }}
      >
        {/* Mobile professional contrast overlay */}
        <div className="absolute inset-0 bg-slate-950/90 z-0"></div>
        
        <div className="px-5 py-6 space-y-4 flex flex-col justify-center h-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="inline-flex items-center space-x-1.5 bg-slate-850 text-brand-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider border-l-2 border-brand-accent max-w-max font-display"
          >
            <span className="w-1.5 h-1.5 rounded-none bg-brand-accent animate-pulse"></span>
            <span>Pretoria Service Center & Auto Electrical</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display font-extrabold text-[1.65rem] tracking-tight leading-tight text-white"
          >
            Premium Automotive Repairs & <span className="text-brand-accent">Electrical Solutions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="text-slate-300 text-xs font-sans leading-relaxed max-w-md"
          >
            Meticulous mechanical vehicle servicing, expert diagnostic fault extraction, and robust auto electrical wiring designs. Trusted South African workmanship guarantees.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-3"
          >
            <button
              onClick={() => setCurrentPage(AppPage.BOOK_A_SERVICE)}
              id="hero-mobile-btn-book"
              className="bg-brand-accent hover:bg-slate-900 border border-brand-accent text-white py-3 px-3 text-[11px] font-bold font-display tracking-widest uppercase text-center block"
            >
              Book Service
            </button>
            <a
              href={`tel:${rawPhone}`}
              id="hero-mobile-btn-call"
              className="bg-slate-850 hover:bg-slate-800 text-white border border-slate-750 py-3 px-3 text-[11px] font-bold font-display tracking-widest uppercase text-center flex items-center justify-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              <span>Call Hub</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
            className="relative pt-2"
          >
            <div className="border-[5px] border-slate-800 bg-slate-800 shadow-md">
              <img 
                src={LOCAL_IMAGES.hero} 
                alt="Bryn Auto mobile repair focus" 
                className="w-full h-auto filter brightness-95 text-xs text-transparent"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>


      {/* SECTION: OFFICIAL SOUTH AFRICAN TRUST & CTAs */}
      <section className="bg-slate-50 border-b border-slate-200 py-10" id="official-trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Trust points */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent font-display block mb-1">
                  OFFICIAL COMPANY TRUST DESIGNATION
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-brand-primary uppercase tracking-tight">
                  BRYN AUTO ELECTRICAL SERVICES AND REPAIR (PTY) LTD
                </h2>
                <div className="w-12 h-1 bg-brand-accent mt-2"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-3 bg-white border border-slate-200" id="trust-point-1">
                  <div className="p-2 bg-slate-900 text-white mr-3 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-primary uppercase font-display">Registered South African Private Company</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">Fully registered SA enterprise. Professionalism guaranteed.</p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-white border border-slate-200" id="trust-point-2">
                  <div className="p-2 bg-slate-900 text-white mr-3 shrink-0">
                    <Wrench className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-primary uppercase font-display">Professional Auto Electrical Services</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">Specialized diagnostics, custom computer rewiring, and starters.</p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-white border border-slate-200" id="trust-point-3">
                  <div className="p-2 bg-slate-900 text-white mr-3 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-primary uppercase font-display">Reliable Vehicle Repairs</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">Prompt mechanical repairs and scheduled service delivery.</p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-white border border-slate-200" id="trust-point-4">
                  <div className="p-2 bg-slate-900 text-white mr-3 shrink-0">
                    <Sparkles className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-primary uppercase font-display">Diagnostics & Repair Specialists</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">Using high-grade scanning instruments to locate issues fast.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start p-4 bg-slate-100 border border-slate-200" id="trust-point-5">
                <div className="p-2 bg-brand-primary text-white mr-4 shrink-0">
                  <MessageSquare className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-brand-primary uppercase font-display">Customer Feedback Available on Google</h4>
                  <p className="text-xs text-brand-text font-sans leading-relaxed mt-1">
                    Check out verified client appraisals and five-star reviews on Google. Honest work, transparent quotes, and certified outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Strong Call to actions */}
            <div className="lg:col-span-5 bg-slate-900 p-6 border-l-4 border-brand-accent text-white space-y-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-accent font-display block">Review & Community Hub</span>
                <h3 className="font-display font-bold text-base uppercase tracking-tight mt-0.5 text-white">Trust Verifications</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Support a verified South African engineering workshop! Write about your experience or browse active operations.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a 
                  href="https://g.page/r/CbDs4w2DEsI1EBE/review"
                  target="_blank"
                  rel="noreferrer"
                  id="trust-cta-google-review"
                  className="w-full py-4 px-4 bg-brand-accent hover:bg-red-700 text-white text-xs font-bold font-display uppercase tracking-wider text-center block transition-all flex items-center justify-center space-x-2 h-12"
                >
                  <span>★ Leave a Google Review</span>
                </a>

                <a 
                  href="https://www.facebook.com/share/17jjTgXbvJ/"
                  target="_blank"
                  rel="noreferrer"
                  id="trust-cta-facebook"
                  className="w-full py-4 px-4 bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs font-bold font-display uppercase tracking-wider text-center block transition-all flex items-center justify-center space-x-2 h-12"
                >
                  <span>Visit Our Facebook Page</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Tel: +27 61 045 0608</span>
                <span>Pretoria West, GP</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 2 - COMPANY INTRODUCTION */}
      <section className="py-20 bg-white" id="introduction-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual branding block */}
            <div className="lg:col-span-5 relative">
              <div className="bg-brand-primary p-8 text-white relative">
                <div className="absolute top-0 right-0 w-3 h-3 bg-brand-accent"></div>
                <h3 className="font-display font-black text-3xl tracking-tight uppercase leading-snug">
                  Established. Trustworthy. <span className="text-brand-accent">Accredited.</span>
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  We maintain a pristine corporate workspace engineered to diagnose modern, high-complexity electronic vehicles. No guesswork, no corner-cutting.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Strict OEM specification component sourcing</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Complete multi-point pre-delivery check lists</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold font-display">South Africa Accredited Engineers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text block */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
                Who We Are
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight leading-snug">
                Pioneering Automotive Engineering and Integrated Vehicle Electronics
              </h2>
              <p className="text-brand-text text-base leading-relaxed">
                At Bryn Auto, we design our services to transcend the capabilities of standard neighborhood repair garages. Operating from our central facility, we serve as an independent vehicle technology and engineering firm. We combine mechanical mastery with digital circuitry troubleshooting, setting high standards of consistency in South Africa.
              </p>
              <p className="text-brand-text text-base leading-relaxed">
                Whether you bring in private transport for scheduled intervals or manage a massive logistics truck fleet operating across interstate trade corridors, you receive dedicated support. We use computer fault systems, solid diagnostic instrumentation, and durable parts assemblies.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setCurrentPage(AppPage.ABOUT)}
                  id="intro-learn-more"
                  className="btn-premium inline-flex items-center space-x-2 border-b-2 border-brand-accent hover:border-brand-primary text-brand-accent hover:text-brand-primary pb-1.5 text-xs tracking-wider uppercase font-bold"
                >
                  <span>Learn more about our standards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* INTERACTIVE DIAGNOSTICS HELP SECTION - UNIQUE AND NON-GENERIC */}
      <section className="py-20 bg-slate-100 border-t border-b border-slate-200" id="interactive-diagnostics-helper-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
              Automotive Intelligence
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight">
              Pretoria interactive diagnostic desk
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4"></div>
            <p className="mt-4 text-brand-text text-sm sm:text-base">
              Use our interactive helper to diagnose warning indicators or symptoms on your vehicle. Discover potential electrical faults using actual South African dealership reference briefs.
            </p>
          </div>

          <DiagnosticHelper 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />

        </div>
      </section>


      {/* SECTION 3 - SERVICES OVERVIEW */}
      <section className="py-20 bg-brand-bg border-t border-b border-slate-200" id="services-overview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
              Our Core Capabilities
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight">
              Premium Corporate Service Schemes
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4"></div>
            <p className="mt-4 text-brand-text text-sm sm:text-base">
              Explore our core technical service fields. Each repair schedule is performed inside a high-standard workspace block utilizing advanced diagnostic verification tools.
            </p>
          </div>

          {/* Desktop/Tablet Services Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <div 
                key={service.id} 
                className="bg-white border border-slate-200 hover:border-brand-accent transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                id={`service-card-${service.id}`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <OptimizedImage 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-4 right-4 bg-brand-primary p-2.5 text-white">
                      <ServiceIcon name={service.iconName} className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-bold text-lg text-brand-primary group-hover:text-brand-accent transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-brand-text text-xs leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 space-y-2">
                  <button
                    onClick={() => handleServiceClick(service.id)}
                    id={`btn-explore-${service.id}`}
                    className="w-full text-center bg-slate-100 hover:bg-brand-primary hover:text-white text-brand-primary text-xs font-bold uppercase tracking-widest py-2 transition-all font-display block"
                  >
                    View Technical Details
                  </button>
                  <a
                    href={`https://wa.me/27610450608?text=Hi%20Bryn%20Auto,%20I%2520would%2520like%2520to%2520book%252520the%252520following%252520service%2525253A%25250A-%252520*${encodeURIComponent(service.name)}*%25250APlease%252520assist%252520with%252520scheduling.%252520Thanks!`}
                    target="_blank"
                    rel="noreferrer"
                    id={`btn-wa-book-${service.id}`}
                    className="w-full text-center bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest py-2 transition-all font-display flex items-center justify-center space-x-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Premium Swipe Carousel Layout (Touch-enabled frame, swipe to navigate with solid design) */}
          <div className="md:hidden space-y-6">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(event, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  // Swiped left -> Next
                  setActiveServiceIndex(prev => prev < SERVICES_DATA.length - 1 ? prev + 1 : 0);
                } else if (info.offset.x > swipeThreshold) {
                  // Swiped right -> Prev
                  setActiveServiceIndex(prev => prev > 0 ? prev - 1 : SERVICES_DATA.length - 1);
                }
              }}
              className="relative bg-white border border-slate-200 p-5 shadow-sm overflow-hidden min-h-[350px] flex flex-col justify-between touch-pan-y cursor-grab active:cursor-grabbing select-none"
              whileTap={{ scale: 0.99 }}
            >
              
              {/* Slider image/header */}
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900 -mx-5 -mt-5 mb-5 pointer-events-none">
                  <motion.img 
                    key={activeServiceIndex}
                    initial={{ scale: 1.02, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={SERVICES_DATA[activeServiceIndex].image} 
                    alt={SERVICES_DATA[activeServiceIndex].name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-brand-primary p-2.5 text-white">
                    <ServiceIcon name={SERVICES_DATA[activeServiceIndex].iconName} className="w-5 h-5 text-white" />
                  </div>
                </div>

                <motion.div 
                  key={`content-${activeServiceIndex}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 pointer-events-none"
                >
                  <span className="text-[10px] font-bold font-display uppercase tracking-widest text-brand-accent flex items-center justify-between">
                    <span>Capability {activeServiceIndex + 1} of {SERVICES_DATA.length}</span>
                    <span className="text-slate-400 font-mono text-[9px] lowercase normal-case tracking-normal">← swipe to browse →</span>
                  </span>
                  <h3 className="font-display font-black text-base text-brand-primary uppercase">
                    {SERVICES_DATA[activeServiceIndex].name}
                  </h3>
                  <p className="text-brand-text text-xs leading-relaxed font-sans line-clamp-4">
                    {SERVICES_DATA[activeServiceIndex].shortDesc}
                  </p>
                </motion.div>
              </div>

              {/* Slider CTA and indicators */}
              <div className="space-y-3 pt-4 mt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2" onPointerDown={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleServiceClick(SERVICES_DATA[activeServiceIndex].id)}
                    id={`btn-explore-mobile-${SERVICES_DATA[activeServiceIndex].id}`}
                    className="w-full text-center bg-brand-accent hover:bg-slate-900 border border-brand-accent text-white text-[11px] font-bold uppercase tracking-wider py-3 transition-colors font-display block select-none cursor-pointer"
                  >
                    Specs Sheet
                  </button>
                  <a
                    href={`https://wa.me/27610450608?text=Hi%20Bryn%20Auto,%20I%2520would%2520like%2520to%2520book%252520the%252520following%252520service%2525253A%25250A-%252520*${encodeURIComponent(SERVICES_DATA[activeServiceIndex].name)}*%25250APlease%252520assist%252520with%252520scheduling.%252520Thanks!`}
                    target="_blank"
                    rel="noreferrer"
                    id={`btn-wa-book-mobile-${SERVICES_DATA[activeServiceIndex].id}`}
                    className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider py-3 transition-colors font-display block select-none cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-between" onPointerDown={(e) => e.stopPropagation()}>
                  {/* Left / Right triggers */}
                  <button 
                    type="button"
                    onClick={() => setActiveServiceIndex(prev => prev > 0 ? prev - 1 : SERVICES_DATA.length - 1)}
                    className="p-2 bg-slate-100 text-brand-primary hover:bg-brand-accent hover:text-white rounded-none cursor-pointer"
                    aria-label="Previous Service"
                  >
                    <span className="font-bold text-xs uppercase font-display">← Prev</span>
                  </button>

                  <div className="flex space-x-1.5">
                    {SERVICES_DATA.map((_, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setActiveServiceIndex(idx)}
                        className={`block w-2 h-2 rounded-full transition-all ${idx === activeServiceIndex ? 'bg-brand-accent w-5' : 'bg-slate-300'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button 
                    type="button"
                    onClick={() => setActiveServiceIndex(prev => prev < SERVICES_DATA.length - 1 ? prev + 1 : 0)}
                    className="p-2 bg-slate-100 text-brand-primary hover:bg-brand-accent hover:text-white rounded-none cursor-pointer"
                    aria-label="Next Service"
                  >
                    <span className="font-bold text-xs uppercase font-display">Next →</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setSelectedServiceId(null);
                setCurrentPage(AppPage.SERVICES);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              id="view-all-services-btn"
              className="btn-premium bg-brand-primary hover:bg-slate-800 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest inline-block"
            >
              Browse All Services
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 4 - WHY CHOOSE US */}
      <section className="py-20 bg-white" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
                The Bryn Standard
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight leading-snug">
                Engineering Integrity Over Profit Margins
              </h2>
              <div className="w-16 h-1 bg-brand-accent"></div>
              <p className="text-brand-text text-sm sm:text-base leading-relaxed">
                South Africa’s automotive ecosystem deserves honest, meticulous engineering. We have structured our workflow around strict principles of quality verification and speed.
              </p>
              <div className="bg-slate-50 p-6 border-l-4 border-brand-accent space-y-2">
                <span className="block font-display font-bold text-xs uppercase tracking-wider text-brand-primary">Corporate Pledge</span>
                <p className="text-xs text-brand-text italic">
                  "We pledge to never suggest parts you do not need, and to stand behind our repairs with robust guarantees that protect your peace of mind and operational budget."
                </p>
              </div>
            </div>

            {/* Desktop/Tablet view for metrics */}
            <div className="hidden sm:grid lg:col-span-8 grid-cols-1 sm:grid-cols-2 gap-8">
              {whyChooseUsData.map((item, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors space-y-4"
                  id={`why-choose-block-${index}`}
                >
                  <div className="bg-brand-primary p-3 inline-block rounded-none">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-primary">
                    {item.title}
                  </h3>
                  <p className="text-brand-text text-xs leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile Horizon swipe metrics card layout (Premium Touch Frame, 1 card at a time with solid backing) */}
            <div className="sm:hidden space-y-4">
              <div className="relative p-6 bg-slate-50 border border-slate-200 min-h-[220px] flex flex-col justify-between">
                
                <motion.div
                  key={activeWhyChooseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-brand-primary p-2.5 inline-block rounded-none shrink-0">
                      {whyChooseUsData[activeWhyChooseIndex].icon}
                    </div>
                    <div>
                      <span className="block text-[9px] font-display uppercase tracking-widest text-brand-accent font-bold">Standard {activeWhyChooseIndex + 1} of 6</span>
                      <h3 className="font-display font-bold text-sm text-brand-primary uppercase">
                        {whyChooseUsData[activeWhyChooseIndex].title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-brand-text text-[11px] leading-relaxed font-sans">
                    {whyChooseUsData[activeWhyChooseIndex].desc}
                  </p>
                </motion.div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-150 mt-4 h-8">
                  <button 
                    type="button"
                    onClick={() => setActiveWhyChooseIndex(prev => prev > 0 ? prev - 1 : whyChooseUsData.length - 1)}
                    className="p-1 px-2.5 bg-white border border-slate-200 text-brand-primary text-[10px] font-bold font-display uppercase cursor-pointer"
                  >
                    ← Prev
                  </button>

                  <div className="flex space-x-1">
                    {whyChooseUsData.map((_, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setActiveWhyChooseIndex(idx)}
                        className={`block w-2 h-2 rounded-full transition-all ${idx === activeWhyChooseIndex ? 'bg-brand-accent w-4' : 'bg-slate-300'}`}
                      />
                    ))}
                  </div>

                  <button 
                    type="button"
                    onClick={() => setActiveWhyChooseIndex(prev => prev < whyChooseUsData.length - 1 ? prev + 1 : 0)}
                    className="p-1 px-2.5 bg-white border border-slate-200 text-brand-primary text-[10px] font-bold font-display uppercase cursor-pointer"
                  >
                    Next →
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 5 - AUTO ELECTRICAL SPECIALISTS (DEDICATED PANEL SHOWCASE) */}
      <section className="py-20 bg-slate-900 text-white border-t-4 border-brand-accent" id="auto-electrical-specialists-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
                Master Electricians
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Accredited Auto Electrical Specialist Workshops
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  setCurrentPage(AppPage.AUTO_ELECTRICAL);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                id="electrical-section-link"
                className="btn-premium bg-brand-accent hover:bg-red-700 text-white text-xs font-bold px-6 py-3 tracking-widest uppercase block"
              >
                Access Auto Electrical Page
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ELECTRICAL_SYSTEMS.slice(0, 4).map((system) => (
                <div 
                  key={system.id} 
                  className="bg-slate-800 border-l-4 border-brand-accent p-6 hover:bg-slate-800/80 transition-colors"
                  id={`home-electrical-card-${system.id}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <ServiceIcon name={system.iconName} className="w-5 h-5 text-brand-accent" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                      {system.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {system.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border-[12px] border-slate-800 bg-slate-800">
                <OptimizedImage 
                  src={LOCAL_IMAGES.electrical} 
                  alt="Precision automotive electrician wiring loom diagnostics" 
                  className="w-full h-auto object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-accent p-6 max-w-xs hidden sm:block">
                <p className="font-display font-black text-xs uppercase text-white tracking-widest mb-1">
                  Did You Know?
                </p>
                <p className="text-[11px] text-white/90 leading-tight">
                  Over 40% of standard vehicle mechanical check breakdowns in Gauteng originate from bad alternator grounding or aged electrical harnesses.
                </p>
              </div>
            </div>

          </div>

          {/* Quick core checklist */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-300">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              Battery Diagnostics & SOH Certification
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              Alternator Voltage Control & Regulator Refits
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              High-Output Starter Solenoid Bench Testing
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              Custom Fuse Box Layouts & Rewiring Runs
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              LED Bulb Conversions & Projector Alignments
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
              Fault Extraction on High-Speed CAN-Bus systems
            </span>
          </div>

        </div>
      </section>


      {/* SECTION 6 - VEHICLE BRANDS WE SERVICE */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" id="brands-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-3">
            Accredited Repair Matrix
          </span>
          <h2 className="font-display font-bold text-xl uppercase tracking-wide text-brand-primary mb-10">
            Certified Engineering Support For Major Brands
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brandNames.map((brand, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 hover:border-slate-300 p-4 flex flex-col justify-center items-center transition-colors"
                id={`brand-tag-${brand.name.toLowerCase()}`}
              >
                <span className="font-display font-black text-sm tracking-widest text-brand-primary uppercase">
                  {brand.name}
                </span>
                <span className="text-[9px] text-slate-400 font-medium font-sans uppercase mt-1 leading-none">
                  {brand.sub}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-brand-text max-w-2xl mx-auto uppercase tracking-wider">
            All brand registrations, names, and trademark systems belong strictly to their registered OEMs. Our parts integration complies with native South African service guidelines.
          </p>

        </div>
      </section>


      {/* SECTION 7 - GALLERY PREVIEW */}
      <section className="py-20 bg-white" id="gallery-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
                Workshop Showcase
              </span>
              <h2 className="font-display font-extrabold text-3xl text-brand-primary tracking-tight">
                Our Workmanship In Action
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  setCurrentPage(AppPage.GALLERY);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                id="gallery-preview-btn"
                className="btn-premium inline-flex items-center space-x-2 bg-slate-100 hover:bg-brand-primary text-brand-primary hover:text-white px-5 py-3 text-xs tracking-wider uppercase font-bold"
              >
                <span>View Filterable Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Grid View */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_DATA.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden bg-slate-900 border border-slate-200"
                id={`gallery-preview-card-${item.id}`}
              >
                <div className="h-64 overflow-hidden">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-brand-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-accent mb-2 block font-display">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Swipeable Horizontal Gallery for Mobile (Premium Touch-Enabled Carousel, 1 photo at a time) */}
          <div className="sm:hidden space-y-4">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(event, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  setActiveGalleryIndex(prev => prev < 2 ? prev + 1 : 0);
                } else if (info.offset.x > swipeThreshold) {
                  setActiveGalleryIndex(prev => prev > 0 ? prev - 1 : 2);
                }
              }}
              className="relative bg-slate-950 border border-slate-800 overflow-hidden text-white flex flex-col justify-between min-h-[300px] touch-pan-y cursor-grab active:cursor-grabbing select-none"
              whileTap={{ scale: 0.99 }}
            >
              
              <div>
                <div className="h-56 overflow-hidden bg-slate-900 relative">
                  <motion.img 
                    key={activeGalleryIndex}
                    initial={{ opacity: 0.8, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={GALLERY_DATA.slice(0, 3)[activeGalleryIndex].image} 
                    alt={GALLERY_DATA.slice(0, 3)[activeGalleryIndex].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-brand-primary/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider font-display text-white border-l-2 border-brand-accent">
                    {GALLERY_DATA.slice(0, 3)[activeGalleryIndex].category}
                  </div>
                </div>

                <motion.div 
                  key={`gallery-desc-${activeGalleryIndex}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 space-y-1.5"
                >
                  <span className="text-[9px] font-bold font-display uppercase tracking-widest text-brand-accent">WORK SAMPLE {activeGalleryIndex + 1} OF 3</span>
                  <h3 className="font-display font-medium text-sm text-white uppercase leading-snug">
                    {GALLERY_DATA.slice(0, 3)[activeGalleryIndex].title}
                  </h3>
                </motion.div>
              </div>

              <div className="px-4 pb-4 flex items-center justify-between border-t border-slate-900 pt-3" onPointerDown={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setActiveGalleryIndex(prev => prev > 0 ? prev - 1 : 2)}
                  className="p-1 px-2.5 bg-slate-900 border border-slate-850 text-white text-[10px] font-bold font-display uppercase cursor-pointer hover:text-brand-accent h-7 flex items-center justify-center font-sans select-none"
                >
                  &larr;
                </button>

                <div className="flex space-x-1.5 select-none">
                  {GALLERY_DATA.slice(0, 3).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`block w-12 h-1 transition-all ${idx === activeGalleryIndex ? 'bg-brand-accent' : 'bg-slate-800'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveGalleryIndex(prev => prev < 2 ? prev + 1 : 0)}
                  className="p-1 px-2.5 bg-slate-900 border border-slate-850 text-white text-[10px] font-bold font-display uppercase cursor-pointer hover:text-brand-accent h-7 flex items-center justify-center font-sans select-none"
                >
                  &rarr;
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </section>


      {/* SECTION 8 - CUSTOMER TESTIMONIALS */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
              Verified Feedback
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight">
              What Our Clients Say
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4"></div>
          </div>

          {/* Desktop/Tablet Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 border border-slate-100 hover:border-slate-200 flex flex-col justify-between shadow-sm relative"
                id={`testimonial-card-${testimonial.id}`}
              >
                <div className="space-y-4">
                  
                  {/* Rating star blocks */}
                  <div className="flex space-x-1" id={`rating-${testimonial.id}`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-brand-accent text-lg font-bold font-display">★</span>
                    ))}
                  </div>

                  <p className="text-brand-text text-xs leading-relaxed italic font-sans">
                    "{testimonial.comment}"
                  </p>

                </div>

                <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-100">
                  <div className="rounded-none bg-slate-100 w-12 h-12 flex-shrink-0 flex items-center justify-center font-display font-black text-slate-800 uppercase text-sm">
                    {testimonial.name.slice(0, 2)}
                  </div>
                  <div>
                    <span className="block font-display font-bold text-sm text-brand-primary">
                      {testimonial.name}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-semibold font-display">
                      {testimonial.role} {testimonial.company ? `| ${testimonial.company}` : ''}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          {/* Mobile Single Slide Testimonial View (Premium Review Slider with Touch-Swipe) */}
          <div className="md:hidden space-y-6">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(event, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  // Swiped left -> Next
                  setActiveTestimonial(prev => prev < TESTIMONIALS.length - 1 ? prev + 1 : 0);
                } else if (info.offset.x > swipeThreshold) {
                  // Swiped right -> Prev
                  setActiveTestimonial(prev => prev > 0 ? prev - 1 : TESTIMONIALS.length - 1);
                }
              }}
              className="bg-white p-6 border border-slate-200 shadow-sm relative min-h-[240px] flex flex-col justify-between cursor-grab active:cursor-grabbing select-none touch-pan-y"
              whileTap={{ scale: 0.99 }}
            >
              
              <div className="pointer-events-none">
                {/* Stars & Swipe Hint */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1">
                    {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                      <span key={i} className="text-brand-accent text-base font-bold">★</span>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 lowercase tracking-normal">
                    ← swipe to read →
                  </span>
                </div>
 
                <motion.p 
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-brand-text text-xs leading-relaxed italic font-sans"
                >
                  "{TESTIMONIALS[activeTestimonial].comment}"
                </motion.p>
              </div>
 
              <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-slate-100 pointer-events-none">
                <div className="rounded-none bg-slate-100 w-10 h-10 flex-shrink-0 flex items-center justify-center font-display font-black text-slate-800 uppercase text-xs">
                  {TESTIMONIALS[activeTestimonial].name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-display font-bold text-xs text-brand-primary truncate font-display">
                    {TESTIMONIALS[activeTestimonial].name}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold font-display truncate">
                    {TESTIMONIALS[activeTestimonial].role} {TESTIMONIALS[activeTestimonial].company ? `| ${TESTIMONIALS[activeTestimonial].company}` : ''}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Testimonials Dots Slider Controllers with Active Slide triggers */}
            <div className="flex items-center justify-between px-2">
              <button 
                type="button"
                onClick={() => setActiveTestimonial(prev => prev > 0 ? prev - 1 : TESTIMONIALS.length - 1)}
                className="text-[11px] font-bold font-display uppercase tracking-wider text-brand-primary font-display"
              >
                &larr; Prev
              </button>

              <div className="flex justify-center items-center space-x-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`block w-2 h-2 rounded-full transition-all ${idx === activeTestimonial ? 'bg-brand-accent w-4' : 'bg-slate-350'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                type="button"
                onClick={() => setActiveTestimonial(prev => prev < TESTIMONIALS.length - 1 ? prev + 1 : 0)}
                className="text-[11px] font-bold font-display uppercase tracking-wider text-brand-primary font-display"
              >
                Next &rarr;
              </button>
            </div>
          </div>        </div>

        </div>
      </section>


      {/* SECTION 9 - CALL TO ACTION */}
      <section className="bg-brand-accent text-white py-16" id="home-cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
            Experiencing Auto Electrical Diagnostic Failures?
          </h2>
          
          <p className="text-white/90 text-sm sm:text-base max-w-3xl mx-auto font-sans leading-relaxed">
            Do not let a warning light turn into a catastrophic failure. Prevent towing fees and secondary starter damage. Connect with our South African master mechanics today.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage(AppPage.BOOK_A_SERVICE);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              id="cta-home-booking-btn"
              className="btn-premium bg-brand-primary hover:bg-slate-800 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book Service Online
            </button>
            <a
              href={`tel:${rawPhone}`}
              id="cta-home-call-btn"
              className="btn-premium bg-white hover:bg-slate-100 text-brand-accent px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Us: +27 61 045 0608</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              id="cta-home-whatsapp-btn"
              className="btn-premium bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp Inquire</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
