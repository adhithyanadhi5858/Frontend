import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";


const WishlistPage = () => {

  const [wishlist,setWishlist] = useState([])
 
  const getWhishlist = ()=>{
    axiosInstance.get("/api/whish-list/all-whish-list")
    .then(res=>{
       setWishlist(res.data)
      console.log(wishlist)
    })
    .catch(error=>{
      console.log(error)
    })
  }
   
  useEffect(()=>{
    getWhishlist()
    
  },[])



  const AddToCart = async (productId) => {
    try {
      if (!productId) {
        alert("Invalid product ID");
        return;
      }
  
      const response = await axiosInstance.post("/api/cart/add-to-cart", { productId });
  
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Something went wrong, please try again.");
    }
  };
  

  const removeFromWishlist = (id)=>{
    axiosInstance.delete(`/api/whish-list/delete/${id}`)
    .then(res=>{
      alert(res.data.message)
      getWhishlist()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id}>
                  <td className="flex items-center space-x-4">
                    <img src={item?.productId?.image} alt={item?.productId?.title} className="w-12 h-12 rounded" />
                    <span>{item?.productId?.title}</span>
                  </td>
                  <td>${item?.productId?.price}</td>
                  <td>
                    <button onClick={()=>AddToCart(item?.productId?._id)} className="btn btn-success btn-sm mr-2">Add to Cart</button>
                    <button onClick={() => removeFromWishlist(item?._id)} className="btn btn-error btn-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

