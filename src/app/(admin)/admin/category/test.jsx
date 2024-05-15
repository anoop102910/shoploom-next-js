"use client";
import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

function NewCategory() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/categories", formData);
      toast.success("Category created successfully");
    } catch (error) { 
      console.log(error);
      toast.error(error.message);
    }
    console.log("Form data:", formData);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="w-full mx-auto max-w-lg p-4 rounded-lg sm:p-6">
        <h5 className="text-3xl font-medium text-slate-800 mb-6">Add a new category</h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium ">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-slate-700 text-slate-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="Category name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 font-medium ">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-transparent border border-slate-700 text-slate-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="Category description"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCategory;
