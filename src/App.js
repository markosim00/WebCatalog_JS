import React, { useState} from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {

  const [currentPage, setCurrentPage] = useState('list');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('details');
  };

  const handleGoBack = () => {
    setSelectedProductId(null);
    setCurrentPage('list');
  };

  return (
    <div>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    <div className="App">
      {currentPage === 'list' ? (
        <ProductList onProductClick={handleProductClick} />
      ) : (
        <ProductDetails productId={selectedProductId} goBack={handleGoBack} />
      )}
    </div>
    </div>
  );
}

export default App;
