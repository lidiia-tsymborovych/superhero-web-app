import { Link } from 'react-router-dom';
import './SuperheroCard.css';
import type { Superhero } from '../../../types/superhero';
import { Trash2 } from 'lucide-react';

interface Props {
  hero: Superhero;
  onDelete?: (id: string) => void;
}

export const SuperheroCard = ({ hero, onDelete }: Props) => (
  <div className='hero-card-wrapper'>
    <Link to={`/heroes/${hero._id}`} className='hero-card-link'>
      <div className='hero-card'>
        {hero.images?.[0] && (
          <img
            src={`http://localhost:5050/uploads/${hero.images[0]}`}
            alt={hero.nickname}
            className='hero-image'
          />
        )}
        <h3 className='hero-name'>{hero.nickname}</h3>
      </div>
    </Link>
    {onDelete && (
      <button
        className='hero-delete-btn'
        onClick={() => onDelete(hero._id)}
        title='Delete hero'
      >
        <Trash2 />
      </button>
    )}
  </div>
);
