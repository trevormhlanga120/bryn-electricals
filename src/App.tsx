import React, { useState, useEffect } from 'react';
import { AppPage } from './types';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import AutoElectricalView from './components/AutoElectricalView';
import GalleryView from './components/GalleryView';
import BookServiceView from './components/BookServiceView';
import FaqView from './components/FaqView';
import ContactView from './components/ContactView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(AppPage.HOME);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Monitor deep URL search configurations or hash changes to jump pages if needed
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toUpperCase().replace('#', '').replace('-', '_');
      if (hash in AppPage) {
        setCurrentPage(hash as AppPage);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash(); // Run on init
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic SEO Title and Metadata updates
  useEffect(() => {
    let title = 'Bryn Auto Electrical & Mechanical Repair | Pretoria Capital Park';
    let description = 'Premium auto electrical diagnostics, starter & alternator repairs, key alarm setups, suspension tuning, and complete mechanical services in Capital Park, Pretoria.';

    switch (currentPage) {
      case AppPage.HOME:
        title = 'Bryn Auto Electrical & Mechanical | 170 Myburgh St, Capital Park, Pretoria';
        description = 'Professional auto electrical diagnostics, starting troubleshooting, alarm installs, and mechanical fault-finding in Pretoria. Visit us at 170 Myburgh St, Capital Park.';
        break;
      case AppPage.ABOUT:
        title = 'About Bryn Auto Electrical & Mechanical | Pretoria Master Technicians';
        description = 'Meet our certified master technicians. Providing premium, high-integrity automotive services and custom electrical wiring looms in Capital Park for over a decade.';
        break;
      case AppPage.SERVICES:
        title = 'Automotive Services & Computer Diagnostics | Bryn Auto Pretoria';
        description = 'Full-suite vehicle servicing, precision computer diagnostics, starting & battery repairs, and suspension tuning at our modern Capital Park station.';
        break;
      case AppPage.AUTO_ELECTRICAL:
        title = 'Specialist Auto Electrical Engineering | Capital Park Pretoria';
        description = 'Advanced wiring diagnostics, ECU scans, smart alarm setups, alternator testing, and custom loom rewiring for private vehicles and commercial fleets.';
        break;
      case AppPage.GALLERY:
        title = 'Our Garage Gallery & Completed Projects | Bryn Auto';
        description = 'Step inside our workshop. View real-life showcases of precision diagnostics, wiring harness rebuilds, suspension refits, and electrical system diagnostics.';
        break;
      case AppPage.BOOK_A_SERVICE:
        title = 'Schedule Service & Diagnostics | Bryn Auto Capital Park';
        description = 'Book your appointment online today. Select your preferred date for advanced scoping, minor/major servicing, or battery replacements.';
        break;
      case AppPage.FAQ:
        title = 'Frequently Asked Questions | Bryn Auto Electrical & Repairs';
        description = 'Got a starter, wiring, or alarm query? Browse our technical FAQs and learn why we are Capital Park South Africa’s choice auto workshop.';
        break;
      case AppPage.CONTACT:
        title = 'Contact Bryn Auto Dispatch | 170 Myburgh St, Capital Park';
        description = 'Get in touch for diagnostic appointments or fast roadside assistance dispatch. Call +27 61 045 0608 or visit 170 Myburgh St, Capital Park, Pretoria.';
        break;
    }

    document.title = title;

    // Dynamically update meta description if it exists
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [currentPage]);

  const renderActiveView = () => {
    switch (currentPage) {
      case AppPage.HOME:
        return (
          <HomeView 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
      case AppPage.ABOUT:
        return (
          <AboutView 
            setCurrentPage={setCurrentPage} 
          />
        );
      case AppPage.SERVICES:
        return (
          <ServicesView 
            selectedServiceId={selectedServiceId} 
            setSelectedServiceId={setSelectedServiceId} 
            setCurrentPage={setCurrentPage} 
          />
        );
      case AppPage.AUTO_ELECTRICAL:
        return (
          <AutoElectricalView 
            setCurrentPage={setCurrentPage} 
          />
        );
      case AppPage.GALLERY:
        return <GalleryView />;
      case AppPage.BOOK_A_SERVICE:
        return <BookServiceView />;
      case AppPage.FAQ:
        return <FaqView />;
      case AppPage.CONTACT:
        return <ContactView />;
      default:
        return (
          <HomeView 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      setSelectedServiceId={setSelectedServiceId}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          id="active-view-container"
        >
          {renderActiveView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

