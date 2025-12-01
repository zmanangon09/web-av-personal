import React from 'react';
import ProductCard from "./ProductCard";

function ProductList({ productos }) {
    return (
        <div className="row">
            {productos.map((p) => (
                <ProductCard key={p.id} producto={p} />
            ))}
        </div>
    );
}

export default ProductList;
