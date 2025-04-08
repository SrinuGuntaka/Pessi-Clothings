import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get current user
  const userCartKey = `cart_${user?.email}`;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
      setCart(savedCart);
    }
  }, [user]);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handleBuyNow = (product, quantity) => {
    navigate('/payments', { state: { product: { ...product, quantity } } });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">My Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => (
              <Col key={item.product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
                  <Card.Img
                    variant="top"
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.product.name}</Card.Title>
                    <Card.Text>${item.product.price.toFixed(2)}</Card.Text>
                    <Form.Group controlId={`quantity-${item.product._id}`}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.product._id, parseInt(e.target.value))
                        }
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.product._id)}>
                        Remove
                      </Button>
                      <Button variant="success" size="sm" onClick={() => handleBuyNow(item.product, item.quantity)}>
                        Buy Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h4 className="text-center mt-4">Total: ${calculateTotal()}</h4>
        </>
      )}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </Container>
  );
};

export default CartPage;
