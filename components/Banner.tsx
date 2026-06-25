'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  image: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/banners');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!autoPlay || banners.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, banners.length]);



  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const resumeAutoPlay = () => {
    setTimeout(() => setAutoPlay(true), 4000);
  };

  useEffect(() => {
    if (!autoPlay) {
      resumeAutoPlay();
    }
  }, [autoPlay]);

  if (isLoading) {
    return (
      <div className="w-full h-[75vh] md:h-[85vh] xl:h-screen min-h-[500px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center gap-6 z-10">
          <Loader2 className="w-12 h-12 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </div>
    );
  }

  if (!banners.length) return null;

  return (
    <div className="w-full h-[75vh] md:h-[85vh] xl:h-screen min-h-[500px] relative group overflow-hidden bg-black">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {banner.image_url && (
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src={banner.image_url}
                alt={banner.title || 'Banner'}
                fill
                className={`object-cover w-full h-full transform transition-transform duration-[10000ms] ease-out ${
                  index === currentIndex ? 'scale-110' : 'scale-100'
                }`}
                priority={index === 0}
                quality={100}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}
        </div>
      ))}



      {banners.length > 1 && (
        <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-8 py-4 rounded-[2rem] bg-black/30 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group py-2"
              aria-label={`Go to banner ${index + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? 'w-16 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                    : 'w-3 bg-white/30 group-hover:bg-white/60 group-hover:w-6'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;