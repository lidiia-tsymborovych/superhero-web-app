import { useState, useEffect } from 'react';
import type { Superhero } from '../types/superhero';
import { getSuperheroById } from '../api/superheroApi';
import { ERROR_MESSAGES, type ErrorType} from '../types/error';
import { handleApiError } from '../utils/handleApiError';

export const useHero = (id?: string) => {
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);
    getSuperheroById(id)
      .then(setHero)
      .catch(err => {
       handleApiError(err, setError, ERROR_MESSAGES.FailedUploadHero);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500);
      });
  }, [id]);

  return { hero, loading, error };
};
