import React from "react";
import { Link } from "react-router-dom";

export default function MainMenu({ title = "Menú", items = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h4 className="font-bold mb-3 text-teal-700">{title}</h4>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="p-3 rounded bg-green-50 hover:bg-green-100 transition"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
