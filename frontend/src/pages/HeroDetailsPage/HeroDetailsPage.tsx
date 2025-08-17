import './HeroDetails.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Superhero } from '../../types/superhero';
import { getSuperheroById } from '../../api/superheroApi';
import { Lightbox } from '../../components/common/Lightbox';
import { SuperHeroGallery } from '../../components/superhero/SuperheroGallery';
import { Button } from '../../components/common/Button';

const BASE_URL = 'http://localhost:5050/uploads/';

export const HeroDetailsPage = () => {
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSuperheroById(id)
      .then(setHero)
      .catch(() => setError('Failed to fetch hero'))
      .finally(() => setLoading(false));
  }, [id]);

  const images = hero?.images ?? [];
  const selectedImage = currentIndex != null ? images[currentIndex] : null;

  const openAt = (i: number) => setCurrentIndex(i);
  const closeLightbox = () => setCurrentIndex(null);
  const prev = () =>
    setCurrentIndex(i =>
      i == null ? null : (i - 1 + images.length) % images.length
    );
  const next = () =>
    setCurrentIndex(i => (i == null ? null : (i + 1) % images.length));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hero) return <p>No hero found</p>;

  return (
    <div className='hero-details-page'>
      <Link to='/' className='back-link'>
        ← Back to List
      </Link>

      <div className='hero-details-content'>
        <div className='hero-image-container'>
          <img
            className='hero-main-image'
            src={`${BASE_URL}${images[0]}`}
            alt={hero.nickname}
            onClick={() => openAt(0)}
          />
        </div>

        <div className='hero-info'>
          <div className='hero-info-details'>
            <h1>{hero.nickname}</h1>
            <p>
              <strong>Real Name:</strong> {hero.real_name}
            </p>
            <p>
              <strong>Origin:</strong> {hero.origin_description}
            </p>
            <p>
              <strong>Superpowers:</strong> {hero.superpowers}
            </p>
            <p>
              <strong>Catch Phrase:</strong> {hero.catch_phrase}
            </p>
          </div>

          <Link to={`/heroes/edit/${hero._id}`}>
            <Button className='edit-btn'>Edit Hero</Button>
          </Link>
        </div>
      </div>

      <SuperHeroGallery images={images} baseUrl={BASE_URL} onSelect={openAt} />

      {selectedImage && (
        <Lightbox
          imageSrc={`${BASE_URL}${selectedImage}`}
          onClose={closeLightbox}
          onPrev={images.length > 1 ? prev : undefined}
          onNext={images.length > 1 ? next : undefined}
        />
      )}
    </div>
  );
};
