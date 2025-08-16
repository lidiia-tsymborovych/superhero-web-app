import './SuperheroGallery.css';
import { useRef } from 'react';

interface HeroGalleryProps {
  images: string[];
  baseUrl: string; // наприклад "http://localhost:5050/uploads/"
  onSelect: (index: number) => void;
  ariaLabel?: string;
}

export const SuperHeroGallery = ({
  images,
  baseUrl,
  onSelect,
  ariaLabel = 'Hero gallery',
}: HeroGalleryProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className='hg' aria-label={ariaLabel}>
      <button
        className='hg-nav hg-nav--left'
        aria-label='Scroll left'
        onClick={() => scrollBy(-300)}
      >
        ‹
      </button>

      <div className='hg-track' ref={trackRef}>
        {images.map((img, i) => (
          <button
            key={i}
            className='hg-item'
            onClick={() => onSelect(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              className='hg-img'
              src={`${baseUrl}${img}`}
              alt={`Hero image ${i + 1}`}
              loading='lazy'
            />
            <span className='hg-hint'>Click to zoom</span>
          </button>
        ))}
      </div>

      <button
        className='hg-nav hg-nav--right'
        aria-label='Scroll right'
        onClick={() => scrollBy(300)}
      >
        ›
      </button>
    </div>
  );
};
