import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { useLocation } from 'react-router-dom';

const ProductsPage = ({ category: defaultCategory }) => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'all');
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
  const userCartKey = `cart_${user?.email}`;
  const userWishlistKey = `wishlist_${user?.email}`;

  const fetchProducts = async () => {
    try {
      let url = 'https://pessi-clothing.onrender.com/api/products?';
      if (activeCategory && activeCategory !== 'all') {
        url += `category=${activeCategory}&`;
      }
      if (searchQuery) {
        url += `search=${searchQuery}&`;
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [activeCategory, searchQuery]);

  // Updated add-to-cart with user-specific localStorage key
  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please log in to add items to the cart.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    const index = cart.findIndex(item => item.product._id === product._id);
    
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));
    alert(`Added ${product.name} to cart!`);
  };

  // Updated add-to-wishlist with user-specific localStorage key
  const handleAddToWishlist = (product) => {
    if (!user) {
      alert('Please log in to add items to the wishlist.');
      return;
    }

    let wishlist = JSON.parse(localStorage.getItem(userWishlistKey)) || [];
    const exists = wishlist.some(item => item._id === product._id);
    
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem(userWishlistKey, JSON.stringify(wishlist));
      alert(`Added ${product.name} to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  const categories = ['men', 'women', 'kids'];

  return (
    <Container className="mt-4">
      <CategoryTabs 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart} 
                onAddToWishlist={handleAddToWishlist} 
              />
            </Col>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;
