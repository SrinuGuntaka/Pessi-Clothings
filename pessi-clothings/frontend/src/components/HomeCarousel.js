// client/src/components/HomeCarousel.js

import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide1.jpg"
          alt="Women's Hot Fashion 1"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/slide7.jpg"
          alt="Women's Hot Fashion 2"
          style={{ height: '300px', objectFit: ' fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide2.jpg"
          alt="Women's Hot Fashion 3"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide6.jpg"
          alt="Women's Hot Fashion 3"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide3.jpg"
          alt="Women's Hot Fashion 3"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide5.jpg"
          alt="Women's Hot Fashion 3"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slide4.jpg"
          alt="Women's Hot Fashion 3"
          style={{ height: '300px', objectFit: 'fit' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
