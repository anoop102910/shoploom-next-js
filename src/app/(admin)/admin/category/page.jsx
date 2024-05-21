"use client";
import React, { useEffect, useState } from "react";
import CategoryRow from "./row";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { useCategories } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import CategoryForm from "./CategoryForm";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
const CategoryList = ({ searchParams }) => {
  const query = searchParams.query;
  const { categories, error, isLoading, mutate } = useCategories({ query });

  const handleSubmit = async formData => {
    try {
      const res = await api.post("/categories", formData);
      mutate([...categories, res.data.data]);
      tst.success("Category created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

  const handleCategoryDelete = async id => {
    try {
      await api.delete(`/categories/${id}`);
      mutate(categories.filter(category => category.id !== id));
      tst.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
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
      tst.success("Category updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (error) return <Error />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Categories</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CategoryForm onSubmit={handleSubmit} type={"add"} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>List of all categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={3} />
        ) : (
          <TableBody>
            {categories.map(brand => (
              <CategoryRow
                key={brand.id}
                category={brand}
                onDelete={handleCategoryDelete}
                onUpdate={handleCategoryUpdate}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default CategoryList;
