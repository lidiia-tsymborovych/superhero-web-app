import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSuperheroes } from '../../hooks/useSuperheroes';
import { SuperheroCard } from '../../components/superhero/SuperheroCard';
import { Pagination } from '../../components/common/Pagination';
import { Button } from '../../components/common/Button';

export const HomePage = () => {
  const {
    heroes,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleDelete,
  } = useSuperheroes();

  return (
    <div className='home-page'>
      <h1 className='home-page-title'>Superheroes</h1>

      <Link to='/heroes/new'>
        <Button className='add-hero-btn'>Add Hero</Button>
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className='heroes-grid'>
        {heroes.map(hero => (
          <SuperheroCard key={hero._id} hero={hero} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={newPage => setPage(newPage)}
      />
    </div>
  );
};
