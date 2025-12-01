import React from 'react';

function Loading() {
    return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
}

export default Loading;
