"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import React, { useState } from "react";

function AddToCart({ product }) {
  const [loading, setLoading] = useState(false);
  
  async function handleCartAdd() {
    try {
      setLoading(true);
      await api.post("/cartitems", { productId: product.id, quantity: 1 });
      tst.success("Cart item added");
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      tst.error(error);
    }
  }

  return (
    <Button onClick={handleCartAdd} size="lg">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
