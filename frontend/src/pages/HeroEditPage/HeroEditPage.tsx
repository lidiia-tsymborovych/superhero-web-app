import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSuperheroById, updateSuperhero } from '../../api/superheroApi';
import { SuperheroForm } from '../../components/superhero/SuperheroForm';
import type { Superhero } from '../../types/superhero';
import './HeroEditPage.css';

export const HeroEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSuperheroById(id)
      .then(setHero)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    if (!id) {
      throw new Error('No hero ID');
    }
    const updatedHero = await updateSuperhero(id, formData);
    alert(`Hero ${updatedHero.nickname} updated successfully!`);
    navigate('/');
  };

  if (loading) return <p className='center-text'>Loading...</p>;
  if (!hero) return <p className='center-text'>No hero found</p>;

  return (
    <div className='hero-edit-page'>
      <Link to={`/heroes/${id}`} className='back-link'>
        ← Back to Hero
      </Link>

      <h1 className='hero-title'>Edit Superhero</h1>

      <section className='hero-section'>
        <SuperheroForm initialValues={hero} onSubmit={handleSubmit} />
      </section>
    </div>
  );
};
