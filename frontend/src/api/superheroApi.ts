import type { Superhero } from '../types/superhero';

const BASE_URL = 'http://localhost:5050/superheroes';

export const getSuperheroes = async (
  page = 1
): Promise<{ superheroes: Superhero[]; totalHeroes: number }> => {
  const res = await fetch(`${BASE_URL}?page=${page}`);
  return res.json();
};

export const getSuperheroById = async (id: string): Promise<Superhero> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createSuperhero = async (data: FormData): Promise<Superhero> => {
  const res = await fetch(BASE_URL, { method: 'POST', body: data });
  return res.json();
};

export const updateSuperhero = async (
  id: string,
  data: FormData
): Promise<Superhero> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: data });
  return res.json();
};

export const deleteSuperhero = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return res.json();
};

export const deleteSuperheroImage = async (
  heroId: string,
  imageName: string
): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/${heroId}/images/${imageName}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete image');
  return res.json();
};
