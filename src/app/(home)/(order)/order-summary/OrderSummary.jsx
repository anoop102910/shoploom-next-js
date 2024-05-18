"use client";
import { useCarts } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import RemoveFromCart from "@/components/shared/RemoveFromCart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderSummaryCard from "@/components/shared/OrderSummaryCard";

const OrderSummary = cartitems => {
  const { cartItems, isLoading, error } = useCarts();
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col gap-5 pt-10 w-full  items-center min-h-screen">
        <div className="text-4xl">
          Add item to cart
        </div>
        <Link href={"/shop"}>
          <Button variant="default">Add to cart</Button>
        </Link>{" "}
      </div>
    );

  return (
    <div className="flex w-full  h-full justify-between items-start gap-10">
      <div className="basis-4/5">
        <div className="flex-1 ">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
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

        <div className="border-t border-gray-200 py-6 ">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="mt-6 ">
            <Link href="/payment">
              <Button className="px-16">Continue</Button>
            </Link>
          </div>
        </div>
      </div>

      <OrderSummaryCard cartItems={cartItems} />
    </div>
  );
};

export default OrderSummary;
