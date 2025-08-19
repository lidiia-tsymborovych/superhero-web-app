import { ERROR_MESSAGES } from '../types/error';
import type { Superhero } from '../types/superhero';

export const BASE_URL = 'http://localhost:5050/superheroes';
export const BASE_URL_HERO_IMAGES = 'http://localhost:5050/uploads/';

export const getSuperheroes = async (
  page = 1
): Promise<{ superheroes: Superhero[]; totalHeroes: number }> => {
  const res = await fetch(`${BASE_URL}?page=${page}`);
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedUploadHeroes);
  return res.json();
};

export const getSuperheroById = async (id: string): Promise<Superhero> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedUploadHero);
  return res.json();
};

export const createSuperhero = async (data: FormData): Promise<Superhero> => {
  const res = await fetch(BASE_URL, { method: 'POST', body: data });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedCreateHero);
  return res.json();
};

export const updateSuperhero = async (
  id: string,
  data: FormData
): Promise<Superhero> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: data });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedUpdateHero);
  return res.json();
};

export const deleteSuperhero = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedDeleteHero);
  return res.json();
};

export const deleteSuperheroImage = async (
  heroId: string,
  imageName: string
): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/${heroId}/images/${imageName}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FailedDeleteImage);
  return res.json();
};
