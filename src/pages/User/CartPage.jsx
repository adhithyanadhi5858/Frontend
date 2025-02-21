import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";


function CartPage() {

  const [cart, setCart] = useState([])



  const fetchCart = () => {
    axiosInstance.get("/api/cart/all-cart-items")
      .then(res => {
        setCart(res.data)

      })
      .catch(err => {
        console.log("Error==", err)
      })
  }

  const deleteItems = (cartId) => {
    axiosInstance.delete("api/cart/remove-cart-item", { data: { cartId } })
      .then(res => {
        alert(res.data.message);
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



  //make payment
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const session = await axiosInstance.post('/api/payment/create-checkout-session', {
        products: cart.map(item => ({
          id: item.productId._id,
          name: item.productId.title,
          image:item.productId.image,
          price: parseFloat(item.productId.price),
          quantity: item.count,
        })),
      });

      console.log(session, "=======session");
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  



  return (
    <div className="container mx-auto p-6">
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
              <p className="text-gray-600">Qty: {item.count}</p>
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
              onClick={ makePayment}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage
