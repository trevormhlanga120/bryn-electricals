import React, { useState } from 'react';
import { AppPage } from '../types';
import { 
  Wrench, 
  Cpu, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';

interface DiagnosticHelperProps {
  setCurrentPage: (page: AppPage) => void;
  setSelectedServiceId: (id: string | null) => void;
}

// Technical diagnostics records 
const DTC_DATABASE = [
  {
    code: 'P0251',
    system: 'Fuel Injection System',
    shortDesc: 'Injection Pump Metering Control Malfunction',
    symptoms: 'Common on Toyota Quantum & Hilux 2.5/3.0 D-4D models. Intermittent power loss under heavy load, rough idling, or engine cut-off.',
    probableCauses: [
      'Suction Control Valve (SCV) mechanical wear or sticking',
      'Common-rail solenoid wiring harness degradation',
      'Diesel fuel filter clogging causing flow restriction'
    ],
    recommendedService: 'diagnostics',
    serviceTitle: 'Car Diagnostics & Common-Rail Diesel Inspections'
  },
  {
    code: 'P0300',
    system: 'Ignition & Combustion',
    shortDesc: 'Random / Multiple Cylinder Misfire Detected',
    symptoms: 'Aggressive engine vibration, flashing Check Engine Light, high unburnt fuel smell, and poor fuel efficiency.',
    probableCauses: [
      'Aged or carbon-coated spark plugs (Gauteng urban driving)',
      'Ignition coil pack boot insulation failure grounding out on engine block',
      'Fuel injector blockage from fuel system impurities'
    ],
    recommendedService: 'vehicle-servicing',
    serviceTitle: 'Motor Vehicle Minor and Major Services'
  },
  {
    code: 'P0171',
    system: 'Air-Fuel Induction',
    shortDesc: 'System Too Lean (Bank 1 Sensor Output)',
    symptoms: 'Engine hesitation during acceleration, hunting idle speeds, and high idle RPM.',
    probableCauses: [
      'Unmetered vacuum air leaks behind mass airflow (MAF) sensors',
      'Clogged or failing electronic fuel pump failing to hold pressure',
      'Dirty throttle valve or faulty oxygen sensor line feedback'
    ],
    recommendedService: 'diagnostics',
    serviceTitle: 'Car Diagnostics & Intake Smoke Testing'
  },
  {
    code: 'U0100',
    system: 'CAN-Bus Communication Network',
    shortDesc: 'Lost Communication with Engine Control Module (ECM)',
    symptoms: 'No-crank state, dashboard electronics light up but dials do not move, gears display error dashes.',
    probableCauses: [
      'Severe chassis battery terminal oxidation or loose main earth cable',
      'Intermittent failure in ignition control relay contacts',
      'Rodents nesting behind battery tray chewing through CAN lines'
    ],
    recommendedService: 'vehicle-rewiring',
    serviceTitle: 'Vehicle Electronic Rewiring & Circuit Mapping'
  },
  {
    code: 'C0020',
    system: 'Brake System Control (ABS)',
    shortDesc: 'ABS Pump Motor Control Circuit Failure',
    symptoms: 'ABS dashboard light active, stability control deactivated warning.',
    probableCauses: [
      'ABS controller pump relay terminals corroded',
      'Fused circuit failure inside primary under-bonnet power block',
      'ABS wheel speed sensor line severance due to suspension bush play'
    ],
    recommendedService: 'suspension-repairs',
    serviceTitle: 'Suspension Repairs & ABS Hub Inspections'
  }
];

const SYMPTOM_DATABASE = [
  {
    id: 's1',
    title: 'Engine clicks once but will not crank',
    symptomCategory: 'Starting System',
    analysis: 'Classic electrical current issue. The starting relay tries to deploy the bendix gear, but the solenoid contacts cannot supply the high amperage needed to spin the starter motor.',
    checkPoints: [
      'Measure battery voltage under load (must remain above 10.5V during crank)',
      'Inspect high-current starting contacts for carbon scaling',
      'Verify earth strap from engine block to chassis has zero ohmic resistance'
    ],
    targetServiceId: 'starting-system',
    serviceTitle: 'Motor Vehicle Starting System Repairs'
  },
  {
    id: 's2',
    title: 'Overnight battery drain (Dead by morning)',
    symptomCategory: 'Vehicle Rewiring',
    analysis: 'A passive component continues pulling electrical current from the battery after ignition is keyed off. Standard allowance is under 50mA.',
    checkPoints: [
      'Check bad grounding or accessory feeds in aftermarket GPS tracking gear',
      'Inspect boot/glovebox lock switches remaining mechanically stuck in closed position',
      'Conduct digital multimeter fuse-box voltage-drop diagnostics across terminals'
    ],
    targetServiceId: 'vehicle-rewiring',
    serviceTitle: 'Vehicle Rewiring & Parasitic Draw Detection'
  },
  {
    id: 's3',
    title: 'Dashboard battery warning light active',
    symptomCategory: 'Charging System',
    analysis: 'Your battery is no longer being actively charged. The car is running off stored lead-acid energy and will stall within short mileage.',
    checkPoints: [
      'Test alternator regulator brush wear limits',
      'Look for alternator drive belt slack or mechanical slippage',
      'Verify primary positive feed cable from alternator rear terminal to battery fuse link'
    ],
    targetServiceId: 'charging-system',
    serviceTitle: 'Motor Vehicle Charging System Repairs'
  },
  {
    id: 's4',
    title: 'EPC light on with loss of power (Limp Mode)',
    symptomCategory: 'Engine Diagnostics',
    analysis: 'The primary Engine Control Unit (ECU) has detected a critical signal conflict inside the drive-by-wire system, restricting performance to protect integrity.',
    checkPoints: [
      'Perform dual OBD-II diagnostic sensor scan of throttle potentiometer signals',
      'Inspect wire terminal pins for moisture inside the throttle plug loom',
      'Test accelerator pedal sensor feedback traces'
    ],
    targetServiceId: 'diagnostics',
    serviceTitle: 'High-End OBD-II Scan Diagnostics'
  },
  {
    id: 's5',
    title: 'Aftermarket radio steering controls unresponsive',
    symptomCategory: 'Electronics Retrofit',
    analysis: 'The steering wheel control (SWC) analogue voltage lines are not matched or programmed inside your Android headunit configuration menu.',
    checkPoints: [
      'Trace KEY1 & KEY2 copper cables between steering loom and car stereo harness',
      'Install resistor interface or program analogue voltage thresholds in system menu',
      'Ensure high-current central grounding lines are safe and isolated'
    ],
    targetServiceId: 'car-radio',
    serviceTitle: 'Car Radio and Electronics Infotainment Retrofits'
  }
];

export default function DiagnosticHelper({ setCurrentPage, setSelectedServiceId }: DiagnosticHelperProps) {
  const [activeTab, setActiveTab] = useState<'dtc' | 'symptoms'>('symptoms');
  const [typedCode, setTypedCode] = useState('');
  const [selectedDtc, setSelectedDtc] = useState<typeof DTC_DATABASE[0] | null>(DTC_DATABASE[0]);
  const [selectedSymptom, setSelectedSymptom] = useState<typeof SYMPTOM_DATABASE[0] | null>(SYMPTOM_DATABASE[0]);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Handle DTC Code manual typing search
  const handleDtcSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = typedCode.trim().toUpperCase();
    if (!cleanQuery) return;

    const matched = DTC_DATABASE.find(item => item.code === cleanQuery);
    if (matched) {
      setSelectedDtc(matched);
      setSearchFeedback(null);
    } else {
      setSearchFeedback(`Code "${cleanQuery}" is not in our immediate quick-reference. However, our Pretoria West workshop diagnoses ALL OBD-II codes (including manufacturer-specific codes) using Bosch KTS and Launch diagnostic equipment.`);
    }
  };

  const selectPresetDtc = (codeStr: string) => {
    const matched = DTC_DATABASE.find(item => item.code === codeStr);
    if (matched) {
      setSelectedDtc(matched);
      setTypedCode(codeStr);
      setSearchFeedback(null);
    }
  };

  const handleBookingRedirect = (serviceId: string, preselectLabel: string) => {
    localStorage.setItem('apex_preselected_service', preselectLabel);
    setSelectedServiceId(serviceId);
    setCurrentPage(AppPage.BOOK_A_SERVICE);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-white border-2 border-slate-200" id="diagnostic-utility-utility">
      
      {/* Container Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b-4 border-brand-accent flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-brand-accent uppercase tracking-widest font-display block">
            Pretoria facility technical tool
          </span>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white">
            OBD-II Fault & Symptom Diagnostics Guide
          </h3>
          <p className="text-slate-400 text-xs font-sans max-w-xl">
            A real technical troubleshooting lookup aligned to South African vehicle models. Identify primary electrical bottlenecks before booking.
          </p>
        </div>
        <div className="shrink-0 bg-slate-800 text-slate-300 text-[11px] font-mono uppercase px-3 py-1.5 border border-slate-700">
          📍 Right To Repair Approved
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: INTERACTIVE TABS & CONTROLS */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 space-y-6">
          
          {/* TAB TRIGGERS */}
          <div className="flex bg-slate-200 p-1" id="diag-tab-bar">
            <button
              onClick={() => {
                setActiveTab('symptoms');
                setSearchFeedback(null);
              }}
              className={`flex-1 text-center py-2 text-[11px] font-bold uppercase tracking-wider font-display transition-all ${
                activeTab === 'symptoms'
                  ? 'bg-brand-primary text-white'
                  : 'bg-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Common Symptoms
            </button>
            <button
              onClick={() => {
                setActiveTab('dtc');
                setSearchFeedback(null);
              }}
              className={`flex-1 text-center py-2 text-[11px] font-bold uppercase tracking-wider font-display transition-all ${
                activeTab === 'dtc'
                  ? 'bg-brand-primary text-white'
                  : 'bg-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              OBD-II Error Codes (DTC)
            </button>
          </div>

          {/* TAB A CONTENT: SYMPTOM MENU */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4" id="symptoms-control-panel">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
                Select Observed Failure
              </span>
              <div className="space-y-2">
                {SYMPTOM_DATABASE.map((sym) => (
                  <button
                    key={sym.id}
                    id={`symptom-btn-${sym.id}`}
                    onClick={() => setSelectedSymptom(sym)}
                    className={`w-full text-left px-4 py-3 border text-xs font-sans transition-all flex justify-between items-center ${
                      selectedSymptom?.id === sym.id
                        ? 'bg-white border-brand-accent text-brand-primary font-bold shadow-sm pl-6'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-350'
                    }`}
                  >
                    <span>{sym.title}</span>
                    <span className="text-[10px] font-display font-medium uppercase text-brand-accent bg-rose-50 px-2 py-0.5 border border-rose-200 shrink-0">
                      {sym.symptomCategory}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-4 italic">
                * If your car is completely dead or experiencing multi-relay ticks near Mitchell Street, use our phone dispatch to request vehicle towing.
              </p>
            </div>
          )}

          {/* TAB B CONTENT: OBD-II CODES ACCORDION */}
          {activeTab === 'dtc' && (
            <div className="space-y-4" id="dtc-control-panel">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
                Search Diagnostic Trouble Code
              </span>
              
              <form onSubmit={handleDtcSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={typedCode}
                    onChange={(e) => setTypedCode(e.target.value)}
                    placeholder="e.g., P0251"
                    maxLength={5}
                    className="w-full bg-white border border-slate-300 text-slate-800 text-xs pl-9 pr-3 py-2.5 font-mono uppercase focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 font-display hover:bg-slate-800 transition-colors"
                >
                  Verify
                </button>
              </form>

              {/* QUICK ACCORDION PRESETS */}
              <div className="space-y-2 pt-2">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest font-display">
                  Click Standard Engine Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {DTC_DATABASE.map((dtc) => (
                    <button
                      key={dtc.code}
                      id={`dtc-preset-btn-${dtc.code}`}
                      type="button"
                      onClick={() => selectPresetDtc(dtc.code)}
                      className={`px-3 py-1 text-xs font-mono font-bold transition-all border ${
                        selectedDtc?.code === dtc.code
                          ? 'bg-brand-accent text-white border-brand-accent'
                          : 'bg-white text-brand-primary border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {dtc.code}
                    </button>
                  ))}
                </div>
              </div>

              {searchFeedback && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-sans rounded-none leading-relaxed">
                  <p>{searchFeedback}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: REALISTIC ANALYSIS SHEET */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          
          {/* ANALYSIS BOARD SHEET */}
          <div className="space-y-5" id="diagnostic-results-box">
            
            {activeTab === 'symptoms' && selectedSymptom && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-accent tracking-wider uppercase font-display block">Symptom Diagnostic Verdict</span>
                    <h4 className="font-display font-extrabold text-base text-brand-primary leading-tight">
                      {selectedSymptom.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-white px-2 py-1 shrink-0 font-bold tracking-wide">
                    {selectedSymptom.symptomCategory}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display block">Technician Analysis Report:</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-4 border-l-2 border-slate-300">
                    {selectedSymptom.analysis}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display block">Workshop Diagnostic Protocol Checkpoints:</span>
                  <div className="space-y-1.5">
                    {selectedSymptom.checkPoints.map((pt, i) => (
                      <div key={i} className="flex items-start text-xs font-sans text-brand-text">
                        <span className="text-brand-accent mr-2 mt-0.5 text-[10px] font-bold font-mono">✓</span>
                        <p className="leading-normal">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Target Department: <strong className="text-brand-primary">{selectedSymptom.serviceTitle}</strong></span>
                  <span>Estimated Scan: <strong className="text-slate-800">15-30 Mins</strong></span>
                </div>
              </div>
            )}

            {activeTab === 'dtc' && selectedDtc && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-accent tracking-wider uppercase font-display block">OBD-II Register Match</span>
                    <h4 className="font-display font-extrabold text-base text-brand-primary leading-tight">
                      {selectedDtc.code} - {selectedDtc.shortDesc}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-white px-2 py-1 shrink-0 font-bold tracking-wide">
                    {selectedDtc.system}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display block">South African Vehicle Impact:</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-4 border-l-2 border-slate-300">
                    {selectedDtc.symptoms}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display block">Primary Root Causes / Components Affected:</span>
                  <div className="space-y-1.5">
                    {selectedDtc.probableCauses.map((cause, i) => (
                      <div key={i} className="flex items-start text-xs font-sans text-brand-text">
                        <span className="text-brand-accent mr-2 mt-0.5 text-[10px] font-bold font-mono">⚡</span>
                        <p className="leading-normal">{cause}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Primary Service Desk: <strong className="text-brand-primary">{selectedDtc.serviceTitle}</strong></span>
                  <span>Safety Status: <strong className="text-emerald-600 font-bold uppercase">Warranty Intact</strong></span>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM REDIRECT BOOKING CALL TO ACTION */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accreted Independent Quote</span>
              <p className="text-xs text-brand-text mt-0.5 font-sans leading-tight">
                Our technicians will run a manual line isolation confirmation on arrival at original RMI rates.
              </p>
            </div>
            
            {activeTab === 'symptoms' && selectedSymptom && (
              <button
                type="button"
                id="utility-book-sym"
                onClick={() => handleBookingRedirect(selectedSymptom.targetServiceId, selectedSymptom.serviceTitle)}
                className="btn-premium inline-flex items-center space-x-2 bg-brand-accent hover:bg-red-700 text-white px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap"
              >
                <span>Book This Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeTab === 'dtc' && selectedDtc && (
              <button
                type="button"
                id="utility-book-dtc"
                onClick={() => handleBookingRedirect(selectedDtc.recommendedService, selectedDtc.serviceTitle)}
                className="btn-premium inline-flex items-center space-x-2 bg-brand-accent hover:bg-red-700 text-white px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap"
              >
                <span>Book {selectedDtc.code} Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
