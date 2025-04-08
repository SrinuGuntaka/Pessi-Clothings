import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Container, Button, Card, Offcanvas, ListGroup } from 'react-bootstrap';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBox, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSidebar, setShowSidebar] = useState(!!user);

  // Effect to update user data when login/register modals change
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // ✅ Clear old user data on login
    if (storedUser) {
      localStorage.removeItem('cart');      // Clear old cart
      localStorage.removeItem('wishlist');  // Clear old wishlist
      localStorage.setItem('orders', JSON.stringify([]));  // Reset orders
    }
  }, [showLogin, showRegister]); // Triggered when login/register modal is closed

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          localStorage.removeItem('user'); // ✅ Remove only user info
        }
  
        setUser(null);
  
        Swal.fire({
          title: 'Logged Out Successfully!',
          text: 'You have been logged out.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          setShowSidebar(false);
          navigate('/login'); // Redirect to login page
        });
      }
    });
  };
  

  return (
    <Container className="mt-4 text-center">
      {user ? (
        <>
          {/* Offcanvas Sidebar */}
          <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title><FaUser /> Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Card className="text-center border-0">
                <Card.Body>
                  <h4 className="mt-2">{user.name}</h4>
                  <p className="text-muted">{user.email}</p>
                </Card.Body>
              </Card>
              
              <ListGroup className="mt-3">
                <ListGroup.Item action onClick={() => navigate('/orders')}>
                  <FaBox /> Your Orders
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/wishlist')}>
                  <FaHeart /> Your Wishlist
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/cart')}>
                  <FaShoppingCart /> Your Cart
                </ListGroup.Item>
              </ListGroup>

              <Button variant="danger" className="mt-3 w-100" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        <div>
          <h2><FaUser /> Profile</h2>
          <p>Please login to view your profile.</p>
          <Button className="gradient-btn m-2 w-50" onClick={() => setShowLogin(true)}>
            <FaSignInAlt /> Login
          </Button>
          <Button className="gradient-btn m-2 w-50" onClick={() => setShowRegister(true)}>
            <FaUserPlus /> Register
          </Button>
          <Login show={showLogin} handleClose={() => setShowLogin(false)} setShowRegister={setShowRegister} />
          <Register show={showRegister} handleClose={() => setShowRegister(false)} setShowLogin={setShowLogin} />
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;
