// client/src/components/OffersCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPercent } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OffersCard = () => {
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
      <Card.Body style={{ background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', color: '#fff' }}>
        <FaPercent size={48} color="#fff" />
        <Card.Title className="mt-3">Offers</Card.Title>
        <Card.Text>Enjoy exclusive offers and deals.</Card.Text>
        <Button
          variant="light"
          style={{ borderRadius: '20px' }}
          onClick={() => navigate('/offers')}
        >
          View Offers
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OffersCard;
