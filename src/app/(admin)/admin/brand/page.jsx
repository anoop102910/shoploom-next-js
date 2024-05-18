"use client";
import BrandRow from "./row";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { useBrands } from "@/lib/data";
import Error from "@/components/shared/error";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BrandForm from "./BrandForm";

const BrandList = ({ searchParams }) => {
  const query = searchParams.query;
  const { brands, error, isLoading, mutate } = useBrands(query);

  const handleBrandAdd = async formData => {
    try {
      const res = await api.post("/brands", formData);
      mutate([...brands, res.data.data]);
      tst.success("Brand created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

  const handleBrandDelete = async id => {
    try {
      await api.delete(`/brands/${id}`);
      mutate(brands.filter(brand => brand.id !== id));
      tst.success("Brand deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleBrandUpdate = async (id, formData) => {
    try {
      console.log(formData);
      const res = await api.put(`/brands/${id}`, formData);
      mutate(brands.map(brand => (brand.id === id ? { ...brand, ...res.data.data } : brand)));
      tst.success("Brand updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (error) return <Error />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Brands</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Brand</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <BrandForm onSubmit={handleBrandAdd} type="add" />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>Descrption</TableHead>
            <TableHead>Category</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={3}  />
        ) : (
          <TableBody>
            {brands.map(brand => (
              <BrandRow
                key={brand.id}
                brand={brand}
                onDelete={handleBrandDelete}
                onUpdate={handleBrandUpdate}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default BrandList;
