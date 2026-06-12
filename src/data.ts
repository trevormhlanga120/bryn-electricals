import { ServiceItem, AutoElectricalSystem, GalleryItem, Testimonial, FaqItem } from './types';

// Import image assets as ES Modules to let Vite bundle and hash them safely for production builds (Vercel, etc.)
import heroImg from './assets/images/black_techs_hero_1781286577246.jpg';
import heroBgImg from './assets/images/workshop_hero_bg_1781288479581.jpg';
import diagnosticsImg from './assets/images/black_diagnostic_tech_1781285993011.jpg';
import electricalImg from './assets/images/black_wiring_tech_1781286021003.jpg';
import carRadioImg from './assets/images/black_radio_tech_1781286033012.jpg';
import suspensionImg from './assets/images/black_suspension_tech_1781286007556.jpg';
import vehicleServiceImg from './assets/images/black_service_tech_1781286048235.jpg';
import startingRepairsImg from './assets/images/black_starting_tech_1781286594421.jpg';
import lightingRepairsImg from './assets/images/black_lighting_tech_1781286610281.jpg';
import centralLockingAlarmImg from './assets/images/black_alarm_tech_1781286060407.jpg';
import mobileAssistantsImg from './assets/images/mobile_assistants_tech_1781297468085.jpg';

import siphoAvatar from './assets/images/sipho_avatar_1781286625592.jpg';
import sarahAvatar from './assets/images/sarah_avatar_1781286641053.jpg';
import devanAvatar from './assets/images/devan_avatar_1781286658545.jpg';

// Let's reference the high-quality generated assets and official public Unsplash images.
export const LOCAL_IMAGES = {
  hero: heroImg,
  heroBg: heroBgImg,
  diagnostics: diagnosticsImg,
  electrical: electricalImg,
  carRadio: carRadioImg,
  suspension: suspensionImg,
  vehicleService: vehicleServiceImg,
  startingRepairs: startingRepairsImg,
  lightingRepairs: lightingRepairsImg,
  centralLockingAlarm: centralLockingAlarmImg,
  mobileAssistants: mobileAssistantsImg
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'vehicle-servicing',
    name: 'Motor Vehicle Minor and Major Services',
    shortDesc: 'Comprehensive scheduled maintenance to maintain factory performance, maximize reliability, and ensure long-term engine health.',
    description: 'We perform complete manufacturer-approved minor and major services for petrol, diesel, and hybrid engines. Our workshop employs professional technicians utilizing top-tier lubricants, high-grade filters, and specialized multi-point safety verification protocols.',
    iconName: 'Wrench',
    benefits: [
      'Protects and extends the running life of your engine',
      'Keeps your digital manufacturer service logbook fully up-to-date',
      'Minimizes overall fuel consumption through pristine spark plugs and air filters',
      'Identifies safety wear early before it turns into a major cost on the road'
    ],
    problemsSolved: [
      'Sluggish engine acceleration and high fuel consumption',
      'Engine ticking or knocking sounds from old, degraded engine oil',
      'Poor cabin air filtration and dark or dusty exhaust discharge',
      'Neglected scheduled service intervals risking mechanical failure'
    ],
    ctaText: 'Schedule Routine Service',
    relatedServiceIds: ['diagnostics', 'suspension-repairs'],
    image: LOCAL_IMAGES.vehicleService
  },
  {
    id: 'diagnostics',
    name: 'Car Diagnostics',
    shortDesc: 'Advanced electronic computer scan diagnostics for engine, transmission, body, and chassis computer system fault retrieval.',
    description: 'Modern luxury and utility vehicles run on highly integrated on-board computer networks. We connect industry-standard, professional-grade diagnostic systems directly to your vehicle to download live engine parameters, parse error codes (DTCs), and run individual electrical component tests.',
    iconName: 'Cpu',
    benefits: [
      'Pinpoint active faults in seconds rather than replacing unnecessary components',
      'Real-time tracking of fuel pressure, oxygen sensors, and exhaust temperatures',
      'Reset service indicators and clear historic trouble codes after repair completion',
      'Provides an official printed fault summary report before and after repair'
    ],
    problemsSolved: [
      'Active engine check lights or malfunction indicator lamps toggled on dashboard',
      'Intermittent engine stalling, misfiring, or unpredictable transmission shifting',
      'Hidden failures that do not show physical symptoms but reduce overall engine life',
      'Anti-lock braking system (ABS) or traction control (TC) warning indicators active'
    ],
    ctaText: 'Run Diagnostic Scan',
    relatedServiceIds: ['starting-system', 'charging-system'],
    image: LOCAL_IMAGES.diagnostics
  },
  {
    id: 'starting-system',
    name: 'Motor Vehicle Starting System Repairs',
    shortDesc: 'Starter motor bench testing, carbon brush replacement, solenoid repair, and complete unit installation.',
    description: 'When your vehicle refuses to crank, our technicians conduct physical and electronic tests to determine starter system issues. We repair starter solenoid coils, replace worn starter carbon brushes, clean starter gears, or install complete high-torque replacement units.',
    iconName: 'Gauge',
    benefits: [
      'Reliable, instant engine startup under all weather conditions',
      'Replacement of single internal contactors to save on buying whole complete starters',
      'Optimal current delivery matching original manufacturing specifications',
      'Thorough starter bench-testing verification prior to installation'
    ],
    problemsSolved: [
      'Single click sound or grinding metallic mechanical screeches when turning the key',
      'The engine cranks extremely slowly, especially during cold winter mornings',
      'Starting unit operates but fails to engage or spin the car fly-wheel',
      'Starter remaining engaged or spinning after the vehicle engine has booted up'
    ],
    ctaText: 'Solve Starting Issue',
    relatedServiceIds: ['charging-system', 'vehicle-rewiring'],
    image: LOCAL_IMAGES.startingRepairs
  },
  {
    id: 'charging-system',
    name: 'Motor Vehicle Charging System Repairs',
    shortDesc: 'Alternator current output testing, voltage regulator replacement, drive belt adjustment, and battery maintenance.',
    description: 'Your car battery starts the engine, but the alternator maintains the charging system. We measure amp output, service charging voltage regulators, repair slipping drive belts, and replace worn alternators to guarantee your automotive control modules always receive correct power.',
    iconName: 'Zap',
    benefits: [
      'Keeps your car battery perfectly charged and healthy',
      'Prevents sudden breakdowns from loss of electric supply on long-distance trips',
      'Ensures correct electrical current to modern computerized dashboard displays',
      'Improves life-span of headlamps and complex sensor computers'
    ],
    problemsSolved: [
      'Automotive battery warning light glowing constantly on the digital dashboard',
      'Vehicle headlights dimming or flickering significantly when accelerating',
      'Repeatedly dead car batteries needing jump-starts despite being brand new',
      'Squealing noises under the car hood from worn alternator belts or tensioners'
    ],
    ctaText: 'Test Charging System',
    relatedServiceIds: ['starting-system', 'vehicle-rewiring'],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lighting-repairs',
    name: 'Motor Vehicle Lighting System Repairs',
    shortDesc: 'Headlight alignment, Xenon/LED bulb conversion, taillight grounding faults, and electronic light control modules.',
    description: 'Optimal road visibility is non-negotiable for safety. We troubleshoot dark taillights, ground faults, non-functional high-beams, and failed signal components. We source and program advanced headlight controllers, convert old yellow headlights to clean LED, and realign projectors.',
    iconName: 'Flame',
    benefits: [
      'Maximum visibility of road hazards and pedestrians during night driving',
      'Accurate high-beam targeting preventing blinding of oncoming vehicle drivers',
      'Prevents costly traffic tickets for burned-out bulbs or broken indicators',
      'Clean modern vehicle look with crisp, energy-efficient modern white illumination'
    ],
    problemsSolved: [
      'Flickering xenon projectors or half-lit taillight units',
      'One headlight acting dim due to high-resistance corrosion on wiring terminals',
      'Turn signal indicators flashing at an abnormally high frequency (hyper-flashing)',
      'Lighting modules shutting off intermittently due to circuit board water damage'
    ],
    ctaText: 'Repair Lighting System',
    relatedServiceIds: ['vehicle-rewiring', 'central-locking-alarm'],
    image: LOCAL_IMAGES.lightingRepairs
  },
  {
    id: 'vehicle-rewiring',
    name: 'Vehicle Rewiring',
    shortDesc: 'High-precision harness repair, fuse box restoration, parasitic draw detection, and customized engine rewiring.',
    description: 'Corroded looms, rodents biting wires, or bad previous installations cause auto-electrical nightmares. Our master electricians manually strip, map, solder, and insulate intricate wire bundles. We locate tiny parasitic battery drains and restore original factory wiring pathways.',
    iconName: 'Shuffle',
    benefits: [
      'Eliminates mysterious electrical bugs that occur when moisture is present',
      'Clean, fire-safe wire routing sleeved with military-spec shrink tubing',
      'Prevents overnight battery discharge using advanced parasitic load tracing',
      'Ensures correct signal voltage is transmitted across sensor lines'
    ],
    problemsSolved: [
      'Electrical short circuits blowing the same fuse repeatedly',
      'Overnight battery drainage where the car battery dies within 12 hours of parking',
      'Dashboard screens glitching or turning off because of loose ground cables',
      'Engine wiring looms melting or cracking due to exposure to direct engine heat'
    ],
    ctaText: 'Book Electrical Inspection',
    relatedServiceIds: ['diagnostics', 'starting-system'],
    image: LOCAL_IMAGES.electrical
  },
  {
    id: 'central-locking-alarm',
    name: 'Central Locking and Alarm Installation',
    shortDesc: 'High-security vehicle alarms, keyless locking integrations, immobilizers, and central lock actuator swaps.',
    description: 'Protect your valuable automotive asset with our professional security services. We install and service digital alarm setups, fit master central locking systems, wire security immobilizers, sync new fobs, and replace broken electric latch door actuators.',
    iconName: 'Shield',
    benefits: [
      'Immediate electronic protection against vehicle theft, glass breakages, and entry',
      'Convenient keyless door lock/unlock control with confirmation chirp or indicator flashing',
      'Discounts on automotive insurance premiums in South Africa for verified alarms',
      'High-grade lock actuators and rugged, tamper-resistant under-bonnet sirens'
    ],
    problemsSolved: [
      'One or more vehicle doors refusing to lock or latch when pressing the remote key',
      'Alarm sounding sporadically for no reason, disturbing your peace',
      'Stolen keys or broken fobs requiring total security override or reprogram',
      'Lack of remote locking forcing manual key use on every individual entryway'
    ],
    ctaText: 'Secure Your Vehicle',
    relatedServiceIds: ['car-radio', 'vehicle-rewiring'],
    image: LOCAL_IMAGES.centralLockingAlarm
  },
  {
    id: 'car-radio',
    name: 'Car Radio Installation',
    shortDesc: 'Android infotainment retrofit, steering wheel control sync, backup cameras, and professional speaker setups.',
    description: 'Upgrade your vehicle into a modern media hub. We supply and install premium single-DIN and double-DIN Android infotainment displays, wire high-definition backup cameras, set up multi-way car stereos, and calibrate sound profiles without damaging dashboard layouts.',
    iconName: 'Radio',
    benefits: [
      'Seamless Apple CarPlay and Android Auto for hands-free navigation and calling',
      'Integration of factory steering wheel control buttons for premium ease of use',
      'High-res reverse backup camera overlays displaying clear guiding lines',
      'Clean audio acoustics with professional noise dampening and amplifier tuning'
    ],
    problemsSolved: [
      'Outdated media console lacking Bluetooth connectivity, GPS, or modern audio inputs',
      'Static noise coming from vehicle doors due to blown or disintegrating audio paper cones',
      'Reverse backing accidents due to virtual blindspots behind your tailgate',
      'Messy auxiliary cords cluttering your clean shifter console'
    ],
    ctaText: 'Upgrade Infotainment',
    relatedServiceIds: ['central-locking-alarm', 'vehicle-rewiring'],
    image: LOCAL_IMAGES.carRadio
  },
  {
    id: 'suspension-repairs',
    name: 'Suspension Repairs',
    shortDesc: 'Premium gas shock replacement, wheel hub bearings, steering control arms, bushes, and link rods.',
    description: 'A smooth ride is essential for both comfort and tire wear. We diagnose and repair steering knocks, replace worn rubber control arm bushes, mount new gas-charged shock absorbers, swap bad ball joints, and secure steering outer tie-rods using premium-grade spares.',
    iconName: 'Settings',
    benefits: [
      'Stable road holding and short braking response distances',
      'Eliminates irregular and rapid wear of expensive tyres',
      'Luxurious, whisper-quiet ride over harsh bumps, gravel, and speed humps',
      'Accurate vehicle alignment preventing steering wheel pull to the left or right'
    ],
    problemsSolved: [
      'Excessive body roll when cornering or nose-diving deeply during active braking',
      'Squeaking, clunking, or rattling sounds coming from the front wheels over rough roads',
      'Uncontrolled vehicle bouncing or swaying long after hitting bumps',
      'Loose steering feel making highway driving feel unsafe'
    ],
    ctaText: 'Restore Smooth Handling',
    relatedServiceIds: ['vehicle-servicing', 'diagnostics'],
    image: LOCAL_IMAGES.suspension
  },
  {
    id: 'mobile-assistants',
    name: 'Mobile Assistants & Roadside Dispatch',
    shortDesc: 'Emergency roadside automotive diagnostic sweeps, instant auxiliary starting help, and on-site wiring bypass repairs.',
    description: 'When sudden vehicle failure stalls your travel or fleet operations, our dedicated Mobile Assistants dispatch unit brings advanced workshop diagnostics and high-performance repair gear directly to your coordinate. We execute certified roadside sweeps, emergency power-pack jumps, battery replacements, and critical wire repairs to get you moving.',
    iconName: 'Truck',
    benefits: [
      'Saves high towing expenses by resolving many problems on-site',
      'Direct on-demand real-time roadside assistance dispatch',
      'Comprehensive computer ECU scanning at your exact coordinate',
      'Fast delivery and professional fitting of fresh backup batteries'
    ],
    problemsSolved: [
      'Unexpected electrical blackouts or sudden engine starting failures on the road',
      'Dead batteries, faulty starter solenoids, or alternator failures mid-trip',
      'Immobiliser lockouts or keys locked inside requiring non-destructive entry options',
      'Stranded in high-risk zones needing rapid expert automotive technicians'
    ],
    ctaText: 'Dispatch Mobile Assistant',
    relatedServiceIds: ['diagnostics', 'starting-system', 'vehicle-rewiring'],
    image: LOCAL_IMAGES.mobileAssistants
  }
];

export const ELECTRICAL_SYSTEMS: AutoElectricalSystem[] = [
  {
    id: 'battery-systems',
    title: 'Battery System Testing & Care',
    description: 'The heartbeat of your vehicles electrical ecosystem. We test state-of-health (SOH), check cold cranking amps (CCA), repair loose battery terminals, and source premium heavy-duty replacement batteries.',
    items: ['State of Health electronic scan', 'Parasitic load test on dormant vehicles', 'Terminal cleanup and anti-corrosion coating', 'Premium battery brand installations'],
    iconName: 'Battery',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'alternators',
    title: 'Alternators & Charging Systems',
    description: 'Without a functional alternator, your vehicle will die mid-route. Our shop tests output, repairs individual rectifiers, swaps out worn-out brushes, and builds custom charging solutions for auxiliary setups.',
    items: ['Alternator brush & regulator replacement', 'Pulley and drive belt tension alignment', 'Diodes and rectifier testing', 'Dual battery systems for off-roaders'],
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starters',
    title: 'Starter Motor Maintenance',
    description: 'When starting issues strike, our starter experts perform precision repair on high-amp solenoids, turn down armatures, replace bendix drives, and supply fast, heavy-duty replacement starters.',
    items: ['Solenoid contactor service', 'Bendix drive swap', 'Brushes and carbon gear rebuild', 'New high-torque starters'],
    iconName: 'Gauge',
    image: LOCAL_IMAGES.startingRepairs
  },
  {
    id: 'lighting',
    title: 'Advanced Lighting Systems',
    description: 'Specialists in finding open or shorted wiring circuits inside complex lighting harnesses, headlight replacement, high-power led conversions, and trailer socket rewires.',
    items: ['LED headlight conversions', 'Trailer plug rewiring & relays', 'Indicator relay mapping', 'Control module troubleshooting'],
    iconName: 'Flame',
    image: LOCAL_IMAGES.lightingRepairs
  },
  {
    id: 'rewiring',
    title: 'Full Vehicle Rewiring & Looms',
    description: 'Our pride. Sourcing or customizing looms for complex modern vehicles or completely stripping old classic cars to wire highly safe, modern, labeled wiring configurations.',
    items: ['Custom fuse box layout design', 'Wiring harness heat protection', 'Restored classic wire looms', 'Engine bay harness repairs'],
    iconName: 'Shuffle',
    image: LOCAL_IMAGES.electrical
  },
  {
    id: 'electronic-installs',
    title: 'Electronic Accessories & Security',
    description: 'Professional integration of premium digital accessories: alarms, central locking mechanisms, GPS trackers, reverse tracking systems, and high fidelity audio structures.',
    items: ['High-decibel digital alarm integrations', 'GPS fleet trackers', 'Reverse cameras & proximity park sensors', 'Android smart systems retrofits'],
    iconName: 'Shield',
    image: LOCAL_IMAGES.centralLockingAlarm
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'High-Precision Diagnostics',
    category: 'DIAGNOSTICS',
    image: LOCAL_IMAGES.diagnostics,
    description: 'Using professional digital scan tools to clear error codes and evaluate live engine data on an SUV.'
  },
  {
    id: 'g2',
    title: 'Brake Disc and Shock Replacement',
    category: 'SUSPENSION',
    image: LOCAL_IMAGES.suspension,
    description: 'Removing worn gas shocks and installing premium gas-charged struts on a fleet utility vehicle.'
  },
  {
    id: 'g3',
    title: 'Engine Bay Wiring Restoration',
    category: 'ELECTRICAL',
    image: LOCAL_IMAGES.electrical,
    description: 'Testing wire loop continuity and soldering corroded junctions inside a primary vehicle engine harness.'
  },
  {
    id: 'g4',
    title: 'Advanced Alarm Integration',
    category: 'ALARM',
    image: LOCAL_IMAGES.centralLockingAlarm,
    description: 'Installing remote central locking solenoids and securing key fobs for custom vehicle anti-hijack defense.'
  },
  {
    id: 'g5',
    title: 'Android Headunit Retrofit',
    category: 'RADIO',
    image: LOCAL_IMAGES.carRadio,
    description: 'Fitting double-DIN Android infotainment center, fully integrated with steering control wires and active maps.'
  },
  {
    id: 'g6',
    title: 'Multi-Point Scheduled Service',
    category: 'SERVICING',
    image: LOCAL_IMAGES.vehicleService,
    description: 'Conducting full fluid checks, oil filter changes, and spark plug swaps during major vehicle service.'
  }
];

export const VEHICLE_BRANDS = [
  { name: 'Toyota', logo: 'https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&w=200&q=80' }, // generic placeholder or simple brand text
  { name: 'Volkswagen', logo: '' },
  { name: 'Ford', logo: '' },
  { name: 'Mercedes-Benz', logo: '' },
  { name: 'BMW', logo: '' },
  { name: 'Hyundai', logo: '' },
  { name: 'Nissan', logo: '' },
  { name: 'Isuzu', logo: '' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sipho Ndlovu',
    role: 'Logistics Manager',
    company: 'Ndlovu Fleet Solutions',
    rating: 5,
    date: '2026-05-15',
    comment: 'Managing a fleet of 20 delivery vehicles in Johannesburg means we cannot tolerate unscheduled downtime. Their diagnostics is incredibly fast and their physical starting system repairs are absolute class. Turnaround is rapid, billing is clear, and work is rock solid.',
    avatar: siphoAvatar
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Private SUV Client',
    company: '',
    rating: 5,
    date: '2026-04-22',
    comment: 'After being quoted a fortune for electrical repairs by my dealership due to standard wiring degradation, I visited their workshop. They identified the exact ground-terminal fault in 30 minutes, repaired the singular wire loom instead of replacing the entire loom, and saved me thousands. Extremely honest team!',
    avatar: sarahAvatar
  },
  {
    id: 't3',
    name: 'Devan Naidoo',
    role: 'Classic Car Collector',
    company: 'Retro Garage SA',
    rating: 5,
    date: '2026-05-29',
    comment: 'Completely rewired my classic 1984 Alfa Romeo GTV. The team mapped out every circuit, laid down premium flame-retardant sleeving, and modernised the fuse architecture. Simply stunning workmanship. Their attention to detail on electronic diagnostics is unmatched in South Africa.',
    avatar: devanAvatar
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq1',
    question: 'How often should my vehicle receive a Scheduled Service?',
    answer: 'Most modern vehicles require routine minor servicing every 10,000 to 15,000 kilometers, or once every 12 months, whichever comes first. Major services involving deep spark plug swaps, transmission fluid, cabin/fuel filter replacements occur every 30,000 to 45,000 kilometers. Refer to your vehicle logbook or let us inspect your fluid level levels.',
    category: 'Servicing'
  },
  {
    id: 'faq2',
    question: 'What is the diagnostic scanning fee, and what do I receive?',
    answer: 'Our professional diagnostic fee includes a complete ECU (Engine Control Unit) scan using high-end diagnostics, extraction of all stored trouble codes, real-time sensor reading analysis, and a comprehensive digital report. We explain each issue in human terms before proposing any repairs.',
    category: 'Diagnostics'
  },
  {
    id: 'faq3',
    question: 'My battery warning light is glowing. Can I still drive?',
    answer: 'An active battery light indicates your alternator is NOT charging the system, meaning your vehicle is running purely on stored battery power and will shut down within minutes as soon as the charge runs dry. We advise finding a safe spot to park immediately and contacting us to schedule a replacement alternator brush, regulator, or full unit test.',
    category: 'Electrical'
  },
  {
    id: 'faq4',
    question: 'Do you offer mobile roadside auto-electrical services?',
    answer: 'To ensure precision, we carry out all complex fault finding, rewires, and installations within our modern corporate workshop facility. However, we offer starter-motor, battery, and alternator testing that is fully set up with premium test instrumentation.',
    category: 'Operational'
  },
  {
    id: 'faq5',
    question: 'Do your installations affect my manufacturer vehicle warranty?',
    answer: 'No. In South Africa, the Competitions Commission "Right to Repair" guidelines allow vehicle owners to use independent accredited service centers for routine servicing and repairs. Furthermore, all our security and car radio installations utilize precise, plug-and-play wiring harnesses matching factory layouts to avoid cutting native electrical cables.',
    category: 'Warranty'
  }
];
