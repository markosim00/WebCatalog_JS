import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductList.css'

const ProductList = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
      setProducts(response.data.products);
      const totalProducts = response.data.total;
      setTotalPages(Math.ceil(totalProducts/10));
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <ul className="product-list">
        <h1>Product list</h1>
        {products.map(product => (
          <li key={product.id} className="product-item" onClick={() => onProductClick(product.id)}>
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={page === index + 1 ? 'current-page' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        Next
      </button>
      </div>
    </div>
  );
};

export default ProductList;
