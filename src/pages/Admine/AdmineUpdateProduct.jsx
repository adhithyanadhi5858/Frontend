import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const AdminUpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    image: null, // For file upload
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchProductById = () => {
   try{
    axiosInstance.get(`api/products/product-details/${productId}`)
    .then((res) => {
      if (res.data) {

        setProduct(res.data);
        console.log(product);
        
      }

    })
    .catch((err) => setError("Failed to fetch product details"));

   }catch(error){
    console.log(error)
   }
  }

  useEffect(() => {
    fetchProductById()
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

      await axiosInstance.put(`/api/products/update/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res=>{
        alert(res.data.message);
        navigate("/admine/products");
      })

      
    } catch (err) {
      setError("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Product</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="space-y-4">
        <input type="text" name="title" value={product.title || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product Name" />

        <input type="number" name="price" value={product.price || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Price" />

        <textarea name="description" value={product.description || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"></textarea>

        <input type="number" name="quantity" value={product.quantity || ""} onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Stock" />

        <input type="file" onChange={handleFileChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          accept="image/*" />

        {product.image && (
          <div className="flex justify-center mt-4">
            <img src={URL.createObjectURL(productimage)} alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md" />
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
