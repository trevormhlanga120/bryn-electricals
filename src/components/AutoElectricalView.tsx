import React from 'react';
import { ELECTRICAL_SYSTEMS, LOCAL_IMAGES } from '../data';
import { AppPage } from '../types';
import ServiceIcon from './ServiceIcon';
import OptimizedImage from './OptimizedImage';
import { 
  Zap, 
  MessageSquare, 
  Phone, 
  Check, 
  Cpu, 
  Settings, 
  ShieldAlert, 
  Gauge, 
  Lightbulb, 
  Lock, 
  Wrench 
} from 'lucide-react';

interface AutoElectricalViewProps {
  setCurrentPage: (page: AppPage) => void;
}

export default function AutoElectricalView({ setCurrentPage }: AutoElectricalViewProps) {
  
  const rawPhone = '+27610450608';
  const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=${encodeURIComponent("Hi, I have an auto electrical issue with my car and would like help.")}`;

  // Explicit mapping of details matching required topics
  const detailsArray = [
    {
      title: 'Battery Systems',
      description: 'Comprehensive high-rate load analysis, health condition checking (SOH), state of charge testing (SOC), corrosion neutralisation on terminals, and replacement of heavy-duty calcium/silver alloys plates.',
      symptoms: ['Slow hydraulic cranks', 'Swollen battery core', 'Intermittent accessory resets'],
      iconName: 'Battery'
    },
    {
      title: 'Alternators & Regulators',
      description: 'Testing of steady-current outputs, servicing alternator carbon brush bridges, diode rectifiers matching, slipping pulley alignment, and electronic dual-battery auxiliary relays configuration.',
      symptoms: ['Flickering dashboard screens', 'Active red battery hazard indicatorglow', 'Faded vehicle headlights'],
      iconName: 'Zap'
    },
    {
      title: 'Starter Motors',
      description: 'Solenoid coil rewiring, bendix gear replacement, reduction drive gear alignment, and high-torque replacements configured for optimal hot-restart performance.',
      symptoms: ['Single metallic click when key turns', 'Squealing starter drag after engine boot', 'Complete starting silence'],
      iconName: 'Gauge'
    },
    {
      title: 'Lighting Systems',
      description: 'Comprehensive troubleshooting on complex CAN-bus lighting signals. Upgrades of incandescent standard fixtures into high-power clean white LED projectors, and tail harness grounding.',
      symptoms: ['Indicator lights hyper-flashing', 'Flickering Xenon control blocks', 'High-beam relay failures'],
      iconName: 'Flame'
    },
    {
      title: 'Vehicle Rewiring & Harnesses',
      description: 'Designing custom circuit schematics, routing fire-retardant mesh loompipes, restoring water-damaged underbody connections, and complete diagnostic loom repairs on classic or industrial vehicles.',
      symptoms: ['Blown same-category fuse repeatedly', 'Hot melting copper plastic smells', 'Intermittent sensor connectivity'],
      iconName: 'Shuffle'
    },
    {
      title: 'Fault Finding & Tracing',
      description: 'Utilising elite high-speed diagnostic scanners, digital logic probes, and current-loop clamp multimeters to isolate microscopic circuit shorts and high parasitic overnight drains.',
      symptoms: ['Dead battery within 24 hours of parking', 'Unexplained electrical errors', 'Erratic engine behavior'],
      iconName: 'Cpu'
    },
    {
      title: 'Security Alarms & Immobilizers',
      description: 'Professional high-decibel acoustic siren additions, central locking lock fobs re-syncing, dual-stage shock sensors fitting, and native engine starter circuit interrupt rewiring.',
      symptoms: ['Alarm going off when wind blows', 'Fob key unresponsive', 'Immobilizer locks running car'],
      iconName: 'Shield'
    },
    {
      title: 'Central Locking Mechanisms',
      description: 'Repairing sticky door latch actuators, tracking loose central lock ground cables, replacing internal microgears, and wiring driver master-control switch matrices.',
      symptoms: ['One rear door remains unlocked', 'Loud buzzing noises inside doors', 'Doors locked key cycles back'],
      iconName: 'Lock'
    },
    {
      title: 'Electronic Accessories & HUD',
      description: 'Custom fits of reverse distance guide cameras, lane-departure dash recorders, high-fidelity car stereo speakers, amplifiers configurations, and smart touch Android system retrofitting.',
      symptoms: ['Reverse pixel distortions', 'Unpaired Bluetooth profiles', 'Audio static under accellerator drive'],
      iconName: 'Radio'
    }
  ];

  return (
    <div id="auto-electrical-view">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Specialist Division
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Specialised Auto Electrical Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Gauteng’s leading independent automotive electronic engineering team. We repair delicate microprocessor control looms, starting system motors, and electrical accessory failures.
          </p>
        </div>
      </section>

      {/* DETAILED INTRO: TECHNOLOGY CAROUSEL/GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 border-[12px] border-slate-900 bg-slate-900">
            <OptimizedImage 
              src={LOCAL_IMAGES.electrical} 
              alt="High precision diagnostic testing of electric coils" 
              className="w-full h-auto object-cover"
              containerClassName="w-full h-full animate-fade"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
              The Auto Electrical Dilemma
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-primary tracking-tight leading-snug">
              Why Modern Automotive Electronics Demands High-Precision Testing Protocols
            </h2>
            <div className="w-16 h-1 bg-brand-accent"></div>
            
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              Modern vehicles are essentially rolling computer networks communicating across high-speed Controller Area Network (CAN-bus) systems. When a system drops offline or a control harness degrades, standard grease mechanics often try to guess, substituting unrelated alternators or control chips at severe financial risk to the customer.
            </p>
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              At Bryn Auto, our dedicated electricians perform strict logic tests on standard looms. We isolate circuit resistance parameters, map wire pathways to factory service specs, and repair the actual localized defect rather than forcing you to purchase complete wiring harness systems. This is the hallmark of genuine engineering proficiency.
            </p>
          </div>

        </div>
      </section>

      {/* CORE TOPICS DETAILED GRID */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block mb-2">
              The Scope Sheet
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-primary tracking-tight">
              Comprehensive Auto-Electrical Capabilities
            </h2>
            <p className="mt-4 text-brand-text text-sm">
              We provide professional engineering intervention across all nine core electrical sub-systems, engineered to withstand South Africa’s extreme thermal and vibration demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailsArray.map((detail, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-accent hover:shadow-md transition-all duration-300 relative"
                id={`electrical-group-card-${index}`}
              >
                <div className="space-y-4">
                  
                  {/* Icon Block */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-brand-primary p-2.5 text-white">
                      <ServiceIcon name={detail.iconName} className="w-5 h-5 text-brand-accent" />
                    </div>
                    <h3 className="font-display font-bold text-base text-brand-primary uppercase tracking-wide">
                      {detail.title}
                    </h3>
                  </div>

                  <p className="text-brand-text text-xs leading-relaxed font-sans">
                    {detail.description}
                  </p>

                </div>

                {/* Signs of Failure indicators */}
                <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 p-3">
                  <span className="block text-[10px] font-display font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-accent mr-1.5 rounded-none shrink-0" />
                    Common Symptoms Solved:
                  </span>
                  <div className="space-y-1">
                    {detail.symptoms.map((sym, i) => (
                      <span key={i} className="block text-[11px] text-brand-text font-sans font-medium flex items-center">
                        <span className="text-brand-accent mr-1.5 font-bold">»</span>
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WhatsApp booking link */}
                <div className="mt-4 pt-1 flex justify-end">
                  <a
                    href={`https://wa.me/27610450608?text=${encodeURIComponent(`Hi Bryn Auto, I would like to book the following auto-electrical service:\n- *${detail.title}*\n\nPlease assist with scheduling. Thanks!`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-[10px] font-bold font-display uppercase text-emerald-700 hover:text-emerald-800 hover:underline border border-dashed border-emerald-300 bg-emerald-50 px-3 py-1.5 tracking-wider w-full justify-center text-center mt-3"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WhatsApp Booking Inquiry</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DIRECT ASSISTANCE PANEL */}
      <section className="bg-brand-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Direct Diagnostics Booking
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-snug">
            Need an Electrical System Check?
          </h2>
          <p className="text-slate-300 text-sm max-w-3xl mx-auto font-sans leading-relaxed">
            From classic, standard vehicles needing full harnesses, to modern German computer systems requiring complete digital fault isolation—we have you covered. Schedule your checkout slot right away.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentPage(AppPage.BOOK_A_SERVICE)}
              id="electrical-cta-book-btn"
              className="btn-premium bg-brand-accent hover:bg-slate-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book Service Online
            </button>
            <a
              href={`tel:${rawPhone}`}
              id="electrical-cta-phone-btn"
              className="btn-premium bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-brand-accent" />
              <span>Call Hotline Support</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
