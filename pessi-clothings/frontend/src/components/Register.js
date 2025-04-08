import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import './Auth.css';

const Register = ({ show, handleClose, setShowLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password) => {
    // Password strength: 8+ characters, upper, lower, number, special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    try {
      const res = await axios.post('https://pessi-clothing.onrender.com/api/users/register', { name, email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));

      Swal.fire({
        title: 'Registration Successful!',
        text: 'Welcome! Redirecting to homepage...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        handleClose();
        navigate('/');
      });

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

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
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
            <Form.Text className="text-muted">
              Must be 8+ characters with uppercase, lowercase, number & special char.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button className="gradient-btn w-100" type="submit">Register</Button>
        </Form>

        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <Button 
            variant="link" 
            className="text-dark text-decoration-none border border-3 border-black btn btn-outline-warning" 
            onClick={() => { handleClose(); setShowLogin(true); }}
          >
            Login here
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
