import './HeroDetails.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL_HERO_IMAGES } from '../../api/superheroApi';
import { Lightbox } from '../../components/common/Lightbox';
import { SuperHeroGallery } from '../../components/superhero/SuperheroGallery';
import { Button } from '../../components/common/Button';
import { useHero } from '../../hooks/useHero';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/common/Loader/Loader';

export const HeroDetailsPage = () => {
  const { id } = useParams();
  const { hero, loading, error } = useHero(id);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

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

  if (error) return <ErrorMessage message={error} />;

  if (!hero) {
    return (
      <div className='no-hero'>
        <p className='no-hero-text'>No hero found</p>
        <Link to='/'>
          <Button>← Back to List</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className='hero-details-page'>
      <Link to='/' className='back-link'>
        ← Back to List
      </Link>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className='hero-details-content'>
            <div className='hero-image-container'>
              <img
                className='hero-main-image'
                src={`${BASE_URL_HERO_IMAGES}${images[0]}`}
                alt={hero.nickname}
                onClick={() => openAt(0)}
              />
            </div>

            <div className='hero-info-wrapper'>
              <article className='hero-info'>
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
              </article>
            </div>
          </section>

          <section className='hero-info-gallery'>
            <h2 className='section-title'>Gallery</h2>

            <SuperHeroGallery
              images={images}
              baseUrl={BASE_URL_HERO_IMAGES}
              onSelect={openAt}
            />

            {selectedImage && (
              <Lightbox
                imageSrc={`${BASE_URL_HERO_IMAGES}${selectedImage}`}
                onClose={closeLightbox}
                onPrev={images.length > 1 ? prev : undefined}
                onNext={images.length > 1 ? next : undefined}
              />
            )}
          </section>
        </>
      )}
    </main>
  );
};
