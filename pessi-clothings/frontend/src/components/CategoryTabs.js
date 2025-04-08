// client/src/components/CategoryTabs.js

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <Tabs activeKey={activeCategory} onSelect={(k) => onSelectCategory(k)} className="mb-3">
      <Tab eventKey="all" title="All"></Tab>
      {categories.map((cat) => (
        <Tab key={cat} eventKey={cat} title={cat.charAt(0).toUpperCase() + cat.slice(1)}></Tab>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
