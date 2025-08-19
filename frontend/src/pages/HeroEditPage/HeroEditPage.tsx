import './HeroEditPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateSuperhero } from '../../api/superheroApi';
import { SuperheroForm } from '../../components/superhero/SuperheroForm';
import { ERROR_MESSAGES } from '../../types/error';
import { useHero } from '../../hooks/useHero';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const HeroEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { hero } = useHero();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;

    try {
      const updatedHero = await updateSuperhero(id, formData);
      alert(`Hero ${updatedHero.nickname} updated successfully!`);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert(ERROR_MESSAGES.UnknownError);
    }
  };

  if (!hero) return <ErrorMessage message={ERROR_MESSAGES.HeroNotFound} />;

  return (
    <div className='hero-edit-create-page'>
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
