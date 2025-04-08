import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile:'',
    message: ''
  });

  const [responseMsg, setResponseMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pessi-clothing.onrender.com/api/contact', formData);
      setResponseMsg({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '',mobile:'', message: '' });
    } catch (error) {
      setResponseMsg({ type: 'danger', text: 'Failed to send message. Try again later.' });
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #6DD5FA, #FFFFFF)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Container className="contact-container">
        <Card className="p-4 shadow-lg border-0" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#27ae60' }}>
            Contact <span style={{ color: '#2980b9' }}>Pessi Clothings</span>
          </h2>
          <p className="text-center text-muted fw-semibold">
            Have questions or feedback? We'd love to hear from you!
          </p>

          {responseMsg.text && <Alert variant={responseMsg.type}>{responseMsg.text}</Alert>}

          {/* Contact Information */}
          <h4 className="mt-4 text-center text-dark">📞 Get in Touch</h4>
          <p className="text-center hover-effect"><FaEnvelope /> Email: <a className='text-decoration-none fw-bold' href="mailto:guntakasrinu768@gmail.com">guntakasrinu768@gmail.com</a></p>
          <p className="text-center hover-effect"><FaPhone /> Phone: <a className='text-decoration-none fw-bold' href="tel:+916301108437">6301108437</a></p>
          <p className="text-center hover-effect"><FaMapMarkerAlt /> Address: Lakkavaram, Prakasam Dist, Andhra Pradesh, India</p>

          {/* Contact Form */}
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Mobile</Form.Label>
              <Form.Control type="number" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} rows={3} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Send Message</Button>
          </Form>
        </Card>
      </Container>

      {/* Custom Hover Effects & Responsive Styles */}
      <style>
        {`
          .hover-effect {
            font-size: 1rem;
            padding: 5px;
            transition: all 0.3s ease-in-out;
            color: #333;
            text-align: center;
          }
          .hover-effect:hover {
            color: #27ae60;
            transform: scale(1.05);
            cursor: pointer;
          }

          /* Responsive Width */
          .contact-container {
            width: 90%; /* Default for mobile */
            max-width: 600px;
          }

          @media (min-width: 768px) {
            .contact-container {
              width: 75%; /* Tablets */
              max-width: 700px;
            }
          }

          @media (min-width: 1024px) {
            .contact-container {
              width: 50%; /* PCs & Laptops */
              max-width: 800px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactPage;
