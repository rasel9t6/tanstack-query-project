import { useState } from 'react';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <div className='flex m-2'>
      <AddProduct />
      <ProductList
        setShowDetails={setShowDetails}
        setSelectedProductId={setSelectedProductId}
        showDetails={showDetails}
      />
      <ProductDetails id={selectedProductId} />
    </div>
  );
}

export default App;
