import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Orders = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get current user
  const userOrdersKey = `orders_${user?.email}`;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(userOrdersKey);
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders)); // ✅ Parse orders correctly
        } catch (error) {
          console.error("Error parsing orders from localStorage:", error);
          setOrders([]); // Prevent crashes
        }
      }
    }
  }, [user]);

  const handleCancelOrder = (index) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.map((order, i) =>
        i === index ? { ...order, status: "Cancelled" } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">🛍️ Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders placed yet.</p>
      ) : (
        <Row>
          {orders.map((order, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="mb-3 shadow-sm">
                <Card.Img variant="top" src={order.product.image} />
                <Card.Body>
                  <Card.Title>{order.product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${order.product.price.toFixed(2)}<br />
                    <strong>Payment Method:</strong> {order.paymentMethod}<br />
                    <strong>Order Date:</strong> {order.orderDate}<br />
                    <strong>Status:</strong>{" "}
                    <span className={order.status === "Cancelled" ? "text-danger" : "text-success"}>
                      {order.status}
                    </span>
                  </Card.Text>
                  {order.status !== "Cancelled" && (
                    <Button variant="danger" onClick={() => handleCancelOrder(index)}>
                      ❌ Cancel Order
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Orders;
