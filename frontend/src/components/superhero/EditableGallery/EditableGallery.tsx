import { useRef } from 'react';
import './EditableGallery.css';
import { X } from 'lucide-react';

interface EditableHeroGalleryProps {
  images: string[];
  baseUrl: string;
  onDelete: (index: number) => void;
  onAdd: (file: File) => void;
  newFiles: File[];
}

export const EditableHeroGallery = ({
  images,
  baseUrl,
  onDelete,
  onAdd,
  newFiles,
}: EditableHeroGalleryProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAdd(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='editable-gallery'>
      {/* існуючі картинки */}
      {images.map((img, i) => (
        <div key={`existing-${i}`} className='editable-item'>
          <img src={`${baseUrl}${img}`} alt={`Hero ${i}`} />
          <button
            type='button'
            className='delete-btn'
            onClick={() => onDelete(i)}
          >
            ×
          </button>
        </div>
      ))}

      {/* нові картинки */}
      {newFiles.map((file, i) => (
        <div key={`new-${i}`} className='editable-item'>
          <img src={URL.createObjectURL(file)} alt={`New ${i}`} />
          <button
            type='button'
            className='delete-btn'
            onClick={() => onDelete(i + images.length)}
          >
            <X size={14}/>
          </button>
        </div>
      ))}

      {/* слот для завантаження нової картинки — завжди рендериться */}
      <div
        className={`editable-item add-item ${
          images.length + newFiles.length === 0 ? 'empty' : ''
        }`}
        onClick={handleDivClick}
      >
        {images.length + newFiles.length === 0
          ? 'Upload your first photo'
          : 'Upload Photo'}
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
