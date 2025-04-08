import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || {});
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Update user dynamically
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    if (storedUser) {
      const userCartKey = `cart_${storedUser.email}`;
      const userWishlistKey = `wishlist_${storedUser.email}`;
      const userOrdersKey = `orders_${storedUser.email}`;
      
      setCart(JSON.parse(localStorage.getItem(userCartKey)) || []);
      setWishlist(JSON.parse(localStorage.getItem(userWishlistKey)) || []);
      setOrders(JSON.parse(localStorage.getItem(userOrdersKey)) || []);
    }
    
    fetchSimilarProducts();
    window.scrollTo(0, 0); // Move to top when product changes
  }, [product]); 

  // Fetch Similar Products
  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`https://pessi-clothing.onrender.com/api/products/similar/${product._id}`);
      setSimilarProducts(response.data);
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  // Show alert messages
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };

  // Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      showMessage('danger', 'Please log in first.');
      return;
    }

    let updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.product._id === product._id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
    showMessage('success', 'Product added to cart!');
  };

  // Add to Wishlist
  const handleAddToWishlist = () => {
    if (!user) {
      showMessage('danger', 'Please log in first.');
      return;
    }

    if (wishlist.some(item => item._id === product._id)) {
      showMessage('warning', 'Product is already in wishlist!');
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(updatedWishlist));
    showMessage('success', 'Product added to wishlist!');
  };

  // Buy Now (Adds to Orders)
  const handleBuyNow = () => {
    if (!user) {
      showMessage('danger', 'Please log in first.');
      return;
    }

    const updatedOrders = [...orders, { product, quantity: 1 }];
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedOrders));
    navigate('/payments', { state: { product } });
  };

  // Handle clicking on a similar product
  const handleSimilarProductClick = (similarProduct) => {
    setProduct(similarProduct);
    navigate(`/product/${similarProduct._id}`, { state: { product: similarProduct } });
  };

  return (
    <Container className="mt-5">
      {message.text && <Alert variant={message.type}>{message.text}</Alert>}

      <Row>
        <Col md={5}>
          <img src={product.image} alt={product.name} className="img-fluid rounded" />
        </Col>

        <Col md={7}>
          <h2>{product.name}</h2>
          <p><strong>Brand:</strong> {product.brand || 'No Brand Available'}</p>
          <p><strong>⭐ Rating:</strong> {product.rating}</p>
          <p>
            <span style={{ textDecoration: product.discount > 0 ? 'line-through' : 'none', color: product.discount > 0 ? '#888' : '#000' }}>
              ${product.price?.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span style={{ marginLeft: '10px', color: '#ff4757', fontWeight: 'bold' }}>
                ${ (product.price - product.price * (product.discount / 100)).toFixed(2) }
              </span>
            )}
          </p>

          <Form.Group controlId="colorSelect" className="mb-3">
            <Form.Label>Select Color</Form.Label>
            <Form.Select>
              <option>Red</option>
              <option>Blue</option>
              <option>Black</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="sizeSelect" className="mb-3">
            <Form.Label>Select Size</Form.Label>
            <Form.Select>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-3">
            <Button variant="outline-danger" onClick={handleAddToWishlist}>❤️ Wishlist</Button>
            <Button variant="primary" onClick={handleAddToCart}>🛒 Add to Cart</Button>
            <Button variant="success" onClick={handleBuyNow}>💳 Buy Now</Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Product Specifications</h4>
          <ul>
            <li><strong>Material:</strong> Cotton</li>
            <li><strong>Brand:</strong> {product.brand || 'No Brand'}</li>
            <li>Comfortable fit and stylish design</li>
          </ul>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Similar Products</h4>
          <Row>
            {similarProducts.length > 0 ? (
              similarProducts.map((similarProduct) => (
                <Col key={similarProduct._id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="shadow-sm border-0"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSimilarProductClick(similarProduct)}
                  >
                    <Card.Img variant="top" src={similarProduct.image} alt={similarProduct.name} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1rem' }}>{similarProduct.name}</Card.Title>
                      <p style={{ fontSize: '0.9rem', color: '#666' }}>⭐ {similarProduct.rating}</p>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No similar products found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
