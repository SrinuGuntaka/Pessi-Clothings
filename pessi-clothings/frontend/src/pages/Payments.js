import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure product data is safely accessed
  const product = location.state?.product || { name: 'Unknown Product', price: 0, discount: 0, image: 'default-image.jpg' };

  // State for form fields
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Ref for scrolling to top
  const alertRef = useRef(null);

  // Scroll to top when alert is shown
  useEffect(() => {
    if (showAlert && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAlert]);

  // Handle address input change
  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Handle payment submission
  const handlePayment = () => {
    if (!paymentMethod) {
      setErrorMessage('❌ Please select a payment method!');
      return;
    }

    if (Object.values(address).some(value => !value.trim())) {
      setErrorMessage('❌ Please fill all address fields!');
      return;
    }

    // Retrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setErrorMessage('❌ User not found. Please log in again.');
      return;
    }

    const userOrdersKey = `orders_${user.email}`;
    const order = {
      product,
      address,
      paymentMethod,
      status: 'Order Placed',
      orderDate: new Date().toLocaleDateString(),
    };

    let orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    orders.push(order);
    localStorage.setItem(userOrdersKey, JSON.stringify(orders));

    setErrorMessage('');
    setShowAlert(true);

    // Wait for localStorage to fully update, then navigate
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  return (
    <Container className="mt-5">
      {/* Scroll Target */}
      <div ref={alertRef}></div>

      <h2 className="text-center">Complete Your Payment</h2>

      {showAlert && <Alert variant="success">✅ Payment Successful! Redirecting...</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row className="d-flex justify-content-center">
        {/* Product Details */}
        <Col md={5} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src={product?.image} alt={product?.name} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <p>
                <strong>Price:</strong> $
                {product.price
                  ? (product.discount > 0
                      ? (product.price - product.price * (product.discount / 100)).toFixed(2)
                      : product.price.toFixed(2))
                  : '0.00'}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment & Address Form */}
        <Col md={7}>
          <Card className="shadow-sm border-0 p-3">
            <h4>Shipping Address</h4>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="name" value={address.name} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phone" value={address.phone} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" name="street" value={address.street} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={address.city} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={address.state} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" name="pincode" value={address.pincode} onChange={handleInputChange} required />
              </Form.Group>
            </Form>

            <h4 className="mt-4">Payment Method</h4>
            <Form>
              <Form.Check
                type="radio"
                label="💳 Credit/Debit Card"
                name="paymentMethod"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="🏦 Net Banking"
                name="paymentMethod"
                value="Net Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="📱 UPI (Google Pay, PhonePe, Paytm)"
                name="paymentMethod"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="🚚 Cash on Delivery (COD)"
                name="paymentMethod"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form>

            <Button variant="success" className="mt-3 w-100" onClick={handlePayment}>
              Proceed to Pay
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payments;
