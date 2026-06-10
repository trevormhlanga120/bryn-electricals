import React, { useState } from 'react';
import { GALLERY_DATA } from '../data';
import { GalleryItem } from '../types';

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
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6" id="gallery-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`filter-btn-${cat.value.toLowerCase()}`}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2.5 text-xs font-bold font-display tracking-widest uppercase transition-all ${
                  activeCategory === cat.value
                    ? 'bg-brand-primary text-white border-2 border-brand-primary'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent hover:text-brand-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* DYNAMIC RESULTS COUNTER */}
          <div className="text-xs text-slate-400 font-sans uppercase tracking-widest text-center">
            Showing <span className="text-brand-primary font-bold">{filteredItems.length}</span> verified project captures
          </div>

          {/* GALLERY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-50 border border-slate-200 group hover:border-slate-300 transition-all flex flex-col justify-between"
                id={`gallery-item-card-${item.id}`}
              >
                <div>
                  <div className="h-64 overflow-hidden relative bg-slate-900 border-b border-slate-200">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
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
              </div>
            ))}
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
