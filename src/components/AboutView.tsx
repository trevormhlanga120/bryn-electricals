import React from 'react';
import { AppPage } from '../types';
import { 
  ShieldCheck, 
  Eye, 
  Target, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Gauge, 
  MessageSquare, 
  Phone 
} from 'lucide-react';

interface AboutViewProps {
  setCurrentPage: (page: AppPage) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  
  const coreValues = [
    {
      title: 'Precision Engineering',
      desc: 'We map vehicle electronics to the micro-amp level. No guesswork, no bypassed fuses, no cut wire loops.',
      icon: <Gauge className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Accredited Integrity',
      desc: 'Adhering strictly to Right to Repair protocols, we empower customers with choices and transparent pricing structures.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Customer Transparency',
      desc: 'We provide itemized reporting of diagnostic tests before performing physical interventions on vehicle engines.',
      icon: <MessageSquare className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Continuous Innovation',
      desc: 'Always updating scanner frameworks, electronic reference modules, and tool standards to match high-tech EVs.',
      icon: <Sparkles className="w-6 h-6 text-brand-accent" />
    }
  ];

  const rawPhone = '+27610450608';
  const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=Hi,%20I%20would%20like%20to%20learn%20more%20about%20your%20automotive%20services.`;

  return (
    <div id="about-us-view">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Inside Bryn Auto
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Our Legacy & Standards
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            A premium automotive systems repair company based in South Africa, built on precision diagnostics and robust electrical systems workmanship.
          </p>
        </div>
      </section>

      {/* STORY & BIO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
              Our Journey
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-primary tracking-tight">
              From Private Electrical Work, To a Leading Fleet Support Partner
            </h2>
            <div className="w-16 h-1 bg-brand-accent"></div>
            
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              Bryn Auto was established on a single principle: providing premium dealer-level diagnostic and auto-electrical repairs without the prohibitive brand premiums. Recognizing a vast engineering gap in Gauteng where standard mechanics bypassed intricate electronic systems to suggest whole harness swaps, we invested heavily in micro-circuit tooling and training.
            </p>
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              Over the years, we grew our workshop capabilities into a comprehensive solution addressing structural motor vehicle minor/major servicing, mechanical suspension, starter rebuilds, customized loom repairs, and advanced Android system fits. 
            </p>
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              Today, we operate a corporate service hub handling private commuter vehicles, company executives, logistics transporters, and local emergency utility fleets with consistent excellence.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-950 p-8 text-white relative border-l-8 border-brand-accent space-y-6">
              
              <div className="flex items-start">
                <div className="p-2.5 bg-slate-900 border border-slate-850 mr-4">
                  <Target className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-slate-100 mb-1">
                    Corporate Mission
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To deliver reliable, high-integrity automotive servicing and micro-electrical circuit repairs throughout South Africa, keeping fleets moving safely and commuters protected on regional roadways.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2.5 bg-slate-900 border border-slate-850 mr-4">
                  <Eye className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-slate-100 mb-1">
                    Company Vision
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To be the foremost independent automotive technology and diagnostics company, recognized as the golden standard for fleet engineering, system restorations, and ethical pricing in Gauteng.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2.5 bg-slate-900 border border-slate-850 mr-4">
                  <BookOpen className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-slate-100 mb-1">
                    Expertise SLA
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Every scheduled service or electrical installation comes with a comprehensive multi-point checklist, original OEM warranty spares, and standard workshop guarantees.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
              Our Compass
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-primary tracking-tight">
              Company Core Values
            </h2>
            <p className="mt-4 text-brand-text text-sm">
              We operate above standard grease-monkey practices. We hold our engineers to corporate IT-standard checklists, ensuring uniform standards of work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <div 
                key={i} 
                className="bg-white p-6 border border-slate-200 shadow-sm hover:border-brand-accent transition-colors space-y-4"
                id={`core-value-card-${i}`}
              >
                <div className="p-3 bg-slate-55 shadow-inner inline-block border border-slate-100">
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-base text-brand-primary uppercase">
                  {value.title}
                </h3>
                <p className="text-brand-text text-xs leading-relaxed font-sans">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WORK ETHIC & COMMITMENT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-slate-200 p-8 md:p-12 space-y-8 bg-slate-50">
            
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
                Professional Pledge
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-primary uppercase tracking-tight">
                Our Unwavering Commitment To Customer Satisfaction
              </h2>
              <div className="w-12 h-1 bg-brand-accent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-brand-text">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-primary flex items-center">
                  <span className="w-2 h-2 bg-brand-accent mr-3"></span>
                  Professional Work Ethic
                </h3>
                <p>
                  Our workshop operates on organized digital timelines. Every mechanic is clean, uniformed, and focused. We treat customer vehicles with high-level care, maintaining clean protective covers on seats and steering systems throughout the diagnostic and servicing lifecycle.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-primary flex items-center">
                  <span className="w-2 h-2 bg-brand-accent mr-3"></span>
                  Accredited Certification Proof
                </h3>
                <p>
                  We are fully aligned with the Consumer Protection Act rules in South Africa. Parts supplied carry official merchant backing, and all structural weldments, electrical joints, or electronic radio installs match native compliance metrics.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-bold text-sm uppercase tracking-wider text-brand-primary text-center sm:text-left">
                Need premium diagnostics or routine major servicing scheduled?
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setCurrentPage(AppPage.BOOK_A_SERVICE)}
                  id="about-cta-booking"
                  className="bg-brand-accent hover:bg-slate-900 text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3 block text-center"
                >
                  Book A Service Now
                </button>
                <a
                  href={`tel:${rawPhone}`}
                  id="about-cta-call"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3 block text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-brand-accent" />
                  <span>Call: +27 61 045 0608</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
