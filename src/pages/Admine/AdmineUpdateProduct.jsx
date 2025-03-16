import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminUpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axiosInstance.get(`api/products/product-details/${productId}`);
        setProduct(res.data.product);
      } catch (err) {
        setError("Failed to fetch product details");
        toast.error("Failed to fetch product details");
      }
    };
    fetchProductById();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("quantity", product.quantity);
      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await axiosInstance.put(`/api/products/update/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully!");
      navigate("/admine/products");
    } catch (err) {
      setError("Error updating product. Please try again.");
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-12 mb-12">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Product</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="space-y-4">
        <input type="text" name="title" value={product.title || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder={product.title} />

        <input type="number" name="price" value={product.price || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Price" />

        <textarea name="description" value={product.description || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Description"></textarea>

        <input type="number" name="quantity" value={product.quantity || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Stock" />

        <input type="file" onChange={handleFileChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          accept="image/*" />

        {product.image && typeof product.image === "string" && (
          <div className="flex justify-center mt-4">
            <img src={product.image} alt="Product" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          </div>
        )}

        <button onClick={handleUpdate} disabled={loading}
          className={`w-full p-3 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
