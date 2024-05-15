"use client";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import ProductFilter from "@/components/shared/productfilter";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "./components/ProductSkeleton";

function Page({ searchParams }) {
  const { products, isLoading, error } = useProducts(searchParams);

  if (error) return <Error />;

  return (
    <div className="flex gap-8 mt-6 flex-1 items-start ">
      <ProductFilter className={" basis-1/5 max-sm:hidden min-h-[80vh] sticky top-0 right-0"} />
      {isLoading ? (
        <ProductSkeleton count={6} />
      ) : (
        <div className="flex mx-auto gap-4 basis-4/5 flex-wrap">
          {products.length == 0 && (
            <div className="text-xl flex justify-between w-full h-full items-center font-bold">
              No Product found
            </div>
          )}
          <div className="flex gap-8 flex-wrap items-start">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
