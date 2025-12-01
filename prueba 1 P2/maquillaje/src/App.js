import React from 'react';
import { useFetch } from './hooks/useFetch';
import { getProducts } from "./services/productService";
import ProductList from "./components/ProductList";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import "./styles/app.css";

function App() {
  const { data: productos, loading, error } = useFetch(getProducts);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1 className="text-center mb-4">Catálogo de Productos</h1>
        
        {loading && <Loading />}
        
        {error && (
            <div className="alert alert-danger text-center" role="alert">
                Error: {error}
            </div>
        )}
        
        {!loading && !error && <ProductList productos={productos} />}
      </div>
    </div>
  );
}

export default App;
