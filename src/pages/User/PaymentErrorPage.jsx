import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
// import errorAnimation from "../../assets/error-animation.json"; // Replace with your actual path

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center">
      {/* <div className="w-60 h-60">
        <Lottie animationData={errorAnimation} loop={true} />
      </div> */}
      <h2 className="text-3xl font-bold text-red-600 mt-4">Payment Failed</h2>
      <p className="text-gray-600 mt-2">Oops! Something went wrong with your transaction.</p>
      <button 
        onClick={() => navigate("/user/cart")} 
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
        Try Again
      </button>
    </div>
  );
};

export default PaymentError;
