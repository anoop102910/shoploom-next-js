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
import AddAddress from "./AddAddress";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import Link from "next/link";
import useSessionStorage from "@/hooks/useSessionStorage";

function Address() {
  const { isLoading, error, addresses, mutate } = useAddresses();
  const [selectedAddress, setSelectedAddress] = useSessionStorage()
  console.log(selectedAddress);
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  if (addresses.length === 0) return <AddAddress />;

  return (
    <div className="mx-auto w-[600px]">
      <div className="font-bold mb-6 flex justify-between items-center">
        <h2 className="text-2xl">Addresses</h2>
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
        <RadioGroup value={selectedAddress} onValueChange={value=>setSelectedAddress(value)} defaultValue="comfortable" >
          {addresses.map(address => (
            <div
              key={address.id}
              className="flex items-center space-x-6 border border-slate-400 rounded-md shadow-md p-6"
            >
              <RadioGroupItem name={address.id} value={address.id} id={address.id} />
              <Label htmlFor={address.id}>
                <div className="space-y-2">
                  <div className="space-x-4 text-base">
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
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="mt-6 ">
          <Link href="/order-summary">
            <Button className="px-16">Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Address;
