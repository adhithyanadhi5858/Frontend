import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactPage = () => {

   const { register, handleSubmit } = useForm();
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Contact Us</h2>
                <p className="text-center text-gray-600 mt-2">We'd love to hear from you!</p>

                <form className="mt-6 space-y-4" >
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            
                            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                        />
                        <p className="text-red-500 text-sm mt-1"></p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            
                            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                         <p className="text-red-500 text-sm mt-1"></p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Message</label>
                        <textarea
                            {...register("email")}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            placeholder="Write your message here..."
                        ></textarea>
                        <p className="text-red-500 text-sm mt-1"></p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;

