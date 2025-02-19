// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../components/User/ProductCard';
// import { axiosInstance } from '../../config/axiosInstance';


// function ProductsPage() {
//   const [products, setProducts] = useState([]);


//   const fetchProducts = async () => {
//     try {

//       axiosInstance.get("/api/products/all-products")
//         .then(res => {
//           setProducts(res.data)
//         })
//         .catch(err => {
//           console.log("Erorr==", err)
//         })


//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [])


//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//         {products.map((product, index) => (
//           <ProductCard key={product._id} products={product} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/User/ProductCard';
import { axiosInstance } from '../../config/axiosInstance';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // State for search term

  // Fetch products based on search term
  const fetchProducts = async (searchVal = "") => {
    try {
      const response = await axiosInstance.get("/api/products/all-products", {
        params: { search: searchVal }  // Passing search term to the backend
      });
      setProducts(response.data);  // Setting products state
    } catch (err) {
      console.log("Error==", err);
    }
  };

  // Fetch all products on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Update search term on input change
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);  // Fetch products based on search term
  };

  return (
    <>
      {/* Search Bar Section */}
      <section className="py-8 bg-200">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}  // Update searchTerm as user types
              placeholder="Search for products..."
              className="input input-bordered w-80 p-2"
            />
            <button
              type="submit"
              className="btn btn-primary ml-4"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Products Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} products={product} />
          ))
        ) : (
          <p className="text-center w-full">No products found.</p>
        )}
      </div>
    </>
  );
};

export default ProductsPage;

