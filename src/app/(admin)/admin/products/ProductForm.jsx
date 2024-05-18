"use client";
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
import UploadImage from "@/components/shared/uploadimage";
import { useBrands, useCategories } from "@/lib/data";

const ProductForm = ({ onSubmit, product, type, searchParams }) => {
  const [formData, setFormData] = useState({
    title: product ? product.title : "",
    description: product ? product.description : "",
    price: product ? product.price : "",
    quantity: product ? product.quantity : "",
    discount: product ? product.discount : "",
    categoryName: product ? product.category.name : "",
    brandName: product ? product.brand.name : "",
    image: product ? product.image : "",
  });
  const [pending, setPending] = useState(false);
  const { categories, isLoading: categoryIsLoading } = useCategories();
  const {
    brands,
    isLoading: brandIsLoading,
    error,
  } = useBrands({ categoryId: formData.categoryId });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = categoryName => {
    const categoryId = categories.find(category => category.name === categoryName).id;

    setFormData(prevData => ({
      ...prevData,
      categoryName: categoryName,
      categoryId: categoryId,
      brandName: "",
    }));
  };

  const handleBrandChange = brandName => {
    const brandId = brands.find(brand => brand.name === brandName).id;

    setFormData(prevData => ({
      ...prevData,
      brandName: brandName,
      brandId: brandId,
    }));
  };

  const onProductSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    const updatedFormData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
      discount: formData.discount,
      categoryId: formData.categoryId,
      brandId: formData.brandId,
      image: formData.image,
    };

    setPending(true);
    if (type==='update') await onSubmit(product.id, updatedFormData);
    else await onSubmit(updatedFormData);
    setPending(false);
  };

  return (
    <form onSubmit={onProductSubmit}>
      <DialogHeader>
        <DialogTitle>{product ? "Update Product" : "Add Product"}</DialogTitle>
        <DialogDescription>
          {product ? "Update product details" : "Add a new product"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-8 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-left">
            Title
          </Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            id="title"
            placeholder="Product Title"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-left">
            Price
          </Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            id="price"
            placeholder="Product price"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-left">
            Quantity
          </Label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            id="quantity"
            placeholder="Product quantity"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discount" className="text-left">
            Discount
          </Label>
          <Input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            id="discount"
            placeholder="Product discount"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            id="description"
            placeholder="Product description"
            className="col-span-3"
            required
          />
        </div>
        {!categoryIsLoading && categories && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select
              className="w-full"
              value={formData.categoryName}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {!brandIsLoading && brands && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-left">
              Brand
            </Label>
            <Select className="w-full" value={formData.brandName} onValueChange={handleBrandChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map(brand => (
                  <SelectItem key={brand.id} value={brand.name}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="image" className="text-left">
            Image
          </Label>
          <UploadImage
            image={formData.image}
            onImageSelect={image => setFormData({ ...formData, image })}
            className={"col-span-3"}
          />
        </div>
      </div>
      <DialogFooter>
        <Button pending={pending} className="w-full" type="submit">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
