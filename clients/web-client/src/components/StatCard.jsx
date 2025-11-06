import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
