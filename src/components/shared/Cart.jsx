"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCarts, useWishlistItems } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import RemoveFromCart from "./RemoveFromCart";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { mutate } from "swr";
import { useState } from "react";
import { tst } from "@/lib/utils";

const ShoppingCart = () => {
  const { cartItems, isLoading, error } = useCarts();
  const [pending, setPending] = useState(false);
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const handleQuantityChange = async (item, value) => {
    try {
      setPending(true);
      await api.put(`/cartitems/${item.id}`, { quantity: value });
      mutate(
        cartItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: value } : cartItem
        )
      );
      setPending(false);
      tst.success("Quantity updated successfully")
    } catch (error) {
      tst.error("Soemthing went wrong")
      setPending(false);
      console.log(error);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll scrollbar  w-full relative">
      <ScrollArea>
        <div className="flex-1 ">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map(cartItem => (
                  <li key={cartItem.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={
                          cartItem.product.image
                            ? cartItem.product.image
                            : "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{cartItem.product.title}</h3>
                          <p className="ml-4">{cartItem.product.price}</p>
                        </div>
                      </div>
                      <div>
                        <div className="py-2">
                          <Select
                            disabled={pending}
                            className="w-full"
                            value={cartItem.quantity}
                            onValueChange={value => handleQuantityChange(cartItem, value)}
                          >
                            <SelectTrigger className="w-16 h-8 border-slate-600  focus:ring-0">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {cartItem.quantity}</p>
                        <div className="flex">
                          <RemoveFromCart cartItems={cartItems} cartId={cartItem.id} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t sticky bottom-0 border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            href="/address"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
