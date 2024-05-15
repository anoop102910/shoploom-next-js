"use client";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { Heart } from "lucide-react";

function AddToWishlist({ product }) {
  async function handleWishlistAdd() {
    try {
      await api.post("/wishlistItems", { productId: product.id });
      tst.success("Added to wishlist");
    } catch (error) {
      tst.error(error);
    }
  }

  return <Heart color="red"  onClick={handleWishlistAdd}/>;
}

export default AddToWishlist;
