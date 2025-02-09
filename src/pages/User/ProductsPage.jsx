import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/User/ProductCard';
import { axiosInstance } from '../../config/axiosInstance';


function ProductsPage() {
  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    try {

      axiosInstance.get("/api/products/all-products")
        .then(res => {
          setProducts(res.data)
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product, index) => (
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
