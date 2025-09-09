import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// NavBar Component
function NavBar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'home', label: 'Home', image: '/nav/bog_band.png' },
    { id: 'music', label: 'Music', image: '/nav/music.png' },
    { id: 'shows', label: 'Shows', image: '/nav/shows.png' },
    { id: 'merch', label: 'Merch', image: '/nav/merch.png' },
  ];

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <img src={item.image} alt={item.label} className={styles.navImage} />
        </button>
      ))}
    </nav>
  );
}

// SlideShow Component
function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pressImages = [
    '/press/bb_press0.png',
    '/press/bb_press1.jpg',
    '/press/bb_press2.jpg',
    '/press/bb_press3.png'
  ];

  // Preload all images
  useEffect(() => {
    pressImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pressImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, pressImages.length]);

  return (
    <div className={styles.slideshow}>
      <div
        className={styles.slideContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {pressImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Bog Band Press ${index + 1}`}
            className={`${styles.slideImage} ${index === currentSlide ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

// Placeholder Components
function Music() {
  return (
    <div className={styles.component}>
      <h2>Music</h2>
      <p>Music content placeholder - coming soon!</p>
    </div>
  );
}

function Gigs() {
  return (
    <div className={styles.component}>
      <h2>Upcoming Shows</h2>
      <p>Gigs content placeholder - coming soon!</p>
    </div>
  );
}

function Merch() {
  return (
    <div className={styles.component}>
      <h2>Merchandise</h2>
      <p>Merch content placeholder - coming soon!</p>
    </div>
  );
}

function Contact() {
  return (
    <div className={styles.component}>
      <h2>Contact</h2>
      <p>Contact content placeholder - coming soon!</p>
    </div>
  );
}

// Bandcamp Player Component
function BandcampPlayer() {
  return (
    <div className={styles.bandcampPlayer}>
      <iframe
        style={{ border: 0, width: '100%', height: '120px' }}
        src="https://bandcamp.com/EmbeddedPlayer/album=958982629/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
        seamless
      >
        <a href="https://bog-band.bandcamp.com/album/vanity-project">Vanity Project by bog band</a>
      </iframe>
    </div>
  );
}

// Main Component
export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const renderRightContent = () => {
    switch (activeSection) {
      case 'home':
        return null; // No right content for home, just slideshow
      case 'music':
        return <Music />;
      case 'shows':
        return <Gigs />;
      case 'merch':
        return <Merch />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Bog Band</title>
        <meta name="description" content="Official website for Bog Band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className={styles.main}>
        <SlideShow />
        <div className={styles.rightContent}>
          {renderRightContent()}
          <BandcampPlayer />
        </div>
      </main>
    </div>
  );
}
