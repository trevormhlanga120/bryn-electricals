import React, { useState } from 'react';
import { GALLERY_DATA } from '../data';
import { GalleryItem } from '../types';
import OptimizedImage from './OptimizedImage';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { label: 'ALL PROJECTS', value: 'ALL' },
    { label: 'DIAGNOSTICS', value: 'DIAGNOSTICS' },
    { label: 'ELECTRICAL REPAIRS', value: 'ELECTRICAL' },
    { label: 'VEHICLE SERVICING', value: 'SERVICING' },
    { label: 'SUSPENSION REPAIRS', value: 'SUSPENSION' },
    { label: 'ALARM INSTALLS', value: 'ALARM' },
    { label: 'RADIO INSTALLS', value: 'RADIO' }
  ];

  const filteredItems = activeCategory === 'ALL' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  return (
    <div id="gallery-view-root">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Quality Proof
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight font-display">
            Our Workshop Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            A visual documentation of high-precision diagnostic operations, professional wire loom installations, and complete major services performed at our Pretoria facility.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS & GALLERY GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* CATEGORIES BUTTON BAR */}
          <div className="relative border-b border-slate-200 pb-6" id="gallery-filter-container">
            {/* Horizontal sliding helper text for mobile/touch screens */}
            <div className="md:hidden flex items-center justify-between text-[10px] text-slate-400 font-sans tracking-widest uppercase mb-3 px-1">
              <span>← Swipe categories left/right →</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
            </div>
            
            <div 
              className="flex items-center overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-2.5 pb-2 scrollbar-none" 
              id="gallery-filter-bar"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat.value;
                return (
                  <motion.div
                    key={cat.value}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <button
                      id={`filter-btn-${cat.value.toLowerCase()}`}
                      onClick={() => setActiveCategory(cat.value)}
                      className={`relative px-5 py-3 text-xs font-bold font-display tracking-widest uppercase select-none transition-colors duration-300 border-2 cursor-pointer ${
                        isActive
                          ? 'border-brand-primary text-white bg-brand-primary'
                          : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-brand-primary'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-gallery-glow"
                          className="absolute inset-0 bg-brand-accent/15 mix-blend-multiply pointer-events-none"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC RESULTS COUNTER */}
          <div className="text-xs text-slate-400 font-sans uppercase tracking-widest text-center">
            Showing <span className="text-brand-primary font-bold">{filteredItems.length}</span> verified project captures
          </div>

          {/* GALLERY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div 
                  layout
                  key={item.id} 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: Math.min(idx * 0.04, 0.2), 
                    ease: "easeInOut" 
                  }}
                  className="bg-slate-50 border border-slate-200 group hover:border-slate-300 transition-all flex flex-col justify-between"
                  id={`gallery-item-card-${item.id}`}
                >
                  <div>
                    <div className="h-64 overflow-hidden relative bg-slate-900 border-b border-slate-200">
                      <OptimizedImage 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 font-display border-l-2 border-brand-accent">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="font-display font-bold text-base text-brand-primary uppercase">
                        {item.title}
                      </h3>
                      <p className="text-brand-text text-xs leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 text-xs text-slate-400 italic font-sans flex items-center justify-between border-t border-slate-100 pt-3">
                    <span>Pretoria Workshop Capture</span>
                    <span className="bullet text-brand-accent text-sm">●</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center space-y-3">
              <p className="text-slate-400 text-sm">No recent captures in this specialized folder.</p>
              <button 
                onClick={() => setActiveCategory('ALL')} 
                className="btn-premium text-xs text-brand-accent hover:underline font-bold"
              >
                Reset Filter Archive
              </button>
            </div>
          )}

          {/* QUALITY STATEMENT BANNER */}
          <div className="bg-brand-primary/5 border-l-4 border-brand-accent p-8 space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-primary uppercase tracking-wider">
              Workmanship & Safety Standard Compliance
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              All photographic representations are authentic, captured inside the Bryn Auto service center by our master workshop coordinators. We do not use unrealistic stock visual layouts. All customer personal license plates, private identifiers, and driver silhouettes are strictly protected or blurred to guarantee maximum data privacy.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
