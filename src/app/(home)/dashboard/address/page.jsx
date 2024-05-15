"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddresses } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import AddAddress from "../../(order)/address/AddAddress";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import Link from "next/link";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

function Address() {
  const { isLoading, error, addresses, mutate } = useAddresses();

  async function handleItemRemove(item) {
    try {
      await api.delete(`/addresses/${item.id}`);
      mutate(addresses.filter(address => address.id !== item.id));
    } catch (error) {
      tst.error(error);
    }
  }

  async function handleAddressUpdate(id, updatedAddress) {
    try {
      await api.put(`/addresses/${id}`, updatedAddress);
      mutate(
        addresses.map(address =>
          address.id === id ? { ...addresses, ...updatedAddress } : address
        )
      );
    } catch (error) {
      tst.error(error);
    }
  }

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  if (addresses.length === 0) return <AddAddress />;

  return (
    <div className="mx-auto ">
      <div className="font-bold mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Addresses</h2>
        <Dialog>
          <DialogTrigger>
            <Button>Add New Address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>Add new address</DialogDescription>
            </DialogHeader>
            <AddAddress />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {addresses.map(address => (
          <div
            key={address.id}
            className="flex items-center space-x-6 mb-4 rounded-md  border border-slate-400  p-6"
          >
            <div className="space-y-2">
              <div className="space-x-4 font-semibold">
                <span>{address.name}</span>
                <span>{address.phone}</span>
              </div>
              <div className="font-normal">
                <span>{address.address}</span>
                <span className="mx-1">•</span>
                <span>{address.street}</span>
                <span className="mx-1">•</span>
                <span>{address.city}</span>
                <span className="mx-1">•</span>
                <span>{address.state}</span>
                <span className="mx-1">•</span>
                <span>{address.pincode}</span>
              </div>
              <div className="flex  gap-4">
                <p>
                  <button
                    onClick={() => handleAddressUpdate(address)}
                    type="button"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Edit
                  </button>
                </p>
                <p>
                  <button
                    onClick={() => handleItemRemove(address)}
                    type="button"
                    className="font-medium text-orange-600 hover:text-orange-500"
                  >
                    Remove
                  </button>
                </p>
              </div>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
