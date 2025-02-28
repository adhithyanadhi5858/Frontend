import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5); // Default rating

  // Fetch product details
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/products/product-details/${productId}`);
      setProduct(res.data.product);
    } catch (err) {
      setError("Product not found.");
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/api/review/get-review/${productId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Review Fetch Error:", error);
      toast.error("Failed to load reviews.");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  // Add to Cart
  const addToCart = async () => {
    try {
      const response = await axiosInstance.post("/api/cart/add-to-cart", { productId });
      toast.success(response.data.message || "Added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  // Add to Wishlist
  const addToWishlist = async () => {
    try {
      const response = await axiosInstance.post("/api/whish-list/add-to-whish-list", { productId });
      toast.success(response.data.message || "Added to wishlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  // Add Review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/review/add-review", { productId, comment, rating });
      toast.success(res.data.message || "Review added successfully!");
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found!</p>;

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />

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
          <h2 className="text-3xl font-bold text-gray-800">{product?.title}</h2>
          <p className="text-gray-600 mt-2">{product?.description}</p>
          <p className="text-lg font-semibold mt-4 text-green-600">${product?.price}</p>

          <div className="mt-4 flex items-center space-x-2">
            <span className="badge badge-primary">{product?.category}</span>
            <span className={`badge ${product?.quantity > 0 ? "badge-success" : "badge-error"}`}>
              {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
            <button onClick={addToWishlist} className="btn btn-accent">Add To Wishlist</button>
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
        {reviews.length > 0 ? (
          reviews.map((reviewItem, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <p className="text-gray-700">{reviewItem.comment}</p>
              <p className="text-sm text-gray-500">- {reviewItem.userId?.name || "Anonymous"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

