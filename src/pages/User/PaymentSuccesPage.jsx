// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import assuccessAnimation from "./../../assets/success.json"; // Add your animation file

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
//         <Lottie animationData={assuccessAnimation} loop={false} className="w-40 mx-auto" />

//         <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
//         <p className="text-gray-600 mt-2">Thank you for your purchase. Your order is confirmed.</p>

//         <button
//           onClick={() => navigate("/products")}
//           className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const PaymentSuccess = () => {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/public/successAnimation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
  
          <Lottie animationData={animationData} loop={false} className="w-40 h-40 mx-auto" />

        <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order is confirmed.</p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;



