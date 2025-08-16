import './ImageUpload.css';

interface Props {
  files: File[];
  setFiles: (files: File[]) => void;
}

export const ImageUpload = ({ files, setFiles }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className='image-upload'>
      <input type='file' multiple accept='image/*' onChange={handleChange} />
      <div className='preview'>
        {files.map((file, idx) => (
          <div key={idx} className='preview-item'>
            <img src={URL.createObjectURL(file)} alt='' />
            <button type='button' onClick={() => handleRemove(idx)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
