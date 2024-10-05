// components/Carousel.js
import React from 'react';

export default function Carousel() {
  return (
    <div style={styles.carousel}>
      <img src="https://via.placeholder.com/600x200" alt="Carousel 1" />
      <img src="https://via.placeholder.com/600x200" alt="Carousel 2" />
      <img src="https://via.placeholder.com/600x200" alt="Carousel 3" />
    </div>
  );
}

const styles = {
  carousel: { display: 'flex', overflowX: 'scroll', gap: '1rem', padding: '1rem' }
};
