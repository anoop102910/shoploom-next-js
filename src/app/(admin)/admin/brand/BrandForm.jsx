"use client";
import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/lib/data";

function BrandForm({ type, onSubmit, brand }) {
  const [formData, setFormData] = useState({
    name: brand ? brand.name : "",
    description: brand ? brand.description : "",
    categoryName: brand ? brand.categoryName : "",
  });
  const [pending, setPending] = useState(false);

  const { categories, isLoading: categoryIsLoading, error } = useCategories();

  const handleChange = async e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const categoryId = categories.find(category => category.name === formData.categoryName).id;
    const updatedformData = {
      name: formData.name,
      description: formData.description,
      categoryId: categoryId,
    };
    setPending(true);
    await onSubmit(updatedformData);
    setPending(false);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const updatedformData = {
      name: formData.name,
      description: formData.description,
    };
    setPending(true);
    await onSubmit(brand.id, updatedformData);
    setPending(false);
  };

  return (
    <form onSubmit={type == "add" ? handleSubmit : handleUpdate}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add Brand" : "Update Brand"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new brand" : "Update brand name and description"}
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
            placeholder="Brand Name"
            className="col-span-3"
          />
        </div>
        {categories && type == "add" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              className="w-full"
              value={formData.categoryName}
              onValueChange={value => setFormData({ ...formData, categoryName: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
            placeholder="Brand Description"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">{type === "add" ? "Add Brand" : "Update Brand"}</Button>
      </DialogFooter>
    </form>
  );
}

export default BrandForm;
