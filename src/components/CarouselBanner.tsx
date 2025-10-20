"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface CarouselBannerProps {
  images: string[];
}

const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="embla overflow-hidden rounded-lg shadow-md" ref={emblaRef}>
      <div className="embla__container flex">
        {images.map((src, index) => (
          <div className="embla__slide flex-shrink-0 flex-grow-0 basis-full" key={index}>
            <img
              src={src}
              alt={`Promotional banner ${index + 1}`}
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;