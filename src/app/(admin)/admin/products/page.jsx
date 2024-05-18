"use client";
import React, { useState } from "react";
import ProductRow from "./row";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useSWR from "swr";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import ProductForm from "./ProductForm";
import { useProducts } from "@/lib/data";

const ProductList = ({ searchParams }) => {
  const query = searchParams.query;
  const { products, isLoading, error ,mutate} = useProducts({ query });

  const handleSubmit = async formData => {
    try {
      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mutate(products => [...products, res.data.data]);
      tst.success("Product created successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleProductDelete = async id => {
    try {
      await api.delete(`/products/${id}`);
      mutate(products.filter(product => product.id !== id));
      tst.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleProductUpdate = async (id, formData) => {
    try {
      console.log(formData);
      const res = await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mutate(products.map(product => (product.id === id ? { ...product, ...res.data.data } : product)));
      tst.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[90vh] scrollbar overflow-y-scroll">
            <ProductForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of all products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Titile</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={5} />
        ) : (
          <TableBody>
            {products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handleProductDelete}
                onUpdate={handleProductUpdate}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ProductList;
