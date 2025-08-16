import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Input } from '../../common/Input';
// import { ImageUpload } from '../../common/ImageUpload';
import { Button } from '../../common/Button';
import type { Superhero } from '../../../types/superhero';
import { EditableHeroGallery } from '../EditableGallery';

import './SuperheroForm.css';
import { deleteSuperheroImage } from '../../../api/superheroApi';

interface Props {
  initialValues?: Superhero;
  isEdit?: boolean;
  onSubmit: (data: FormData) => Promise<Superhero>;
}

const superheroSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required'),
  real_name: z.string().min(1, 'Real name is required'),
  origin_description: z.string().min(1, 'Origin description is required'),
  superpowers: z.string().min(1, 'Superpowers are required'),
  catch_phrase: z.string().min(1, 'Catch phrase is required'),
});

type FormValues = z.infer<typeof superheroSchema>;

export const SuperheroForm = ({ initialValues, isEdit, onSubmit }: Props) => {
  const [existingImages, setExistingImages] = useState<string[]>(
    initialValues?.images ?? []
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(superheroSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          superpowers: initialValues.superpowers.join(', '),
        }
      : undefined,
  });

  const handleDeleteImage = async (index: number) => {
    if (index < existingImages.length) {
      if (!initialValues) {
        return;
      }
      const imageToDelete = existingImages[index];

      try {
        await deleteSuperheroImage(initialValues._id, imageToDelete);
        setExistingImages(prev => prev.filter((_, i) => i !== index));
      } catch (err) {
        console.error('Failed to delete image on server', err);
        alert('Failed to delete image on server');
      }
    } else {
      setNewFiles(prev =>
        prev.filter((_, i) => i !== index - existingImages.length)
      );
    }
  };

const submitHandler = async (data: FormValues) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  existingImages.forEach(img => formData.append('existingImages', img));
  newFiles.forEach(file => formData.append('images', file));

  try {
    const result = await onSubmit(formData); // повертає створеного/оновленого героя
    alert(
      isEdit
        ? `Hero ${result.nickname} updated successfully!`
        : `Hero ${result.nickname} created successfully!`
    );
    window.location.href = '/'; // переходимо на головну
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <form className='superhero-form' onSubmit={handleSubmit(submitHandler)}>
      <h2 className='section-title'>Personal Info</h2>

      <Controller
        name='nickname'
        control={control}
        render={({ field }) => (
          <Input label='Nickname' {...field} error={errors.nickname?.message} />
        )}
      />

      <Controller
        name='real_name'
        control={control}
        render={({ field }) => (
          <Input
            label='Real Name'
            {...field}
            error={errors.real_name?.message}
          />
        )}
      />

      <Controller
        name='origin_description'
        control={control}
        render={({ field }) => (
          <Input
            label='Origin Description'
            {...field}
            error={errors.origin_description?.message}
          />
        )}
      />

      <Controller
        name='superpowers'
        control={control}
        render={({ field }) => (
          <Input
            label='Superpowers (comma-separated)'
            {...field}
            error={errors.superpowers?.message}
          />
        )}
      />

      <Controller
        name='catch_phrase'
        control={control}
        render={({ field }) => (
          <Input
            label='Catch Phrase'
            {...field}
            error={errors.catch_phrase?.message}
          />
        )}
      />

      <section className='hero-section'>
        <h2 className='section-title'>Gallery</h2>
        <p className='section-subtitle'>
          Manage existing images or upload new ones
        </p>
      </section>

      <EditableHeroGallery
        images={existingImages}
        newFiles={newFiles}
        baseUrl='http://localhost:5050/uploads/'
        onDelete={index => handleDeleteImage(index)}
        onAdd={file => setNewFiles(prev => [...prev, file])}
      />

      <Button type='submit' className='submit-btn'>
        Submit
      </Button>
    </form>
  );
};
