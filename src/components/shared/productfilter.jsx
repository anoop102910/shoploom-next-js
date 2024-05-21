"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrands, useCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

function ProductFilter({ className }) {
  const { categories, isLoading: categoryIsLoading } = useCategories();
  const { brands, isLoading: brandIsLoading } = useBrands();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let params;
  const handleParamsChange = (name, value) => {
    params = new URLSearchParams(searchParams);
    if (value) params.set(name, value);
    else params.delete(name);
    if (params) router.replace(`${pathname}?${params.toString()}`);
  };


  const clearQuery = () => {
    router.replace(pathname);
  };

  return (
    <div className={cn("bg-slate-200 rounded-md p-5 pt-6 max-h-[100vh] overflow-y-scroll scrollbar", className)}>
      <h2 className="text-xl font-medium  mb-6">Product Filter</h2>
      <form action="" className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="category" className="text-right mb-5">
            Category
          </Label>
          <Select
            onValueChange={value => handleParamsChange("categoryName", value)}
            className="w-full"
          >
            <SelectTrigger className="col-span-3 border-slate-600">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryIsLoading
                ? "Loading..."
                : categories?.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="space-y-2">
            <Label htmlFor="brand" className="text-left">
              Brand
            </Label>
            <div className="space-y-2">
              {brandIsLoading ? (
                "Loading..."
              ) : (
                brands?.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.id}
                      name="brandName"
                      value={brand.name}
                      onCheckedChange={() =>
                        handleParamsChange("brandName", brand.name)
                      }
                    />
                    <Label htmlFor={brand.id} className="text-left">
                      {brand.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div> */}
        <div className="space-y-1">
          <Label htmlFor="sortby" className="text-right mb-5">
            Sort By
          </Label>
          <Select onValueChange={value => handleParamsChange("sortBy", value)} className="w-full">
            <SelectTrigger className="col-span-3 border-slate-600">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pricelowtohigh">Price low to high</SelectItem>
              <SelectItem value="pricehightolow">Price high to low</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="discounthightolow">Discount high to low</SelectItem>
              <SelectItem value="discountlowtohigh">Discount low to high</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="price" className="text-left">
            Price
          </Label>
          <div className="flex gap-4 justify-between">
            <Input
              className="bg-transparent outline-none ring-none border-slate-600"
              type="number"
              name="minprice"
              id="price"
              placeholder="Min"
              defaultValue={searchParams.get("minprice")}
              onChange={e => handleParamsChange(e.target.name, e.target.value)}
            />
            <Input
              className="bg-transparent outline-none ring-none border-slate-600"
              type="number"
              name="maxprice"
              id="price"
              placeholder="Max"
              defaultValue={searchParams.get("maxprice")}
              onChange={e => handleParamsChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="minrating" className="text-left">
            Rating
          </Label>
          <div className="space-y-2">
            <RadioGroup
              defaultValue={searchParams.get("minrating")}
              onValueChange={value => handleParamsChange("minrating", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">5+ & above</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">4+ & above</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">3+ & above</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mindiscount" className="text-left">
            Discount
          </Label>
          <div className="space-y-2">
            <RadioGroup
              defaultValue={searchParams.get("mindiscount")}
              onValueChange={value => handleParamsChange("mindiscount", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50" id="50" />
                <Label htmlFor="50">50% & more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="40" id="40" />
                <Label htmlFor="40">40% & more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="30" />
                <Label htmlFor="30">30% & more</Label>
              </div>
            </RadioGroup>
          </div>
         
        </div>
      </form>

      <Button onClick={clearQuery} className="mt-4 bg-red-500 hover:bg-red-600" size="sm">
        Clear
      </Button>
    </div>
  );
}

export default ProductFilter;

// const { brands, isLoading: brandIsLoading } = useBrands();

// const { data: brands, isLoading: brandIsLoading } = useSWR(
//   formData.categoryName
//     ? "/brands?categoryId=" +
//         categories.find(category => category.name === formData.categoryName).id +
//         ""
//     : null,
//   fetcher
// );

{
  /* <div className="space-y-2">
          <Label htmlFor="rating" className="text-left">
            Rating
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={() => handleParamsChange("rating", 5)}
                id="5"
                name="rating"
                value="5"
              />
              <Label htmlFor="5" className="text-left">
                5+ & above
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="4" name="rating" value="4" />
              <Label htmlFor="4" className="text-left">
                4+ & above
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="2" name="rating" value="3" />
              <Label htmlFor="2" className="text-left">
                3+ & above
              </Label>
            </div>
          </div>
        </div> */
}
{
  /*    <div className="space-y-2">
          <Label htmlFor="discount" className="text-left">
            Discount
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="5" name="discount" value="50" />
              <Label htmlFor="5" className="text-left">
                50% & more
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="4" name="discount" value="40" />
              <Label htmlFor="4" className="text-left">
                40% & more
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="2" name="discount" value="30" />
              <Label htmlFor="2" className="text-left">
                30% & more
              </Label>
            </div>
          </div>
        </div>
 */
}
{
  /* {categories && (
          <div className="">
            <Label htmlFor="brand" className="text-right mb-5">
              Brand
            </Label>
            <Select className="w-full">
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
        )} */
}
