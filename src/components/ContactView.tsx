import React, { useState, useEffect } from 'react';
import { ContactFormSubmission } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Map,
  Compass
} from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('apex_contact_submissions');
    if (cached) {
      try {
        setSubmissions(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse submissions:", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.message) {
      alert("Please complete all required fields (*).");
      return;
    }

    setSending(true);
    setSuccess(null);
    setError(null);

    const payload = {
      type: 'contact',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Engineering Inquiry',
      message: formData.message
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        const newSubmission: ContactFormSubmission = {
          id: `MSG-${Math.floor(1000 + Math.random() * 9000)}-SA`,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Engineering Inquiry',
          message: formData.message,
          timestamp: new Date().toLocaleString('en-ZA', { hour12: false })
        };

        const updated = [newSubmission, ...submissions];
        setSubmissions(updated);
        localStorage.setItem('apex_contact_submissions', JSON.stringify(updated));

        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setSuccess(`Thank you, your message has been sent successfully to info@brynauto.co.za! We have recorded your submission under reference number ${newSubmission.id} and our Capital Park dispatchers are responding immediately.`);
      } else {
        throw new Error(resData.error || 'Server rejected the dispatch.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to dispatch email automatically. Please check your network or call us directly.');
    } finally {
      setSending(false);
    }
  };

  const formattedPhone = '+27 61 045 0608';
  const rawPhone = '+27610450608';
  const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=Hi,%20I%20have%20an%20automotive%20enquiry%20from%20your%20website.`;

  return (
    <div id="contact-view-container">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Get Connected
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Contact Our Dispatch Office
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Reach our Pretoria facility directly for instant diagnostic appointments, emergency alternator testing, or corporate commercial fleet tenders.
          </p>
        </div>
      </section>

      {/* CORE WORKSPACE */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMN 1: CORPORATE DETAIL DETAILS */}
            <div className="lg:col-span-5 space-y-8" id="contact-details-panel">
              
              <div className="bg-brand-primary text-white p-8 space-y-6">
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-display tracking-widest text-brand-accent font-black block">
                    Admissions Center
                  </span>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                    Bryn Auto Service Hub
                  </h3>
                  <div className="w-12 h-1 bg-brand-accent"></div>
                </div>

                <div className="space-y-4 text-xs font-sans text-slate-300">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-brand-accent mr-3 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">
                      <strong className="text-white block font-display">WORKSHOP FACILITY ADDRESS:</strong>
                      170 Myburgh St, Capital Park, Pretoria, 0084, South Africa
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-brand-accent mr-3 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block font-display">TELEPHONE SUPPORT LINE:</strong>
                      <a href={`tel:${rawPhone}`} id="tele-direct" className="text-white text-sm font-bold hover:text-brand-accent transition-colors block">
                        +27 61 045 0608
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-brand-accent mr-3 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block font-display">EMAIL DISPATCH SHEETS:</strong>
                      <a href="mailto:info@brynauto.co.za" className="text-slate-300 hover:text-white block font-sans">
                        info@brynauto.co.za
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp call to action */}
                <div className="pt-4 border-t border-slate-800">
                  <a 
                    href={whatsappUrl}
                    target="_blank" 
                    rel="noreferrer"
                    id="whatsapp-contact-link"
                    className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold uppercase tracking-wider py-3.5 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Contact Via WhatsApp Live</span>
                  </a>
                </div>

              </div>

              {/* SERVICE HOURS SHEET */}
              <div className="bg-white border border-slate-200 p-6 space-y-4">
                <span className="block font-display font-bold text-xs uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-100">
                  Admissions Hours Check
                </span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-100 font-medium">
                    <span>Monday - Friday</span>
                    <span className="font-bold text-brand-primary">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100 font-medium">
                    <span>Saturday Admissions</span>
                    <span className="font-bold text-brand-primary">08:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-400">Sundays & Public Holidays</span>
                    <span className="text-brand-accent">Closed</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-snug font-sans uppercase tracking-wider mt-3">
                  Vehicle drop-offs must terminate standard checkouts 30 minutes prior to closing intervals.
                </p>
              </div>

            </div>

            {/* COLUMN 2: SECURE INQUIRY FORM */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8" id="contact-form-block">
              
              <div className="space-y-2">
                <span className="block text-xs font-bold text-brand-accent uppercase tracking-widest font-display animate-fadeIn">
                  Communications Box
                </span>
                <h2 className="font-display font-bold text-2xl text-brand-primary">
                  Send A Message
                </h2>
                <div className="w-12 h-1 bg-brand-accent"></div>
              </div>

              {/* Success alert block */}
              {success && (
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 text-xs text-emerald-800 font-sans flex items-start space-x-2 animate-fadeIn" id="msg-success-alert">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{success}</span>
                </div>
              )}

              {/* Error alert block */}
              {error && (
                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 text-xs text-rose-800 font-sans flex items-start space-x-2 animate-fadeIn" id="msg-error-alert">
                  <span className="text-rose-600 shrink-0 font-bold text-base leading-none">⚠️</span>
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" id="web-contact-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sipho Ndlovu"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-850 text-xs px-4 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. user@domain.co.za"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-850 text-xs px-4 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +27 61 045 0608"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-850 text-xs px-4 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Inquiry Subject
                    </label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Fleet starter diagnostics quote"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-850 text-xs px-4 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                    Your Message Detail *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your automotive electronics concern or fleet requirements..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-850 text-xs px-4 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors h-36"
                    required
                  />
                </div>

                {/* Trigger */}
                <div>
                  <button
                    type="submit"
                    id="submit-contact-btn"
                    disabled={sending}
                    className={`btn-premium w-full text-center text-white font-bold px-6 py-4 text-xs uppercase tracking-widest transition-all inline-flex items-center justify-center space-x-2 cursor-pointer ${
                      sending ? 'bg-slate-400 cursor-not-allowed opacity-80' : 'bg-brand-primary hover:bg-slate-800'
                    }`}
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent shrink-0" />
                        <span>Dispatching Message Securely...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        <span>Submit Message Ledger</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* ARCHIVE OF RECENT USER SUBMISSIONS LOG (LOCAL DEMODULATION) */}
              {submissions.length > 0 && (
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <span className="block font-display font-bold text-xs uppercase tracking-widest text-slate-400">
                    Your Message Logs ({submissions.length})
                  </span>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {submissions.map((msg) => (
                      <div key={msg.id} className="p-3 bg-slate-50 border border-slate-200 text-xs text-brand-text font-sans">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-brand-primary">{msg.fullName} ({msg.id})</span>
                          <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>
                        <p className="font-semibold text-slate-600 mb-1">Subject: {msg.subject}</p>
                        <p className="text-slate-500 italic">"{msg.message}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* GOOGLE MAPS SECTION (SIMULATED HIGH-CONTRAST VECTOR INTERACTIVE MAP) */}
          <div className="mt-16 border border-slate-200 bg-white p-6 sm:p-10 space-y-6" id="google-maps-mock-section">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <span className="inline-flex items-center text-xs font-bold text-brand-accent uppercase tracking-widest font-display">
                  <Compass className="w-4 h-4 mr-1 text-brand-accent" />
                  Satellite Grid Location
                </span>
                <h3 className="font-display font-bold text-lg text-brand-primary">
                  Capital Park Workshop Map Pin
                </h3>
              </div>
              <div>
                <a 
                  href="https://maps.google.com/?q=170+Myburgh+St,+Capital+Park,+Pretoria,+0084"
                  target="_blank"
                  rel="noreferrer"
                  id="google-maps-directions-link"
                  className="btn-premium inline-flex items-center space-x-2 bg-slate-100 hover:bg-brand-primary text-brand-primary hover:text-white px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all"
                >
                  <span>Google Maps SLA Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Simulated interactive map grid container */}
            <div className="bg-slate-900 h-96 relative flex items-center justify-center overflow-hidden border border-slate-800" id="simulated-map-block">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              {/* Fake abstract road grids for Capital Park layout */}
              <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="120" x2="2000" y2="120" stroke="#FFFFFF" strokeWidth="12" />
                <line x1="0" y1="280" x2="2000" y2="280" stroke="#FFFFFF" strokeWidth="16" />
                <line x1="280" y1="0" x2="280" y2="1000" stroke="#FFFFFF" strokeWidth="10" />
                <line x1="720" y1="0" x2="720" y2="1000" stroke="#FFFFFF" strokeWidth="20" />
                <circle cx="720" cy="280" r="45" fill="none" stroke="#FFFFFF" strokeWidth="6" />
              </svg>

              {/* Dynamic labels */}
              <span className="absolute top-18 left-8 text-[11px] font-mono text-slate-500 font-bold tracking-wide uppercase">Myburgh St</span>
              <span className="absolute bottom-20 right-12 text-[11px] font-mono text-slate-500 font-bold tracking-wide uppercase">Steve Biko Rd</span>

              {/* Pinpoint Indicator */}
              <div className="relative z-10 text-center animate-bounce">
                <div className="bg-brand-accent p-3.5 shadow-2xl relative inline-block">
                  <MapPin className="w-8 h-8 text-white" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white border-2 border-brand-accent rounded-full animate-ping"></span>
                </div>
                <div className="bg-brand-primary border-t-2 border-brand-accent shadow-xl p-4.5 mt-3 max-w-xs text-left text-white">
                  <span className="block font-display font-black text-xs text-brand-accent tracking-widest mb-1 uppercase">BRYN AUTO HUB</span>
                  <span className="block text-[11px] text-slate-300 leading-tight">170 Myburgh St, Capital Park, 0084</span>
                  <span className="block text-[10px] text-slate-400 mt-2 font-mono uppercase font-bold text-right">Coord: 25.7265° S, 28.1945° E</span>
                </div>
              </div>

              {/* Surrounding Landmark Indicators */}
              <div className="absolute top-12 right-24 bg-slate-850 p-2 text-[9px] text-slate-400 border border-slate-700">Capital Park Primary</div>
              <div className="absolute bottom-16 left-20 bg-slate-850 p-2 text-[9px] text-slate-400 border border-slate-700">Apies River Reserve</div>

              <div className="absolute bottom-4 left-4 bg-slate-950 p-3 text-[10px] text-slate-400 font-sans uppercase">
                ⚙ Capital Park Grid - Real-time Navigation Simulated
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
