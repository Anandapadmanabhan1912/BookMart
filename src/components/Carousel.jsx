import React, { useState, useEffect } from 'react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "83_inr.jpg",
    "84_inr.jpg",
    "85_inr.jpg",
    "31_inr.jpg",
    "70_inr.jpg",
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carousel}>
        <img
          src={images[currentIndex]}
          alt={`Carousel ${currentIndex + 1}`}
          style={styles.image}
        />
      </div>
    </div>
  );
}

const styles = {
  carouselContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the image horizontally
    alignItems: 'center', // Center the image vertically
    height: '250px', // Set height for carousel container
    overflow: 'hidden', // Hide overflowing content
  },
  carousel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px', // Fixed width for carousel
    transition: 'transform 1s ease', // Smooth transition for rotation
  },
  image: {
    width: '1000px',
    height: '300px',
    objectFit: 'cover',
  },
};
