import { useState, useEffect, useCallback } from 'react';
import type { Superhero } from '../types/superhero';
import {
  getSuperheroes,
  deleteSuperhero,
} from '../api/superheroApi';
import { ERROR_MESSAGES, type ErrorType } from '../types/error';
import { handleApiError } from '../utils/handleApiError';

export const ITEMS_PER_PAGE = 5;

export const useSuperheroes = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [totalHeroes, setTotalHeroes] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const fetchHeroes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { superheroes, totalHeroes } = await getSuperheroes(page);
      setHeroes(superheroes);
      setTotalHeroes(totalHeroes);
    } catch (err) {
      handleApiError(err, setError, ERROR_MESSAGES.FailedUploadHeroes);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [page]);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  const totalPages = Math.ceil(totalHeroes / ITEMS_PER_PAGE);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteSuperhero(id);
        fetchHeroes();
      } catch (err) {
        handleApiError(err, setError, ERROR_MESSAGES.FailedDeleteHero);
      }
    },
    [fetchHeroes]
  );

  return {
    heroes,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleDelete,
    fetchHeroes,
  };
};
