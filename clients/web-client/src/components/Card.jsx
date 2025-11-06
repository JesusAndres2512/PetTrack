import React from "react";

export default function Card({ title, description, buttonText, onClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-bold text-teal-700 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
