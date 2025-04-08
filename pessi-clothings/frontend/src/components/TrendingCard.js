// client/src/components/TrendingCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TrendingCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      className="text-center shadow-sm border-0"
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Card.Body style={{ background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)', color: '#fff' }}>
        <FaFire size={48} color="#fff" />
        <Card.Title className="mt-3">Trending</Card.Title>
        <Card.Text>See what’s hot right now.</Card.Text>
        <Button
          variant="light"
          style={{ borderRadius: '20px' }}
          onClick={() => navigate('/trending')}
        >
          View Trending
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TrendingCard;
