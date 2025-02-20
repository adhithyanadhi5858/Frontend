import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  //start
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("")

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!title || !price || !quantity || !image) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("description", description)

    try {
      axiosInstance.post("api/products/create-products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(res => {
          alert("Product Created Successfully!")
          setMessage(res.data.message || "Product Created Successfully!");
          setTitle("");
          setPrice("");
          setQuantity("");
          setImage(null);
          fetchProducts()

        })
        .catch(err => {
          console.log(err)
        })



    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  //end

  const fetchProducts = async () => {
    try {
      axiosInstance.get("api/products/admine-all-products")
        .then(res => {
          setProducts(res.data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch Products
  useEffect(() => {

    fetchProducts();
  }, []);

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      axiosInstance.delete(`api/products/delete/${id}`)
        .then(res => {
          alert(res.data.message)
          fetchProducts()
        })
        .catch(err=>{
          console.log(err)
        })

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading Products...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Products</h2>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Product</h2>
        {message && <p className="text-green-500">{message}</p>}

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

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
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
            {products.map(product => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">{product._id}</td>
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-2"
                  >
                    <FaTrash /> Delete</button>
                    <Link to={`update/${product._id}`}
                      className="bg-yellow-500 text-white p-2 rounded">
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
