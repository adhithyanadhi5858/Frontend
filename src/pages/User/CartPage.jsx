import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";


function CartPage() {

  const [cart, setCart] = useState([])

  const fetchCart = () => {
    axiosInstance.get("/api/cart/all-cart-items")
      .then(res => {
        setCart(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log("Error==", err)
      })
  }


  // ✅ Function to update cart quantity
  const updateQuantity = (cartId, newCount) => {
    axiosInstance.put("/api/cart/update-cart-item", { cartId, count: newCount })
      .then(res => {
        fetchCart(); // Refetch cart to update UI
      })
      .catch(err => {
        console.log("Error updating cart quantity:", err);
      });
  };


  const deleteItems = (cartId) => {
    axiosInstance.delete("api/cart/remove-cart-item", { data: { cartId } })
      .then(res => {

        toast.success(res.data.message)
        fetchCart()
      })
      .catch(err => {
        console.log("Error deleting cart item:", err);
      });
  };


  const totalPrice = cart.reduce((acc, item) => {
    const price = item.productId?.price ? parseFloat(item.productId.price) : 0;
    const quantity = item.count ? parseInt(item.count) : 1;
    return acc + price * quantity;
  }, 0).toFixed(2);


  useEffect(() => {
    fetchCart()
  }, [])


  const clearCart = () => {
    axiosInstance.delete("/api/cart/clear-cart")
      .then(res => {
        setCart([]);  // Clear cart state in frontend
      })
      .catch(err => console.log("Error clearing cart:", err));
  };


  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const session = await axiosInstance.post('/api/payment/create-checkout-session', {
        products: cart.map(item => ({
          id: item.productId._id,
          title: item.productId.title,
          image: item.productId.image,
          price: parseFloat(item.productId.price),
          orderStatus: "Shipped",
          quantity: item.count,
        })),
      });

      const result = stripe.redirectToCheckout({ sessionId: session.data.sessionId });
      console.log(result)

      if (result.error) {
        console.log("Stripe Checkout Error:", result.error);
      } else {
        
        setTimeout(async () => {
          try {
            await axiosInstance.delete("/api/cart/clear-cart");
            setCart([]);  
            toast.success("Payment successful! Cart cleared.");
          } catch (error) {
            console.log("Error clearing cart after payment:", error);
          }
        }, 5000); 
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <h3 className="text-lg">Your cart is empty</h3>
          <Link to="/" className="text-blue-500 underline">Go Back</Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map(item => (
            <div key={item._id} className="flex items-center justify-between p-3 border-b">
              <img src={item.productId.image} alt={item.productId.title} className="w-16 h-16 object-cover rounded" />
              <Link to={`/product-details/${item.productId._id}`} className="flex-1 ml-4 text-gray-800">{item.productId.title}</Link>
              <p className="text-gray-700">${item.productId.price}</p>

              {/* ✅ Quantity Selector */}
              <select
                className="border rounded px-2 py-1"
                value={item.count}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(qty => (
                  <option key={qty} value={qty}>{qty}</option>
                ))}
              </select>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteItems(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-lg font-bold">
              Total: ${totalPrice}
            </h3>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={makePayment}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

