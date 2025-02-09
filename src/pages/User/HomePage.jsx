import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";


const HomePage = () => {
 const [products, setProducts] = useState([]);

 const catogaries =[
  {
    name:"Electronics",
    image:"https://i.ytimg.com/vi/lqcsWt9PbTk/hqdefault.jpg"
  },
  {
    name:"kitchen",
    image:"https://cdn.create.vista.com/downloads/d28a7522-bbb6-45d2-8a4f-50b36523c99c_360.jpeg"
  },
  {
    name:"Home Decorations",
    image:"https://homafy.com/wp-content/uploads/2023/05/Modern-Home-Metal-Wall-Art.jpeg"
  },
  {
    name:"Cloths",
    image:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/clothing-design-template-324a5115798ed4de9b23c9d0e9a0f21c_screen.jpg?ts=1637016158"
  }

 ]


  const fetchProducts = async () => {
    try {

      axiosInstance.get("/api/products/all-products")
        .then(res => {
          setProducts(res.data)
          console.log(res.data)
          
        })
        .catch(err => {
          console.log("Erorr==", err)
        })


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gray-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="src/media/31TEA0qrUBL._SY445_SX342_QL70_FMwebp_.webp"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Hero Product"
          />
          <div>
            <h1 className="text-5xl font-bold">Shop the Latest Trends!</h1>
            <p className="py-6">
              Explore our exclusive collection and enjoy great deals on your
              favorite products.
            </p>
            <Link to={"/products"} className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {/* Product Card Example */}
          {products.map((item,index) => (
            <div key={item._id} className="card bg-white shadow-lg rounded-lg">
              <figure>
                <img
                  src={item.image}
                  alt="Product"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-500">${item.price}</p>
                <button className="btn btn-primary w-full">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
          {catogaries.map((category,index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg">
              <figure>
                <img
                  src={category.image}
                  alt="Category"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body text-center">
                <h3 className="text-lg font-bold">Category {category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Offers</h2>
        <p className="mb-4">Subscribe to get the latest deals and promotions.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-80"
        />
        <button className="btn btn-primary ml-2">Subscribe</button>
      </section>

    </div>
  );
};

export default HomePage;
