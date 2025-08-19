import { useRef, useEffect } from 'react';
import './EditableGallery.css';
import { X } from 'lucide-react';
import type { ImageValue } from '../SuperheroForm';

interface EditableHeroGalleryProps {
  images: ImageValue[];
  baseUrl: string;
  onDelete: (index: number) => void;
  onAdd: (file: File) => void;
}

export const EditableHeroGallery = ({
  images,
  baseUrl,
  onDelete,
  onAdd,
}: EditableHeroGalleryProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images
        .filter(img => img.type === 'new')
        .forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAdd(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className='editable-gallery'>
      {images.map((img, i) => (
        <div key={i} className='editable-item'>
          <img
            src={
              img.type === 'existing' ? `${baseUrl}${img.url}` : img.previewUrl
            }
            alt={`Hero ${i}`}
          />
          <button
            type='button'
            className='delete-btn'
            aria-label='Delete image'
            onClick={() => onDelete(i)}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <div
        className='editable-item add-item'
        role='button'
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
      >
        Upload Photo
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          aria-label='Upload hero image'
        />
      </div>
    </div>
  );
};
