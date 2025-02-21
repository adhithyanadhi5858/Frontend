import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";


const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { productId } = params
  const [review, setReview] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5); // Default rating



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

 // Fetch reviews
 const fetchReviews = async () => {
  try {
    console.log("Fetching reviews for product:", productId);
    const res = await axiosInstance.get(`/api/review/get-review/${productId}`);
    setReview(res.data.reviews); 
    console.log("Review Data:", res.data.reviews);
  } catch (error) {
    console.error("Review Fetch Error:", error);
  }
};

  useEffect(() => {
    fetchProduct();
  }, []);


  useEffect(() => {
    fetchReviews()
  },[productId])


  // // add to cart
  const AddToCart = async () => {
    const respones = await axiosInstance.post("api/cart/add-to-cart",{productId})
    console.log(respones.data)
    alert(respones.data.message)
  }




  //add to whishlist
  const addToWhish = ()=>{
    axiosInstance.post("/api/whish-list/add-to-whish-list",{productId})
    .then(res=>{
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err=>{
      console.log(err)
    })
  }


  // add comment
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/review/add-review", { 
        productId, 
        comment, 
        rating 
      });

      alert(res.data.message);
      setComment(""); // Clear input
      setRating(5); // Reset rating
      fetchReviews(); // Refresh reviews list
    } catch (error) {
      console.error("Add Review Error:", error);
      alert("Failed to add review.");
    }
  };

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
            <button  onClick={addToWhish} className="btn btn-accent">Add To Whishlist</button>
          </div>

                    
        </div>
      </div>


        {/* Add Review Section */}
        <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>
        <form onSubmit={handleAddReview} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="textarea textarea-bordered w-full"
          ></textarea>

          <div>
            <label className="block mb-1">Rating:</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))} 
              className="select select-bordered"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      </div>

       {/* Product Reviews */}
       <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {review.length > 0 ? (
          review.map((reviewItem, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <p className="text-gray-700">{reviewItem.comment}</p>
              <p className="text-sm text-gray-500">- {reviewItem.userId?.name || "Anonymous"}</p>
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
