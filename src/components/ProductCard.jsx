import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (products) => {
  return (
    <div className="card glass w-96">
      <figure>
        <img
          src={products.image}
          alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{products.title} </h2>
        <p>{products.description} </p>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary">Buy now!</Link>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
