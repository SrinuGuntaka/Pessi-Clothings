import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTshirt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Container className="my-5 ">
        <Card 
          className="p-4 shadow-lg border-0"
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            borderRadius: '15px', 
            backdropFilter: 'blur(10px)' 
          }}
        >
          <h2 className="text-center mb-4" 
              style={{ fontWeight: 'bold', fontSize: '2rem', color: '#90EE90' }}>
            About <span style={{ color: '#3742fa' }}>Pessi Clothing's</span>
          </h2>
          <p 
            style={{ 
              fontSize: '1.1rem', 
              textAlign: 'center', 
              fontStyle: 'italic',
              color: '#2f3542' 
            }}
          >
            Welcome to <strong>Pessi Clothings</strong>, your ultimate destination for trendy and high-quality apparel.
            We offer a wide variety of stylish clothing for men, women, and kids, ensuring comfort and fashion go hand in hand.
          </p>

          {/* Contact Information */}
          <h4 className="mt-4 text-center text-primary">📞 Contact Us</h4>
          <p className="hover-effect"><FaEnvelope /> Email: <a className='text-decoration-none text-dark fw-bold' href="mailto:guntakasrinu768@gmail.com">guntakasrinu768@gmail.com</a></p>
          <p className="hover-effect"><FaPhone /> Phone: <a className='text-decoration-none text-dark fw-bold' href="tel:+916301108437">6301108437</a></p>
          <p className="hover-effect"><FaMapMarkerAlt /> Address: <span className="fw-bold text-dark">Lakkavaram, Prakasam Dist, Andhra Pradesh, India</span></p>

          {/* Available Clothing Types */}
          <h4 className="mt-4 text-center text-primary">👕 Available Clothing Categories</h4>
          <ul className="list-unstyled text-center">
            <li className="hover-effect"><FaTshirt /> <strong>Men's Wear:</strong> Shirts, T-Shirts, Jackets, Hoodies, Jeans</li>
            <li className="hover-effect"><FaTshirt /> <strong>Women's Wear:</strong> Dresses, Tops, Kurtis, Skirts, Jeans, Sarees</li>
            <li className="hover-effect"><FaTshirt /> <strong>Kids' Wear:</strong> T-Shirts, Frocks, Shorts, Hoodies, Joggers</li>
            <li className="hover-effect"><FaTshirt /> <strong>Seasonal Wear:</strong> Winter Jackets, Raincoats, Summer Collection</li>
            <li className="hover-effect"><FaTshirt /> <strong>Formal Wear:</strong> Office Suits, Blazers, Ethnic Wear</li>
          </ul>

          <p className="text-center mt-4 fw-bold fs-5" style={{ color: '#e84118' }}>
            Visit <span style={{ color: '#3742fa' }}>Pessi Clothings</span> today and redefine your style! ✨
          </p>
        </Card>
      </Container>

      {/* Custom Hover Effects */}
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
            color: #ff4757;
            transform: scale(1.05);
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
