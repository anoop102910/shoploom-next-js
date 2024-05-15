"use client";
import api from "@/lib/api";
import { useCarts } from "@/lib/data";
import { tst } from "@/lib/utils";

export default function RemoveFromCart({cartItems ,cartId }) {
  const { mutate } = useCarts();

  async function handleCartRemove() {
    try {
      await api.delete(`/cartitems/${cartId}`);
      mutate(cartItems.filter(cartItem => cartItem.id !== cartId));
    } catch (error) {
      tst.error(error);
    }
  }

  return (
    <button onClick={handleCartRemove} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
      Remove
    </button>
  );
}
