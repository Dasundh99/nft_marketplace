import React from "react";

export const StatusCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="p-4 rounded-xl bg-blue-50 border text-center shadow-sm">
    <h3 className="font-semibold text-gray-700">{title}</h3>
    <p className="text-xl font-bold text-blue-700 mt-1">{value || "N/A"}</p>
  </div>
);
