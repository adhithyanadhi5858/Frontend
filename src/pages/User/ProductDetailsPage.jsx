import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { productId } = params
  const [review, setReview] = useState()
  const[comment,setComment ]=useState()

// fetch products
  const fetchProduct = async () => {
    try {
      axiosInstance.get(`/api/products/product-details/${productId}`)
        .then(res => {
          setProduct(res.data.product)
        })
        .catch(error => {
          console.log(error)
        })
    } catch (err) {
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };


  // fetchReview
  const fetchReviews = () => {
    axiosInstance.get(`/api/review/get-review/${productId}`)
      .then(res => {
        setReview(res.data)
      })
  }



  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchReviews()
  })


  // add to cart
  const AddToCart = () => {
    axiosInstance.post("/api/cart/add-to-cart", productId)
      .then(res => {
        alert(res.data.message)
      })
      .catch(error => {
        console.log("cart error===", error)
      })
  }
const InputHandler=(e)=>{
  

}
  // add comment
  const onSubmit =(e) => {
    e.preventDefault()
          try {
              axiosInstance.post("/api/review/add-review",comment,productId)
                  .then(res => {
                      alert(res.data.message)
                      console.log(res.data)
                  })
          } catch (error) {
              console.log(error)
          }
      }

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found!</p>;

  return (

    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product?.description}</p>
          <p className="text-lg font-semibold mt-4 text-green-600">
            ${product?.price}
          </p>

          <div className="mt-4 flex items-center space-x-2">
            <span className="badge badge-primary">{product?.category}</span>
            <span className="badge badge-secondary">
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label className="block mb-2 text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              max={product?.quantity}
              defaultValue="1"
              className="input input-bordered w-20"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button onClick={AddToCart} className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-secondary">Buy Now</button>
          </div>

          {/* Ratings */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Ratings:</p>
            <div className="rating rating-md">
              {Array.from({ length: 5 }).map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={i + 1 === Math.round(product?.rating)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Add Comment */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Add Your Comment</h3>
        <form action="" onSubmit={onSubmit} className="space-x-4 mt-6 flex">
          <input
           onChange={InputHandler}
            type="text"
            placeholder="Add Your Comment"
            className="input input-bordered input-primary w-full max-w-xs" />
            <input type="Submit"  className="btn btn-primary"/>
        </form>
      </div>


      {/* Product Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {review > 0 ? (
          review.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500">- {review.userId}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div >
  );

};

export default ProductDetails;
