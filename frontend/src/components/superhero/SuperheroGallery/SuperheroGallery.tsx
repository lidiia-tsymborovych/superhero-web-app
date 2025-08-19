import './SuperheroGallery.css';
import { useEffect, useRef, useState } from 'react';

interface HeroGalleryProps {
  images: string[];
  baseUrl: string;
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
  const [showNav, setShowNav] = useState(false);

    useEffect(() => {
      const checkScrollable = () => {
        const el = trackRef.current;
        if (!el) return;
        setShowNav(el.scrollWidth > el.clientWidth);
      };

      checkScrollable();
      window.addEventListener('resize', checkScrollable);

      return () => window.removeEventListener('resize', checkScrollable);
    }, [images]);

  const scrollBy = (dx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className='hg' aria-label={ariaLabel}>
      {showNav && (
        <button
          className='hg-nav hg-nav--left'
          aria-label='Scroll left'
          onClick={() => scrollBy(-300)}
        >
          ‹
        </button>
      )}

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
          </button>
        ))}
      </div>

      {showNav && (
        <button
          className='hg-nav hg-nav--right'
          aria-label='Scroll right'
          onClick={() => scrollBy(300)}
        >
          ›
        </button>
      )}
    </div>
  );
};
