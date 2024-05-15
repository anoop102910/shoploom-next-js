"use client";
import { Icon } from "@iconify/react";
import React from "react";

function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      type="submit"
      className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {!loading ? (
        children
      ) : (
        <Icon icon="tdesign:load" className="animate-spin text-2xl font-bold mx-auto text-center" />
      )}
    </button>
  );
}

export default LoadingButton;
