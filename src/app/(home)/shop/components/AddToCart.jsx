"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import React, { useState } from "react";

function AddToCart({ product }) {
  const [pending, setPending] = useState(false);

  async function handleCartAdd() {
    try {
      setPending(true);
      await api.post("/cartitems", { productId: product.id, quantity: 1 });
      tst.success("Cart item added");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <Button pending={pending} onClick={handleCartAdd} size="lg">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
