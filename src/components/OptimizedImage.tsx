import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  [key: string]: any;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  // Reset states when the source changes
  useEffect(() => {
    setIsLoaded(false);
    setErrorStatus(false);
    
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setErrorStatus(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`} style={{ minHeight: !isLoaded ? '80px' : 'auto' }}>
      {/* Sleek Skeleton Loader Shimmer */}
      {!isLoaded && !errorStatus && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          <svg
            className="w-8 h-8 text-slate-650"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Actual Image Component */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setErrorStatus(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...props}
      />

      {errorStatus && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-500 text-xs text-center p-2">
          Image loading error
        </div>
      )}
    </div>
  );
}
