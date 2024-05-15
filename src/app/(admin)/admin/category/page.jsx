"use client";
import React, { useEffect, useState } from "react";
import CategoryRow from "./row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useCategories } from "@/lib/data";

const CategoryList = ({ searchParams }) => {
  const query = searchParams.query;
  const { categories, error, isLoading, mutate } = useCategories(query);

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

  const handleSubmit = async () => {
    try {
      const res = await api.post("/categories", formData);
      mutate([...categories, res.data.data]);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ? error.response.data.message : "Something went wrong"
      );
    }
  };

  const handleCategoryDelete = async id => {
    try {
      await api.delete(`/categories/${id}`);
      mutate(categories.filter(category => category.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ? error.response.data.message : "Something went wrong"
      );
    }
  };

  const handleCategoryUpdate = async (id, formData) => {
    try {
      const res = await api.put(`/categories/${id}`, formData);
      mutate(
        categories.map(category =>
          category.id === id ? { ...category, ...res.data.data } : category
        )
      );
      toast.success("Category updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ? error.response.data.message : "Something went wrong"
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Categories</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add category</DialogTitle>
              <DialogDescription>Add a new category</DialogDescription>
            </DialogHeader>
            <form onSubmit={e=>e.preventDefault()}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="Apple"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    id="description"
                    placeholder="One of the top rated category in the market"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} type="submit">
                  Add{" "}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 rounded-md overflow-hidden">
          <thead className="text-xs uppercase bg-slate-700 text-slate-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-slate-800 focus:ring-offset-slate-800 focus:ring-2 bg-slate-700 border-slate-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <CategoryRow
                key={category.id}
                category={category}
                onDelete={handleCategoryDelete}
                onUpdate={handleCategoryUpdate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryList;
