import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css'



const ProductDetails = ({ productId, goBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevImage = () => {
    const currentIndex = product.images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentImage(product.images[prevIndex]);
  };

  const nextImage = () => {
    const currentIndex = product.images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setCurrentImage(product.images[nextIndex]);
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setCurrentImage(data.thumbnail);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!product) {
    return <div>Product not found.</div>; 
  }

  return (
    <div className="product-details">
      <strong>
      <h2 className="title">{product.title}</h2>
      <div className="image-gallery">
      <div className="price-and-discount">
         <p className="price-text"> ${product.price}</p>
         <p className="discount">-{product.discountPercentage}%</p>
      </div>
      <div className="focused-image-container">
        {/* Strelica leva */}
        <button className="arrow-button left" onClick={prevImage}>‹</button>
        {/* Glavna slika */}
        <img src={currentImage} alt={product.title} className="focused-image" id="focused-image" />
        {/* Dugme za maksimizaciju */}
        <button className="maximize-button" onClick={openModal}>
          ⛶
        </button>
        {/* Strelica desna */}
        <button className="arrow-button right" onClick={nextImage}>›</button>
      </div>
      {/* Thumbnail lista */}
      <div className="thumbnail-list">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} thumbnail`}
            className={`thumbnail ${img === currentImage ? 'active' : ''}`}
            onClick={() => setCurrentImage(img)}
          />
        ))}
      </div>
    </div>
      <p className="description">{product.description}</p>
      <table className="product-info-table">
        <tbody>
          <tr>
            <td><strong>Brand</strong></td>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <td><strong>Category</strong></td>
            <td>{product.category}</td>
          </tr>
          <tr>
            <td><strong>Rating</strong></td>
            <td>{product.rating}</td>
          </tr>
          <tr>
            <td><strong>In Stock</strong></td>
            <td>{product.stock}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={goBack} className="go-back-button">Go Back</button>
      </strong>
      {/* Modal za uvecanu sliku */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-image-container">
              {/* Dugmad za strelice */}
              <button className="modal-arrow-button left" onClick={prevImage}>‹</button>
              <img src={currentImage} alt={product.title} className="modal-image" />
              <button className="modal-arrow-button right" onClick={nextImage}>›</button>
            </div>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
