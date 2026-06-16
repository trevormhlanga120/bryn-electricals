import React, { useState } from 'react';
import { FAQ_DATA } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FaqView() {
  const [expandedId, setExpandedId] = useState<string | null>('faq1'); // Show first by default
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const categories = ['ALL', 'Servicing', 'Diagnostics', 'Electrical', 'Operational', 'Warranty'];

  const filteredFaqs = activeCategory === 'ALL' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === activeCategory);

  return (
    <div id="faq-view-root">
      
      {/* HEADER BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center border-b-4 border-brand-accent px-4 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-accent font-display block">
            Information Center
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Get clear, prompt resolutions explaining our independent diagnostic methods, warranty assurances, and South Africa Right to Repair alignment.
          </p>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT WORKSPACE */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* CATEGORY BAR */}
          <div className="relative border-b border-slate-100 pb-6" id="faq-category-container">
            {/* Horizontal sliding helper text for mobile/touch screens */}
            <div className="md:hidden flex items-center justify-between text-[10px] text-slate-400 font-sans tracking-widest uppercase mb-3 px-1">
              <span>← Swipe categories left/right →</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
            </div>

            <div 
              className="flex items-center overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-2.5 pb-2 scrollbar-none" 
              id="faq-category-filters"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat;
                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <button
                      id={`faq-cat-btn-${cat.toLowerCase()}`}
                      onClick={() => {
                        setActiveCategory(cat);
                        setExpandedId(null);
                      }}
                      className={`relative px-5 py-3 text-xs font-bold font-display tracking-wider uppercase select-none transition-colors duration-300 border-2 cursor-pointer ${
                        isActive
                          ? 'border-brand-accent bg-brand-accent text-white'
                          : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-brand-primary'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-faq-glow"
                          className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply pointer-events-none"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ACCORDION GROUP PANEL */}
          <div className="space-y-4 min-h-[300px]" id="faq-accordion-group">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <motion.div 
                    layout
                    key={faq.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.15) }}
                    className="bg-slate-50 border border-slate-200 transition-colors"
                    id={`faq-box-${faq.id}`}
                  >
                    
                    {/* QUESTION BLOCK BUTTON */}
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      id={`faq-trigger-${faq.id}`}
                      className="w-full text-left px-6 py-4.5 flex justify-between items-center space-x-4 focus:outline-none cursor-pointer"
                    >
                      <span className="font-display font-bold text-sm sm:text-base text-brand-primary">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-brand-accent animate-[spin_0.2s_ease-out]" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* COLLAPSIBLE ANSWER FRAME */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-slate-200 bg-white"
                        >
                          <div 
                            className="px-6 pb-6 pt-5 text-xs sm:text-sm text-brand-text leading-relaxed font-sans"
                            id={`faq-answer-${faq.id}`}
                          >
                            <p className="mb-4">{faq.answer}</p>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans uppercase tracking-wider border-t border-slate-100 pt-3">
                              <span>Category: {faq.category}</span>
                              <span className="text-[10px] text-slate-300">Verified Solution</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* EMPTY SEARCH CASE */}
          {filteredFaqs.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-12">No information tags available in this folder index.</p>
          )}

          {/* SLA INQUIRY NOTE */}
          <div className="bg-slate-900 text-white p-8 space-y-4 border-t-4 border-brand-accent mt-12">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-brand-accent">
              Still Have Unsolved Questions?
            </h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              If your vehicle displays custom fault symptoms not outlined above, contact our mechanical team. We offer phone guidance and scheduled diagnostics for private commuter cars, utility transporters, and industrial vehicles.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a href="tel:+27610450608" id="faq-tele-link" className="font-display text-xs font-bold uppercase tracking-wider text-white hover:text-brand-accent flex items-center pr-4">
                📞 CALL +27 61 045 0608
              </a>
              <span className="hidden sm:inline text-slate-600">|</span>
              <a href="mailto:info@brynauto.co.za" className="font-display text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white">
                ✉ info@brynauto.co.za
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
