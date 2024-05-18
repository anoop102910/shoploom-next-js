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
      <ProductFilter className={"w-[300px] max-sm:hidden min-h-[80vh] sticky top-0 right-0"} />
      {isLoading ? (
        <ProductSkeleton count={9} />
      ) : (
        <div className="w-full">
          {products.length == 0 && (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-4">No products found</h3>
              <p className="text-gray-500">
                Oops! It seems like we could not find any products with the
                given criteria.
              </p>
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
