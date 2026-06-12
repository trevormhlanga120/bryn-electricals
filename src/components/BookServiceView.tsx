import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { SERVICES_DATA } from '../data';
import { 
  CalendarDays, 
  User, 
  Phone, 
  Mail, 
  Car, 
  Settings, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function BookServiceView() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicleMake: '',
    vehicleModel: '',
    serviceRequired: '',
    preferredDate: '',
    message: ''
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<Appointment | null>(null);

  const [activeStep, setActiveStep] = useState(1);

  // Load appointments from localStorage and check for preselected service
  useEffect(() => {
    const stored = localStorage.getItem('apex_service_appointments');
    if (stored) {
      try {
        setAppointments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse appointments:", e);
      }
    }

    const preselected = localStorage.getItem('apex_preselected_service');
    if (preselected) {
      setFormData(prev => ({ ...prev, serviceRequired: preselected }));
      localStorage.removeItem('apex_preselected_service'); // clear after reading
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileNext = () => {
    setErrorMessage(null);
    if (activeStep === 1) {
      if (!formData.fullName || !formData.phone || !formData.email) {
        setErrorMessage("Please complete all required fields (Name, Phone, Email) to proceed.");
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Vehicle make/model are optional but part of Step 2
      setActiveStep(3);
    } else if (activeStep === 3) {
      if (!formData.serviceRequired || !formData.preferredDate) {
        setErrorMessage("Please complete the required booking fields (Service, Date) to proceed.");
        return;
      }
      setActiveStep(4);
    }
  };

  const handleMobilePrev = () => {
    setErrorMessage(null);
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  const getWhatsAppHref = () => {
    const textMsg = `Hi Bryn Auto, I would like to book a service with the following specifications:\n\n` +
      `*Name:* ${formData.fullName || 'Not Specified'}\n` +
      `*Phone:* ${formData.phone || 'Not Specified'}\n` +
      `*Email:* ${formData.email || 'Not Specified'}\n` +
      `*Vehicle :* ${formData.vehicleMake || 'Not Specified'} ${formData.vehicleModel || 'Not Specified'}\n` +
      `*Service Required:* ${formData.serviceRequired || 'Not Specified'}\n` +
      `*Preferred Date:* ${formData.preferredDate || 'Not Specified'}\n` +
      `*Message/Symptoms:* ${formData.message || 'None'}\n\n` +
      `Please assist with scheduling slots. Thanks!`;
    return `https://wa.me/27610450608?text=${encodeURIComponent(textMsg)}`;
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.serviceRequired || !formData.preferredDate) {
      e.preventDefault();
      setErrorMessage("Please complete all required fields with asterisks (*) before continuing to WhatsApp.");
      return;
    }

    // Creating new appointment record
    const refCode = `APX-${Math.floor(1000 + Math.random() * 9000)}-GP`;
    const newAppointment: Appointment = {
      id: refCode,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      vehicleMake: formData.vehicleMake || 'Not Specified',
      vehicleModel: formData.vehicleModel || 'Not Specified',
      serviceRequired: formData.serviceRequired,
      preferredDate: formData.preferredDate,
      message: formData.message,
      bookingTime: new Date().toLocaleString('en-ZA', { hour12: false }),
      status: 'PENDING'
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('apex_service_appointments', JSON.stringify(updated));

    // Reset Form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      vehicleMake: '',
      vehicleModel: '',
      serviceRequired: '',
      preferredDate: '',
      message: ''
    });
    setActiveStep(1); // Reset back to Step 1 on success

    setSuccessMessage(`Appointment logged! Capturing metadata and dispatching direct to WhatsApp. Code Reference: ${refCode}.`);
    setActiveReceipt(newAppointment);

    // Auto-scroll to confirmation receipt
    setTimeout(() => {
      const receiptEl = document.getElementById('receipt-panel-block');
      if (receiptEl) {
        receiptEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const getEmailHref = () => {
    const subjectLine = `Bryn Auto Service Quote Booking Request - ${formData.fullName || 'New Request'}`;
    const mailBody = `Hi Bryn Auto Dispatch Office,\n\n` +
      `I would like to request a quotation and book an interactive appointment with the following details:\n\n` +
      `- Full Name: ${formData.fullName || 'Not Specified'}\n` +
      `- Phone Number: ${formData.phone || 'Not Specified'}\n` +
      `- Email Address: ${formData.email || 'Not Specified'}\n` +
      `- Vehicle: ${formData.vehicleMake || 'Not Specified'} ${formData.vehicleModel || 'Not Specified'}\n` +
      `- Service Category Name: ${formData.serviceRequired || 'Not Specified'}\n` +
      `- Pre-selected Admission Date: ${formData.preferredDate || 'Not Specified'}\n` +
      `- Symptoms / Notes: ${formData.message || 'None'}\n\n` +
      `Please reply with an itemised pricing quotation and slot validation code. Thank you.`;
    return `mailto:service@brynauto.co.za?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(mailBody)}`;
  };

  const handleEmailAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.serviceRequired || !formData.preferredDate) {
      e.preventDefault();
      setErrorMessage("Please complete all required fields with asterisks (*) before sending your email quote request.");
      return;
    }

    // Creating new appointment record
    const refCode = `APX-${Math.floor(1000 + Math.random() * 9000)}-GP`;
    const newAppointment: Appointment = {
      id: refCode,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      vehicleMake: formData.vehicleMake || 'Not Specified',
      vehicleModel: formData.vehicleModel || 'Not Specified',
      serviceRequired: formData.serviceRequired,
      preferredDate: formData.preferredDate,
      message: formData.message,
      bookingTime: new Date().toLocaleString('en-ZA', { hour12: false }),
      status: 'PENDING'
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('apex_service_appointments', JSON.stringify(updated));

    // Reset Form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      vehicleMake: '',
      vehicleModel: '',
      serviceRequired: '',
      preferredDate: '',
      message: ''
    });
    setActiveStep(1); // Reset back to Step 1 on success

    setSuccessMessage(`Appointment logged! Generating email quote template and launching client. Code Reference: ${refCode}.`);
    setActiveReceipt(newAppointment);

    // Auto-scroll to confirmation receipt
    setTimeout(() => {
      const receiptEl = document.getElementById('receipt-panel-block');
      if (receiptEl) {
        receiptEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.serviceRequired || !formData.preferredDate) {
      setErrorMessage("Please complete all required fields with asterisks (*).");
      return;
    }

    // Creating new appointment record
    const refCode = `APX-${Math.floor(1000 + Math.random() * 9000)}-GP`;
    const newAppointment: Appointment = {
      id: refCode,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      vehicleMake: formData.vehicleMake || 'Not Specified',
      vehicleModel: formData.vehicleModel || 'Not Specified',
      serviceRequired: formData.serviceRequired,
      preferredDate: formData.preferredDate,
      message: formData.message,
      bookingTime: new Date().toLocaleString('en-ZA', { hour12: false }),
      status: 'PENDING'
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('apex_service_appointments', JSON.stringify(updated));

    // Reset Form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      vehicleMake: '',
      vehicleModel: '',
      serviceRequired: '',
      preferredDate: '',
      message: ''
    });
    setActiveStep(1); // Reset back to Step 1 on success

    setSuccessMessage(`Appointment successfully catalogued! Code Reference: ${refCode}. Our dispatch team will confirm slots via SMS/WhatsApp.`);
    setActiveReceipt(newAppointment);

    // Auto-scroll to confirmation receipt
    setTimeout(() => {
      const receiptEl = document.getElementById('receipt-panel-block');
      if (receiptEl) {
        receiptEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm(`Are you sure you want to retract booking reference ${id}?`)) {
      const updated = appointments.filter(app => app.id !== id);
      setAppointments(updated);
      localStorage.setItem('apex_service_appointments', JSON.stringify(updated));
      if (activeReceipt && activeReceipt.id === id) {
        setActiveReceipt(null);
      }
      setSuccessMessage(`Booking retracted successfully.`);
    }
  };

  return (
    <div id="booking-view-root">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Direct Scheduling
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Book A Service Online
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Secure your vehicles service schedule directly. Fill out our validated scheduling form below. We coordinate prompt arrivals for diagnosis.
          </p>
        </div>
      </section>

      {/* WORKSPACE FORM */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* COLUMN 1: INTERACTIVE SERVICE FORM */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8" id="booking-form-wrapper">
              
              <div className="space-y-2">
                <span className="block text-xs font-bold text-brand-accent uppercase tracking-widest font-display">
                  Interactive Scheduler
                </span>
                <h2 className="font-display font-bold text-2xl text-brand-primary">
                  Vehicle Admission Application
                </h2>
                <div className="w-12 h-1 bg-brand-accent"></div>
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 text-xs text-emerald-800 font-sans flex items-start space-x-2 animate-fadeIn" id="submit-success-indicator">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-brand-accent p-4 text-xs text-brand-accent font-sans flex items-start space-x-2 animate-fadeIn" id="submit-error-indicator">
                  <AlertCircle className="w-4 h-4 shrink-0 text-brand-accent mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Dual Layout Admission Form */}
              <form onSubmit={handleSubmit} className="space-y-6" id="admission-form">
                
                {/* ==================== DESKTOP/TABLET UNIFIED FORM LAYOUT ==================== */}
                <div className="hidden md:block space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input 
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Sipho Ndlovu"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +27 61 045 0608"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Email Address *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. client@domain.co.za"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <CalendarDays className="w-4 h-4" />
                        </span>
                        <input 
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle Make */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Vehicle Make
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <Car className="w-4 h-4" />
                        </span>
                        <input 
                          type="text"
                          name="vehicleMake"
                          value={formData.vehicleMake}
                          onChange={handleChange}
                          placeholder="e.g. Toyota"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Vehicle Model */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                        Vehicle Model
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <Car className="w-4 h-4" />
                        </span>
                        <input 
                          type="text"
                          name="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={handleChange}
                          placeholder="e.g. Hilux 2.8 GD-6"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Service Required Switch */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Service Required *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400">
                        <Settings className="w-4 h-4" />
                      </span>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Select core capability list...</option>
                        {SERVICES_DATA.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                        <option value="General Troubleshooting">General Technical Troubleshooting</option>
                        <option value="Fleet Audit Inquiry">Specialized Fleet Audit / Corporate Contract</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Description of Symptoms / Special Instructions
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please outline active warning lights, clicking starter motor noises, or service requirements..."
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors h-32"
                      />
                    </div>
                  </div>

                  {/* Desktop Submit Triggers */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        type="submit"
                        id="submit-admission-btn"
                        className="btn-premium w-full text-center bg-brand-primary hover:bg-slate-800 text-white font-bold px-3 py-4 text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Settings className="w-4 h-4 shrink-0" />
                        <span>Confirm Web Request</span>
                      </button>
                      <a
                        href={getWhatsAppHref()}
                        onClick={handleAnchorClick}
                        target="_blank"
                        rel="noreferrer"
                        id="submit-admission-wa-btn"
                        className="btn-premium w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-4 text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <MessageSquare className="w-4 h-4 shrink-0" />
                        <span>Book via WhatsApp</span>
                      </a>
                      <a
                        href={getEmailHref()}
                        onClick={handleEmailAnchorClick}
                        id="submit-admission-email-btn"
                        className="btn-premium w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-4 text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        <span>Request Quote via Email</span>
                      </a>
                    </div>
                    <span className="block text-[10px] text-center text-slate-400 mt-3 uppercase tracking-wider">
                      Our standard warranty terms protect every component diagnostic repair.
                    </span>
                  </div>

                </div>


                {/* ==================== MOBILE STEP-BY-STEP WIZARD LAYOUT ==================== */}
                <div className="md:hidden space-y-6">
                  
                  {/* Wizard Header Progress Bar */}
                  <div className="flex items-center justify-between border-b pb-4 border-slate-200" id="mobile-wizard-header">
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold font-display ${activeStep === 1 ? 'bg-brand-accent text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                      <span className={`text-[9px] font-bold uppercase font-display ${activeStep === 1 ? 'text-brand-accent' : 'text-slate-400'}`}>Client</span>
                    </div>
                    <div className="h-[1px] bg-slate-300 flex-1 mx-1.5" />
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold font-display ${activeStep === 2 ? 'bg-brand-accent text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                      <span className={`text-[9px] font-bold uppercase font-display ${activeStep === 2 ? 'text-brand-accent' : 'text-slate-400'}`}>Vehicle</span>
                    </div>
                    <div className="h-[1px] bg-slate-300 flex-1 mx-1.5" />
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold font-display ${activeStep === 3 ? 'bg-brand-accent text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                      <span className={`text-[9px] font-bold uppercase font-display ${activeStep === 3 ? 'text-brand-accent' : 'text-slate-400'}`}>Slot</span>
                    </div>
                    <div className="h-[1px] bg-slate-300 flex-1 mx-1.5" />
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold font-display ${activeStep === 4 ? 'bg-brand-accent text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
                      <span className={`text-[9px] font-bold uppercase font-display ${activeStep === 4 ? 'text-brand-accent' : 'text-slate-400'}`}>Review</span>
                    </div>
                  </div>

                  {/* STEP 1: PERSONAL DETAIL INTERFACES */}
                  {activeStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-slate-100 py-1 px-2.5 max-w-max">
                        STEP 1 of 4: Contact details
                      </span>
                      
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Full Name *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Sipho Ndlovu"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +27 61 045 0608"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Email Address *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. client@domain.co.za"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: VEHICLE INFORMATION */}
                  {activeStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-slate-100 py-1 px-2.5 max-w-max">
                        STEP 2 of 4: Vehicle Specs
                      </span>

                      {/* Vehicle Make */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Vehicle Make
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <Car className="w-4 h-4" />
                          </span>
                          <input 
                            type="text"
                            name="vehicleMake"
                            value={formData.vehicleMake}
                            onChange={handleChange}
                            placeholder="e.g. Toyota"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Vehicle Model */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Vehicle Model
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <Car className="w-4 h-4" />
                          </span>
                          <input 
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleChange}
                            placeholder="e.g. Hilux 2.8 GD-6"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wide leading-tight mt-2 font-sans">
                        Note: Vehicle description is helpful but optional. You may press "Next Step" to continue.
                      </span>
                    </div>
                  )}

                  {/* STEP 3: SERVICE REQUIRED & PREFERRED DATE */}
                  {activeStep === 3 && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-slate-100 py-1 px-2.5 max-w-max">
                        STEP 3 of 4: Service & Slot
                      </span>

                      {/* Service Required */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Service Required *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Settings className="w-4 h-4" />
                          </span>
                          <select
                            name="serviceRequired"
                            value={formData.serviceRequired}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">Select core capability list...</option>
                            {SERVICES_DATA.map(s => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                            <option value="General Troubleshooting">General Technical Troubleshooting</option>
                            <option value="Fleet Audit Inquiry">Specialized Fleet Audit</option>
                          </select>
                        </div>
                      </div>

                      {/* Preferred Date */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <CalendarDays className="w-4 h-4" />
                          </span>
                          <input 
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: MESSAGE & CONFIRMATION SUBMIT */}
                  {activeStep === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-slate-100 py-1 px-2.5 max-w-max">
                        STEP 4 of 4: Live Summary Review
                      </span>

                      {/* Live summary review block */}
                      <div className="p-4 bg-slate-50 border border-slate-200 mt-2 space-y-2 text-xs">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Name:</span>
                          <span className="font-bold text-slate-800">{formData.fullName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Contact:</span>
                          <span className="font-semibold text-slate-800">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Vehicle Make:</span>
                          <span className="font-semibold text-slate-800">{formData.vehicleMake || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Required Service:</span>
                          <span className="font-bold text-brand-accent">{formData.serviceRequired}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Preferred Date:</span>
                          <span className="font-bold text-slate-800">{formData.preferredDate}</span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-display">
                          Additional Symptoms / Notes (Optional)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Outline specific fault symptoms or drop-off requests here..."
                            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs px-10 py-3 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors h-20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PROGRESS BAR BUTTON CONTROL TRACKS */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-150">
                    {activeStep > 1 && (
                      <button
                        type="button"
                        onClick={handleMobilePrev}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-display font-bold uppercase text-[10px] tracking-wider px-5 py-3 cursor-pointer"
                      >
                        Back
                      </button>
                    )}
                    
                    {activeStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleMobileNext}
                        className="bg-brand-primary text-white font-display font-bold uppercase text-[10px] tracking-wider px-5 py-3 flex-1 text-center cursor-pointer"
                      >
                        Next Step
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2 flex-1">
                        <button
                          type="submit"
                          className="bg-brand-primary text-white font-display font-bold uppercase text-[10px] tracking-wider px-4 py-3 text-center cursor-pointer w-full"
                        >
                          Confirm Web Reservation
                        </button>
                        <a
                          href={getWhatsAppHref()}
                          onClick={handleAnchorClick}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-650 hover:bg-emerald-700 text-white font-display font-bold uppercase text-[10px] tracking-wider px-4 py-3 text-center justify-center items-center flex space-x-1.5 cursor-pointer w-full"
                        >
                          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                          <span>Direct to WhatsApp</span>
                        </a>
                        <a
                          href={getEmailHref()}
                          onClick={handleEmailAnchorClick}
                          className="bg-blue-700 hover:bg-blue-800 text-white font-display font-bold uppercase text-[10px] tracking-wider px-4 py-3 text-center justify-center items-center flex space-x-1.5 cursor-pointer w-full"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span>Request Quote via Email</span>
                        </a>
                      </div>
                    )}
                  </div>

                </div>

              </form>

            </div>

            {/* COLUMN 2: ACTIVE TICKET DETAIL & PERSISTED LIST */}
            <div className="lg:col-span-5 space-y-8" id="booking-sidebar">
              
              {/* BRAND TRUST BADGE */}
              <div className="bg-brand-primary text-white p-6 md:p-8 space-y-4 relative">
                <span className="text-[10px] font-display font-black text-brand-accent uppercase tracking-widest block">
                  BRYN ADMISSION SLA
                </span>
                <h3 className="font-display font-bold text-lg uppercase leading-tight">
                  Independent Accreditations Built On Trust
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  By cataloguing your service online, you prevent manual queues. Our technicians will pre-diagnose based on your symptoms template, preparing the relevant calibration equipment on your arrival bay.
                </p>
                <div className="border-t border-slate-800 pt-4 space-y-3 text-xs">
                  <p className="flex items-center">
                    <span className="text-brand-accent mr-3 font-bold">✓</span>
                    No diagnostic delay SLA
                  </p>
                  <p className="flex items-center">
                    <span className="text-brand-accent mr-3 font-bold">✓</span>
                    Strict 1-Year Work Guarantee on wiring loompipes
                  </p>
                  <p className="flex items-center">
                    <span className="text-brand-accent mr-3 font-bold">✓</span>
                    Genuine warranty-backed components and filters
                  </p>
                </div>
              </div>

              {/* CONFIRMATION CARD TICKET */}
              {activeReceipt && (
                <div className="bg-white border-2 border-brand-accent p-6 space-y-4 animate-scaleUp" id="receipt-panel-block">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-display font-bold text-brand-accent uppercase tracking-widest">
                      Reservation Token Active
                    </span>
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-2 py-0.5">
                      {activeReceipt.id}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs text-brand-text">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Client:</span>
                      <span className="font-bold text-brand-primary">{activeReceipt.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="font-semibold text-brand-primary">{activeReceipt.vehicleMake} {activeReceipt.vehicleModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Requirement:</span>
                      <span className="font-bold text-brand-accent uppercase">{activeReceipt.serviceRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Admission Date:</span>
                      <span className="font-bold text-brand-primary bg-slate-100 px-2 py-0.5">{activeReceipt.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registered:</span>
                      <span>{activeReceipt.bookingTime}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100">
                      <span className="text-slate-500 font-bold">Queue Position Status:</span>
                      <span className="font-display font-bold text-[10px] uppercase bg-brand-primary text-white px-2 py-0.5 tracking-wider">
                        {activeReceipt.status} Verification
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => window.print()}
                      className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider py-2 transition-all font-display block"
                    >
                      Print Summary Sheet
                    </button>
                  </div>
                </div>
              )}

              {/* HISTORY ARCHIVE CONTAINER */}
              <div className="bg-white border border-slate-200 p-6 space-y-4">
                <span className="block text-xs font-bold text-brand-primary uppercase tracking-widest font-display pb-2 border-b border-slate-100">
                  Your Booking Log ({appointments.length})
                </span>
                
                {appointments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No bookings registered on this engine cache.</p>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1" id="booking-logs-holder">
                    {appointments.map((app) => (
                      <div 
                        key={app.id}
                        className="bg-slate-55 p-3.5 border border-slate-200 flex justify-between items-start transition-all hover:bg-slate-50"
                        id={`logged-booking-${app.id}`}
                      >
                        <div className="space-y-1 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-black text-brand-primary">{app.id}</span>
                            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 uppercase font-bold tracking-wider font-display">
                              {app.status}
                            </span>
                          </div>
                          <span className="block text-xs font-bold text-brand-primary truncate">{app.serviceRequired}</span>
                          <span className="block text-[10px] text-slate-400 font-sans">
                            Date requested: {app.preferredDate}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(app.id)}
                          className="text-slate-400 hover:text-brand-accent p-1 transition-colors"
                          id={`cancel-${app.id}`}
                          title="Retract booking slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
