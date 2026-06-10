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

