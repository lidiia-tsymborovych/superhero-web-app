import './Lightbox.css';
import { LucideChevronLeft, LucideChevronRight, X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  imageSrc: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox = ({ imageSrc, onClose, onPrev, onNext }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className='lightbox open'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
    >
      <img src={imageSrc} alt='Enlarged' onClick={e => e.stopPropagation()} />
      <button className='close-btn' onClick={onClose} aria-label='Close'>
        <X />
      </button>

      {onPrev && (
        <button
          className='nav-btn nav-btn--left'
          onClick={e => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label='Previous'
        >
          <LucideChevronLeft />
        </button>
      )}
      {onNext && (
        <button
          className='nav-btn nav-btn--right'
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
          aria-label='Next'
        >
          <LucideChevronRight />
        </button>
      )}
    </div>
  );
};
