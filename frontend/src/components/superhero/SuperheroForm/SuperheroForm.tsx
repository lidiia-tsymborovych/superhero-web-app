import './SuperheroForm.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { EditableHeroGallery } from '../EditableGallery';
import {
  BASE_URL_HERO_IMAGES,
  deleteSuperheroImage,
} from '../../../api/superheroApi';
import { ERROR_MESSAGES } from '../../../types/error';
import type { Superhero } from '../../../types/superhero';

interface Props {
  initialValues?: Superhero;
  onSubmit: (data: FormData) => void;
}

const superheroSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FormValidationNickname }),
  real_name: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FormValidationRealName }),
  origin_description: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FormValidationOriginDescription }),
  superpowers: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FormValidationSuperpowers }),
  catch_phrase: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FormValidationCatchPhrase }),
  images: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, { message: ERROR_MESSAGES.FormValidationImages }),
});

type FormValues = z.infer<typeof superheroSchema>;

export type ImageValue =
  | { type: 'existing'; url: string }
  | { type: 'new'; file: File; previewUrl: string };

export const SuperheroForm = ({ initialValues, onSubmit }: Props) => {
  const [images, setImages] = useState<ImageValue[]>(
    () =>
      initialValues?.images?.map(img => ({ type: 'existing', url: img })) ?? []
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(superheroSchema),
    defaultValues: initialValues
      ? {
          nickname: initialValues.nickname || '',
          real_name: initialValues.real_name || '',
          origin_description: initialValues.origin_description || '',
          superpowers: initialValues.superpowers?.join(', ') || '',
          catch_phrase: initialValues.catch_phrase || '',
          images: initialValues.images ?? [],
        }
      : {
          nickname: '',
          real_name: '',
          origin_description: '',
          superpowers: '',
          catch_phrase: '',
          images: [],
        },
  });

  const handleAddImage = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    const newImage: ImageValue = { type: 'new', file, previewUrl };
    const updated = [...images, newImage];
    setImages(updated);
    setValue(
      'images',
      updated.map(img => (img.type === 'existing' ? img.url : img.file))
    );
  };

  const handleDeleteImage = async (index: number) => {
    const img = images[index];
    if (img.type === 'existing' && initialValues) {
      try {
        await deleteSuperheroImage(initialValues._id, img.url);
      } catch (err) {
        console.error(err);
        alert(ERROR_MESSAGES.FailedDeleteImage);
        return;
      }
    } else if (img.type === 'new') {
      URL.revokeObjectURL(img.previewUrl);
    }

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setValue(
      'images',
      updated.map(img => (img.type === 'existing' ? img.url : img.file))
    );
  };

  const submitHandler = async (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') formData.append(key, value as string);
    });
    images.forEach(img => {
      if (img.type === 'existing') {
        formData.append('existingImages', img.url);
      } else {
        formData.append('images', img.file);
      }
    });

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error(err);
      alert(ERROR_MESSAGES.FormSubmitFailed);
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
            multiline
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
            label='Superpowers'
            multiline
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
            multiline
            {...field}
            error={errors.catch_phrase?.message}
          />
        )}
      />

      <div>
        <h2 className='section-title'>Gallery</h2>
        <p className='section-subtitle'>
          Manage existing images or upload new ones
        </p>
      </div>

      <div>
        <EditableHeroGallery
          images={images}
          baseUrl={BASE_URL_HERO_IMAGES}
          onDelete={handleDeleteImage}
          onAdd={handleAddImage}
        />
        {errors.images && <p className='error-text'>{errors.images.message}</p>}
      </div>

      <Button type='submit' className='submit-btn'>
        Submit
      </Button>
    </form>
  );
};
