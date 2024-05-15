import React from "react";

export default function Error() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 border border-red-700 border-dashed rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
      </div>
    </div>
  );
}
