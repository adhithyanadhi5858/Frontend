import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {


  return (
    <div className="card glass w-96">
      <figure>
        <img
          src={props.products.image}
          alt= {props.products.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.products.title} </h2>
        <p>{props.products.description} </p>
        <p>${props.products.price} </p>
        <div className="card-actions justify-end">
          <Link to={`/product-details/${props.products._id}`} className="btn btn-primary">View Product</Link>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
