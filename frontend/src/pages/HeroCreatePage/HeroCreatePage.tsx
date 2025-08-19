import { createSuperhero } from '../../api/superheroApi';
import { SuperheroForm } from '../../components/superhero/SuperheroForm';
import { Link, useNavigate } from 'react-router-dom';
import { ERROR_MESSAGES } from '../../types/error';

export const HeroCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const createdHero = await createSuperhero(formData);
      alert(`Hero ${createdHero.nickname} created successfully!`);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(ERROR_MESSAGES.UnknownError);
      }
    }
  };

  return (
    <div className='hero-edit-create-page'>
      <Link to='/' className='back-link'>
        ← Back to List
      </Link>

      <h1 className='hero-title'>Create Superhero</h1>

      <section className='hero-section'>
        <SuperheroForm onSubmit={handleSubmit} />
      </section>
    </div>
  );
};
