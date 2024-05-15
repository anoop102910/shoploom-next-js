import Link from "next/link";
import React from "react";
import AddToCart from "./AddToCart";
import AddToWishlist from "@/components/shared/AddToWishlist";
import { Icon } from "@iconify/react";
import Review from "./Review";

export const ProductCard = ({ product }) => {
  const { title, price, discount, avgRating } = product;
  const discountedPrice = price - (price * discount) /100;

  return (
    <div className="group  border-slate-100 flex w-full max-w-[260px] flex-col self-center overflow-hidden rounded-lg border ">
      <Link
        href={`/shop/${product.slug}`}
        className="relative  flex h-40 overflow-hidden rounded-xl"
      >
        <img
          className="peer absolute top-0 right-0 h-full w-full object-cover"
          src={
            product.image
              ? product.image
              : "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
          }
          alt="product image"
        />
      </Link>
      <div className="mt-4 pb-5">
        <div className="flex justify-between ">
          <div>
            <Link href={`/shop/${product.slug}`}>
              <h5 className="text- tracking-tight">{title}</h5>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <div className="space-x-1">
                {discount && <span className="text-xl ">${discountedPrice}</span>}
                <span className={`${discount && "line-through text-red-600 text-sm"} `}>
                  {" "}
                  ${price}
                </span>
                {discount && <span className="text-sm text-green-600">{discount}% off</span>}
              </div>
            </div>
            <div >
              <span className="text-slate-500 text-sm">A Brand by  </span>
              <span className="text-slate-700">{product.brand.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <AddToWishlist product={product} />

            {avgRating && (
              <div className="text-xs px-1 py-[0.125rem] flex items-center text-white bg-green-600 gap-1 rounded">
                <span className>{avgRating}</span>
                <Icon icon="ic:round-star" />
              </div>
            )}
          </div>
        </div>
        {/* <AddToCart product={product} />z */}
      </div>
    </div>
  );
};
