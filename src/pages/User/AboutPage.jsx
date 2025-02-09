import React from "react";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-primary">About Vibbora</h1>
        <p className="text-lg text-gray-600 text-center">
          Welcome to <span className="font-semibold text-secondary">Vibbora</span>, your trusted online shopping destination since <span className="font-bold">2025</span>. 
          We aim to revolutionize e-commerce with high-quality products, an intuitive shopping experience, and top-tier customer service.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="p-4 bg-primary text-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-sm">To create a seamless and innovative shopping experience for customers worldwide.</p>
          </div>
          <div className="p-4 bg-secondary text-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Why Choose Us?</h3>
            <p className="text-sm">Curated products, secure transactions, and exceptional customer support.</p>
          </div>
        </div>

        <div className="text-center">
          <Link to={"/products"} className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

