import { useState, useEffect, useCallback } from 'react';
import type { Superhero, SuperheroPayload } from '../types/superhero';
import {
  getSuperheroes,
  deleteSuperhero,
  createSuperhero,
  updateSuperhero,
} from '../api/superheroApi';

export const ITEMS_PER_PAGE = 5;

export const useSuperheroes = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [totalHeroes, setTotalHeroes] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHeroes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { superheroes, totalHeroes } = await getSuperheroes(page);
      setHeroes(superheroes);
      setTotalHeroes(totalHeroes);
    } catch {
      setError('Failed to fetch superheroes');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  const totalPages = Math.ceil(totalHeroes / ITEMS_PER_PAGE);

  // CRUD
  const handleDelete = async (id: string) => {
    try {
      await deleteSuperhero(id);
      fetchHeroes();
    } catch (err) {
      console.error('Failed to delete superhero', err);
    }
  };

  const toFormData = (data: SuperheroPayload) => {
    const formData = new FormData();
    Object.entries({
      nickname: data.nickname,
      real_name: data.real_name,
      origin_description: data.origin_description,
      superpowers: data.superpowers.join(','),
      catch_phrase: data.catch_phrase,
    }).forEach(([key, value]) => formData.append(key, value));
    data.images?.forEach(file => formData.append('images', file));
    return formData;
  };

  const handleCreate = async (data: SuperheroPayload) => {
    try {
      await createSuperhero(toFormData(data));
      setPage(1);
      fetchHeroes();
    } catch (err) {
      console.error('Failed to create superhero', err);
    }
  };

  const handleUpdate = async (id: string, data: SuperheroPayload) => {
    try {
      await updateSuperhero(id, toFormData(data));
      fetchHeroes();
    } catch (err) {
      console.error('Failed to update superhero', err);
    }
  };

  return {
    heroes,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleDelete,
    handleCreate,
    handleUpdate,
    fetchHeroes,
  };
};
