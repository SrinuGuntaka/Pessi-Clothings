import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="m-2 w-100 shadow-sm border-0"
      style={{ borderRadius: '10px', overflow: 'hidden', transition: 'transform 0.3s ease' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Image Clickable */}
      <div 
        style={{ overflow: 'hidden', cursor: 'pointer' }} 
        onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
      >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '250px', objectFit: 'cover' }}
        />
      </div>

      <Card.Body>
        {/* Title Clickable */}
        <Card.Title 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
        >
          {product.name}
        </Card.Title>

        <Card.Text>
          <span style={{ color: '#ffa502', fontWeight: 'bold' }}>Rating: {product.rating}</span>
          <br />
          <span style={{ textDecoration: product.discount > 0 ? 'line-through' : 'none', color: product.discount > 0 ? '#888' : '#000' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span style={{ marginLeft: '5px', color: '#ff4757', fontWeight: 'bold' }}>
              ${ (product.price - product.price * (product.discount / 100)).toFixed(2) }
            </span>
          )}
        </Card.Text>

        {/* Buttons work separately */}
        <div className="d-flex justify-content-between gap-1 text-nowrap ">
          <Button variant="primary" size="sm" onClick={() => onAddToCart(product)}>Add to Cart</Button>
          <Button variant="outline-danger" size="sm" onClick={() => onAddToWishlist(product)}>Wishlist</Button>
          <Button variant="success" size='sm' onClick={() => navigate('/payments', { state: { product } })}>Buy Now</Button>

        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

