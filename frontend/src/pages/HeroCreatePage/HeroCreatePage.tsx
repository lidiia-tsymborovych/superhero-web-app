
import './HeroCreatePage.css'
import { createSuperhero } from '../../api/superheroApi';
import { SuperheroForm } from '../../components/superhero/SuperheroForm';
import { Link, useNavigate } from 'react-router-dom';

export const HeroCreatePage = () => {
   const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    const createdHero = await createSuperhero(formData);
    alert(`Hero ${createdHero.nickname} created successfully!`);
    navigate('/');

  };

  return (
    <div className='hero-create-page'>
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
