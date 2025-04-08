// client/src/components/Navbar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
  };

  return (
    <BootstrapNavbar className="navbar-custom" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/" className="nav-brand">
        Pessi Clothings
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/women" className="nav-link">
            Women
          </Nav.Link>
          <Nav.Link as={Link} to="/men" className="nav-link">
            Men
          </Nav.Link>
          <Nav.Link as={Link} to="/kids" className="nav-link">
            Kids
          </Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search for clothes..."
            className="mr-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className=' mx-2' variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Nav>
          <Nav.Link as={Link} to="/profile" className="nav-link">
            Profile
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
