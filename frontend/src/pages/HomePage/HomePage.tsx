import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSuperheroes } from '../../hooks/useSuperheroes';
import { SuperheroCard } from '../../components/superhero/SuperheroCard';
import { Pagination } from '../../components/common/Pagination';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

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

  if (!loading && error) {
    return <ErrorMessage message={error} />;
  }
    return (
      <div className='home-page'>
        <h1 className='home-page-title'>Superheroes</h1>

        <Link to='/heroes/new' className='add-hero-link'>
          <Button className='add-hero-btn'>Add New Superhero</Button>
        </Link>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='heroes-grid'>
              {heroes.map(hero => (
                <SuperheroCard
                  key={hero._id}
                  hero={hero}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={newPage => setPage(newPage)}
            />
          </>
        )}
      </div>
    );
};
