import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import './Auth.css';

const Login = ({ show, handleClose, setShowRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://pessi-clothing.onrender.com/api/users/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
      const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

      localStorage.setItem(`cart_${user.email}`, JSON.stringify(savedCart));
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(savedWishlist));
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(savedOrders));

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back! Redirecting to homepage...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        handleClose();
        navigate('/');
      });

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    handleClose();
    setShowRegister(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderLeft: 'none', transition: '0.3s ease' }}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button className="gradient-btn w-100 mt-3" type="submit">
            Login
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p>Don't have an account?</p>
          <Button
            variant="link"
            className="text-dark text-decoration-none border border-3 border-black btn btn-outline-warning"
            onClick={handleRegisterRedirect}
          >
            Register here
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
