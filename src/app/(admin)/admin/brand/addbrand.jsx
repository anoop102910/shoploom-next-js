"use client"
import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/data";

function AddBrand({ onAdd ,type}) {
  const { categories, isLoading: categoryIsLoading ,error} = useCategories();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryName: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onBrandAdd = () => {
    const categoryId = categories.find(category => category.name === formData.categoryName).id;
    const updatedformData = {
      name: formData.name,
      description: formData.description,
      categoryId: categoryId,
    };
    onAdd(updatedformData);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add brand</DialogTitle>
        <DialogDescription>Add a new brand</DialogDescription>
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
            placeholder="Apple"
            className="col-span-3"
          />
        </div>
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
              {categoryIsLoading
                ? "Loading..."
                : categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
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
            placeholder="One of the top rated brand in the market"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onBrandAdd} type="submit">
          Add{" "}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddBrand;
