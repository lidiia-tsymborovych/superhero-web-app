import './HeroFormPage.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSuperheroes } from '../../hooks/useSuperheroes';
import type { Superhero, SuperheroPayload } from '../../types/superhero';
import { getSuperheroById } from '../../api/superheroApi';

const schema = z.object({
  nickname: z.string().min(1),
  real_name: z.string().min(1),
  origin_description: z.string().min(1),
  superpowers: z.string().min(1),
  catch_phrase: z.string().min(1),
  images: z.any().optional(),
});

type HeroFormValues = z.infer<typeof schema>;

export const HeroFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleCreate, handleUpdate } = useSuperheroes();
  const [, setInitialValues] = useState<Superhero | null>(null);

  const { register, handleSubmit, setValue } = useForm<HeroFormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!id) return;
    getSuperheroById(id).then(hero => {
      setInitialValues(hero);
      setValue('nickname', hero.nickname);
      setValue('real_name', hero.real_name);
      setValue('origin_description', hero.origin_description);
      setValue('superpowers', hero.superpowers.join(', '));
      setValue('catch_phrase', hero.catch_phrase);
    });
  }, [id, setValue]);

  const onSubmit = (data: HeroFormValues) => {
    const payload: SuperheroPayload = {
      nickname: data.nickname,
      real_name: data.real_name,
      origin_description: data.origin_description,
      superpowers: data.superpowers.split(',').map(s => s.trim()),
      catch_phrase: data.catch_phrase,
      images: data.images ? Array.from(data.images as FileList) : [],
    };

    if (id) {
      handleUpdate(id, payload).then(() => navigate(`/heroes/${id}`));
    } else {
      handleCreate(payload).then(() => navigate('/'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='hero-form'>
      <input placeholder='Nickname' {...register('nickname')} />
      <input placeholder='Real Name' {...register('real_name')} />
      <input placeholder='Origin' {...register('origin_description')} />
      <input
        placeholder='Superpowers (comma separated)'
        {...register('superpowers')}
      />
      <input placeholder='Catch Phrase' {...register('catch_phrase')} />
      <input type='file' {...register('images')} multiple />

      <button type='submit'>{id ? 'Update Hero' : 'Create Hero'}</button>
      <button type='button' onClick={() => navigate(-1)}>
        Cancel
      </button>
    </form>
  );
};
