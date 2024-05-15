"use client";
import BrandRow from "./row";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import AddBrand from "@/app/(admin)/admin/brand/addbrand";
import { useBrands } from "@/lib/data";
import Error from "@/components/shared/error";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
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
            <AddBrand onAdd={handleBrandAdd} type="add" />
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 rounded-md overflow-hidden">
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
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <TableSkeleton count={3} />
        ) : (
          <tbody>
            {brands.map(brand => (
              <BrandRow
                key={brand.id}
                brand={brand}
                onDelete={handleBrandDelete}
                onUpdate={handleBrandUpdate}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default BrandList;
