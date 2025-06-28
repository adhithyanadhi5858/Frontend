import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlist = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/whish-list/all-whish-list");
      setWishlist(res.data);
    } catch (error) {
      toast.error("Failed to fetch wishlist.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      if (!productId) {
        toast.error("Invalid product ID");
        return;
      }

      const response = await axiosInstance.post("/api/cart/add-to-cart", { productId });
      toast.success(response.data.message || "Added to cart successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong, please try again.");
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/whish-list/delete/${id}`);
      toast.success(res.data.message || "Item removed from wishlist!");
      getWishlist();
    } catch (error) {
      toast.error("Failed to remove item from wishlist.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-center mb-6">Your Wishlist</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id}>
                  <td className="flex items-center space-x-4">
                    <img src={item?.productId?.image} alt={item?.productId?.title} className="w-12 h-12 rounded" />
                    <span>{item?.productId?.title}</span>
                  </td>
                  <td>${item?.productId?.price}</td>
                  <td>
                    <button
                      onClick={() => addToCart(item?.productId?._id)}
                      className="btn btn-success btn-sm mr-2"
                    >
                      Add to Cart
                    </button>
                    <button onClick={() => removeFromWishlist(item?._id)} className="btn btn-error btn-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;


