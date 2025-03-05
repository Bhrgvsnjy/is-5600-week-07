import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  // Define state variables
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // Define the limit state variable and set it to 10
  const limit = 10;

  const filterTags = (tagQuery) => {
    const filtered = products.filter((product) => {
      if (!tagQuery) {
        return true; // Return all products if no tag is provided
      }
      return product.tags.some(({ title }) => title === tagQuery);
    });

    setOffset(0);
    setProducts(filtered);
  };

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
        />
        <Button text="Next" handleClick={() => setOffset((prev) => prev + limit)} />
      </div>
    </div>
  );
};

export default CardList;
