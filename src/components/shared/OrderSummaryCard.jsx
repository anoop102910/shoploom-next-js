"use client"
import { cn } from "@/lib/utils";
const OrderSummaryCard = ({cartItems,className}) => {

  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);
  const totalDiscount = cartItems.reduce((total, cartItem) => {
    const itemDiscount = cartItem.quantity * cartItem.product.price * (cartItem.product.discount / 100);
    return total + itemDiscount;
  }, 0);
  const totalPrice = totalAmount - totalDiscount;

  return (
    <div className={cn("flex flex-col w-full max-w-[350px] p-6 mt-6 rounded-lg border ", className)}>
      <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
      <div className="flex justify-between mt-4">
        <p className="text-sm">Subtotal</p>
        <p className="text-sm">${totalAmount}</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-sm">Discount</p>
        <p className="text-sm">-${totalDiscount}</p>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold">${totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;

