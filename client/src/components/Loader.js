import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader({loader}) {
    if (!loader) return null;
    return (
        <div className="position-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center bgTransparent">
          <Spinner
           animation="grow" variant="primary" />
          <span className="text-white">Loading</span>
        </div>
    )
}
