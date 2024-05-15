"use client";
import React, { useEffect, useState } from "react";
import ProductRow from "./row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { tst } from "@/lib/utils";
import Loader from "@/components/shared/loader";
import UploadImage from "@/components/shared/uploadimage";
import LoadingButton from "@/components/shared/loadbtn";

const ProductList = ({ searchParams }) => {
  const query = searchParams.query;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [pending, setPending] = useState(false);
  const fetcher = url => api.get(url).then(res => res.data.data);
  let url = "/products";
  url = query ? `${url}?title=${query}` : url;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
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

  const handleSubmit = async e => {
    e.preventDefault();
    const categoryId = categories.find(category => category.name === formData.categoryName).id;
    const brandId = brands.find(brand => brand.name === formData.brandName).id;
    try {
      setPending(true);
      const res = await api.post(
        "/products",
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          quantity: formData.quantity,
          image: formData.image,
          categoryId: categoryId,
          brandId: brandId,
          discount: formData.discount,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.data);
      mutate(data => [...data, res.data.data]);
      toast.success("Product created successfully");
      setPending(false);
    } catch (error) {
      setPending(false);
      tst.error(error);
    }
  };

  const handleProductDelete = async id => {
    try {
      await api.delete(`/products/${id}`);
      mutate(data.filter(product => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleProductUpdate = async (id, formData) => {
    try {
      setPending(true);
      const res = await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mutate(data.map(product => (product.id === id ? { ...product, ...res.data.data } : product)));
      toast.success("Product updated successfully");
      setPending(false);
    } catch (error) {
      setPending(false);
      console.log(error);
      tst.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        {
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[90vh] scrollbar overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Add product</DialogTitle>
                <DialogDescription>Add a new product</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <form onSubmit={handleSubmit} className="space-y-6 grid gap-4 py-4">
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
                  <LoadingButton
                    loading={pending}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:blue-300 rounded-lg px-5 py-2.5 text-center"
                  >
                    Add Product
                  </LoadingButton>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        }
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full  text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 rounded-md overflow-hidden">
          <thead className="text-xs uppercase bg-slate-700 text-slate-400 ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <Input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-slate-800 focus:ring-offset-slate-800 focus:ring-2 bg-slate-700 border-slate-600"
                  />{" "}
                  <Label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </Label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handleProductDelete}
                onUpdate={handleProductUpdate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
