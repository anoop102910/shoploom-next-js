"use client";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useProduct } from "@/lib/data";
import { Icon } from "@iconify/react";
import { RemoveFormattingIcon } from "lucide-react";
import React from "react";
import Review from "../components/Review";
import ProductPageSkeleton from "./skeleton";
import { Button } from "@/components/ui/button";
import AddToCart from "../components/AddToCart";

export default function Product({ params }) {
  const slug = params.slug;
  const { product, isLoading, error } = useProduct(slug);

  if (isLoading) return <ProductPageSkeleton count={1} />;

  product.discountedPrice = product.price -  (product.price * product.discount)/100 ;

  if (error) return <Error />;

  return (
    <div className=" py-8 pt-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-slate-300 test:bg-slate-700 mb-4">
              <img
                className="w-full h-full object-cover overflow-hidden object-center rounded-lg"
                src={
                  product.image
                    ? product.image
                    : "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
                }
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <p className="text-slate-600 text-3xl font-bold test:text-slate-300 mb-4">
              {product.title}
            </p>
            <div className="mb-4 space-y-4">
              <div className="mr-4">
                {product.discount && <span className="text-2xl text-slate-500 ">${product.discountedPrice}</span>}
                <span className={`${product.discount && "line-through text-red-600 text-lg"} `}>
                  {" "}
                  ${product.price}
                </span>
                  {" "}
                {product.discount && <span className="text-sm text-green-600">{product.discount}% off</span>}
              </div>

              <div>
                {/* <span className="text-slate-600 test:text-slate-300"> {product.avgRating}</span> */}
                {[...Array(5)].map(index => (
                  <Icon
                    className="inline text-xl text-orange-500"
                    key={index}
                    icon="mingcute:star-fill"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-600 test:text-slate-300 mt-2 mb-8">
                {product.description}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quisquam ab illo sint
                qui voluptas a impedit quos expedita beatae.
              </p>
            </div>
            <div className="flex -mx-2 mb-4 gap-4">
              <AddToCart product={product} />
              <Button size="lg" variant="outline">
                Add to wishlist
              </Button>
            </div>
          </div>
        </div>
        <Review product={product} />
      </div>
    </div>
  );
}
