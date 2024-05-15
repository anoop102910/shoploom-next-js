"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import toast from "react-hot-toast";
import api from "@/lib/api";
import UploadImage from "@/components/shared/uploadimage";
function ProductRow({ product, onDelete, onUpdate }) {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    discount: product.discount,
    image: product.image,
    categoryName: product.category.name,
    brandName: product.brand.name,
    discount: product.discount,
    image: product.image,
  });
  const fetcher = url => api.get(url).then(res => res.data.data);
  const { data: categories, isLoading: categoryIsLoading } = useSWR("/categories", fetcher);
  const { data: brands, isLoading: brandIsLoading } = useSWR(
    formData.categoryName
      ? "/brands?categoryId=" +
          categories.find(category => category.name === formData.categoryName).id +
          ""
      : null,
    fetcher
  );
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductUpdate = (product) => {
    console.log(formData);
    const categoryId = categories.find(category => category.name === formData.categoryName).id;
    const brandId = brands.find(brand => brand.name === formData.brandName).id ;
    const newformData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
      image: formData.image,
      categoryId: categoryId,
      brandId: brandId,
      discount: formData.discount,
    };
    console.log(newformData);
    onUpdate(product, newformData);
  };
  return (
    <tr
      key={product.id}
      className="border-b bg-slate-200 text-slate-800 border-slate-700 hover:bg-slate-300"
    >
      <td class="w-4 p-4">
        <div class="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            class="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
          />
          <label for="checkbox-table-search-1" class="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 flex items-center gap-3">
        <img
          className="w-10 h-10 object-cover rounded"
          src={
            product.image
              ? product.image
              : "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
          }
          alt="product image"
        />
        <span>{product.title}</span>
      </td>
      <td className="px-6 py-4">{product.quantity}</td>
      <td className="px-6 py-4">{product.price}</td>
      <td className="px-6 py-4">{product.category.name}</td>

      {product.discount ? (
        <td className="px-6 py-4">{product.discount}</td>
      ) : (
        <td className="px-6 py-4">No discount</td>
      )}
      <td class="px-6 py-4  space-x-4 ">
        <form className="inline-block">
          <input type="hidden" name="id" />
          <div className="space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"sm"} variant="destructive">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(product.id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] h-[90vh] scrollbar overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Udpate product</DialogTitle>
                  <DialogDescription>Update product name and description</DialogDescription>
                </DialogHeader>
                <form onSubmit={e => e.preventDefault()} className="space-y-6 grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="mb-2 ">
                      Title
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Product Title"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="mb-2 ">
                      Price
                    </Label>
                    <Input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Product price"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="mb-2 ">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Product quantity"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount" className="mb-2 ">
                      Discount
                    </Label>
                    <Input
                      type="number"
                      name="discount"
                      id="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Product discount"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="mb-2 ">
                      Description
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Product description"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="mb-2 ">
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

                  {brands && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="brand" className="mb-2 ">
                        Brand
                      </Label>
                      <Select
                        value={formData.brandName}
                        onValueChange={value => setFormData({ ...formData, brandName: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandIsLoading
                            ? "Loading..."
                            : brands.map(brand => (
                                <SelectItem key={brand.id} value={brand.name}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-z gap-4">
                    <Label htmlFor="image" className="mb-2 ">
                      Image
                    </Label>
                    <UploadImage
                      image={formData.image}
                      onImageSelect={image => setFormData({ ...formData, image })}
                      className={"col-span-3"}
                    />
                  </div>
                </form>
                <DialogFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleProductUpdate(product)}
                    type="submit"
                  >
                    Update Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </td>
    </tr>
  );
}

export default ProductRow;
