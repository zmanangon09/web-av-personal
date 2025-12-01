import React from 'react';

function ProductCard({ producto }) {
    return (
        <div className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
                <img 
                    src={producto.image_link} 
                    className="card-img-top p-3" 
                    alt={producto.name} 
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text text-muted small">
                        {producto.description ? producto.description.substring(0, 80) + "..." : "Sin descripción"}
                    </p>
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0 text-primary">${producto.price}</span>
                            <span className="badge bg-warning text-dark">
                                Valoración: {producto.rating ? producto.rating : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
