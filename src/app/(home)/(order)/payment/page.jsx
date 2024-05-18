"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useCarts } from "@/lib/data";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

function PaymentPage() {
  const [selectedAddress, setSelectedAddress] = useSessionStorage();
  const { cartItems, isLoading, error } = useCarts();

  const handlePayment = async () => {
    const order = {
      addressId: selectedAddress,
    };
    try {
      const res = await api.post("/orders", order);
      console.log(res);
      tst.success("Order placed suceessfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Button onClick={handlePayment} variant="default" size="default">
        Process Payment
      </Button>
    </div>
  );
}

export default PaymentPage;
