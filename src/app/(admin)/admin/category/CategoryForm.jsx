"use client"
import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/data";

function CategoryForm({ type, onSubmit, category }) {
  const { categories, isLoading: categoryIsLoading, error } = useCategories();
  const [formData, setFormData] = useState({
    name: category ? category.name : "",
    description: category ? category.description : "",
  });
  const [pending,setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    await onSubmit(formData);
    setPending(false)
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setPending(true);
    await onSubmit(category.id, formData);
    setPending(false);
  };

  return (
    <form onSubmit={type === "add" ? handleSubmit : handleUpdate}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add Category" : "Update Category"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new category" : "Update category details"}
        </DialogDescription>
      </DialogHeader>
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
            placeholder="Category Name"
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
            placeholder="Category Description"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">{type === "add" ? "Add Category" : "Update Category"}</Button>
      </DialogFooter>
    </form>
  );
}

export default CategoryForm;
