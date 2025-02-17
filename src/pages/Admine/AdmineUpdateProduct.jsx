import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

const AdminUpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    axiosInstance.get(`/api/products/product-details/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`/api/products/update/${productId}`, product)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/admin/products");
      })
      .catch(err => console.error("Error updating product:", err));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>
      <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Product Name" />
      <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Price" />
      <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Description"></textarea>
      <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Category" />
      <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Stock" />
      <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
    </div>
  );
};

export default AdminUpdateProduct;
