import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Link, useNavigate } from 'react-router-dom'


function CartPage() {

  const [cart, setCart] = useState([])

  const navigate = useNavigate

  const fetchCart = () => {
    axiosInstance.get("/api/cart/all-cart-items")
      .then(res => {
        console.log("res==", res.data)
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

 

  const checkoutHandler = () => {
    navigate('/');
  }

  useEffect(() => {
    fetchCart()
   

  }, [])



  //make payment




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
            Total: ${cart.reduce((acc, item) => acc + item.productId.price * item.count, 0).toFixed(2) }
          
          </h3>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={checkoutHandler}
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
