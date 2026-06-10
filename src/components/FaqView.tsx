import React, { useState } from 'react';
import { FAQ_DATA } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, FileText } from 'lucide-react';

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
          <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-6" id="faq-category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`faq-cat-btn-${cat.toLowerCase()}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold font-display tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white border-2 border-brand-accent'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ACCORDION GROUP PANEL */}
          <div className="space-y-4" id="faq-accordion-group">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-slate-50 border border-slate-200 transition-colors"
                  id={`faq-box-${faq.id}`}
                >
                  
                  {/* QUESTION BLOCK BUTTON */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    id={`faq-trigger-${faq.id}`}
                    className="w-full text-left px-6 py-4.5 flex justify-between items-center space-x-4 focus:outline-none"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-brand-primary">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-brand-accent" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {/* COLLAPSIBLE ANSWER FRAME */}
                  {isExpanded && (
                    <div 
                      className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-text leading-relaxed border-t border-slate-200 bg-white font-sans transition-all animate-slideDown"
                      id={`faq-answer-${faq.id}`}
                    >
                      <p className="mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans uppercase tracking-wider uppercase border-t border-slate-100 pt-3">
                        <span>Category: {faq.category}</span>
                        <span className="text-[10px] text-slate-300">Verified Solution</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
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
              <a href="mailto:service@brynauto.co.za" className="font-display text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white">
                ✉ service@brynauto.co.za
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
