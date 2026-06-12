import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LOCAL_IMAGES } from './data.ts';

// Preload high priority hero background image in absolute background
const preloadHero = () => {
  const imagesToPreload = Object.values(LOCAL_IMAGES);
  
  // Use setTimeout to run after the main thread completes initial rendering
  setTimeout(() => {
    // Priority preloading
    imagesToPreload.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, 100);
};

preloadHero();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

