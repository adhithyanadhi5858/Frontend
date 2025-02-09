import { useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 59,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
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
                <tr key={item.id}>
                  <td className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button className="btn btn-success btn-sm mr-2">Add to Cart</button>
                    <button onClick={() => removeFromWishlist(item.id)} className="btn btn-error btn-sm">
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

