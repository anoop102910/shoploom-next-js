"use client";

import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useOrder } from "@/lib/data";
import { Card } from "@/components/ui/card";

export default function OrderDetailsPage({ params }) {
  const { order, isLoading, error } = useOrder(params.id);
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Order Details</h1>
      <Card className="w-full max-w-3xl p-6  rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold text-gray-900">Order Summary</p>
        </div>
        <div className="text-gray-700">
          <p className="text-sm mb-2">Order ID: {order.id}</p>
          <p className="text-sm mb-2">Order Status: {order.status}</p>
          <p className="text-sm mb-2">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm mb-2">Shipping Address: {order.Address.address}</p>
          <p className="text-sm mb-2">Contact Number: {order.Address.phone}</p>
        </div>
      </Card>
      <div className="flex flex-col items-center mt-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Products</h2>
        {order.orderItems.map(item => (
          <Card
            key={item.id}
            className="flex items-center justify-between w-full max-w-3xl p-4 mb-4 rounded-lg bg-white"
          >
            <div className="flex items-center">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.product.image}
                  className="h-full w-full object-cover object-center"
                  alt={item.product.title}
                />
              </div>
              <div className="ml-4 ">
                <div className="text-base font-medium text-gray-900">
                  <h3 className="mb-2">{item.product.title}</h3>
                  <p className="text-sm font-medium text-gray-700">Price : {item.price}</p>
                  <p className="text-sm font-medium text-gray-700">Qty: {item.quantity}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
