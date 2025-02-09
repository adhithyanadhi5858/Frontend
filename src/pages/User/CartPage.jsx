import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Link, useNavigate } from 'react-router-dom'


function CartPage() {

  const [cart, setCart] = useState()

  const navigate = useNavigate

  const fetchCart = () => {
    axiosInstance.get("/cart/all-cart-items")
      .then(res => {
        console.log("res==", res)
        setCart(res.data)
      })
      .catch(err => {
        console.log("Error==", err)
      })
  }

  const deleteItems = (productId) => {
    axiosInstance.delete("/cart/remove-cart-item", productId)
      .then(res => {
        alert(res.data.message)
      })
      .catch(err => {
        console.log("err==", err)
      })
  }

  const checkoutHandler = () => {
    navigate('/');
  }

  useEffect(() => {
    fetchCart()
  }, [])


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
              <img src={item.images[0]?.url} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <Link to={`/product/${item._id}`} className="flex-1 ml-4 text-gray-800">{item.name}</Link>
              <p className="text-gray-700">${item.price}</p>
              <p className="text-gray-600">Qty: {item.qty}</p>
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
              Total: ${cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
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
