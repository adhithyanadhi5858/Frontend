import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { axiosInstance } from '../config/axiosInstance';


function HomePage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axiosInstance({
      method: "GET",
      url: "/products/all-products"
    })
    console.log(response);
    

  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (

    <h1 className='text-red-500'>Home</h1>

  );
};

export default HomePage;
