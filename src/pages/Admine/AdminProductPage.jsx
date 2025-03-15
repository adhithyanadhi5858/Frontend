import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [create, setCreate] = useState(false)

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !quantity || !image) {
      toast.error("All fields are required!");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const res = await axiosInstance.post("api/products/create-products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Product Created Successfully!");
      setTitle("");
      setPrice("");
      setQuantity("");
      setImage(null);
      setDescription("");
      fetchProducts();
      setCreate(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("api/products/admine-all-products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`api/products/delete/${id}`);
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product!");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading Products...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">Admin Products</h2>

      {!create ? (<button onClick={() => setCreate(true)} className="bg-green-500 text-white p-2 rounded">Create Product</button> )

        : (<div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create Product</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded w-full ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
         <div>
         <button  className="bg-blue-500 text-white p-2 rounded w-full mt-5" onClick={()=>setCreate(false)} >Cancel</button>
         </div>
        </div>
         
        )

      }

      {/* Product Table */}
      <div className="overflow-x-auto mt-12">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">{product._id}</td>
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.quantity > 0 ? product.quantity : "Out Of Stock"}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                  <Link to={`update/${product._id}`} className="bg-yellow-500 text-white p-2 rounded">
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;

