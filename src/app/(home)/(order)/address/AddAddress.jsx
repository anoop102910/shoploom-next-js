"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/shared/loadbtn";
import { tst } from "@/lib/utils";
import api from "@/lib/api";

export default function AddAddress() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    address: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post('/addresses',formData);
        tst.success('Address created')
    } catch (error) {
        tst.error(error)
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form className="space-y-4 w-full " onSubmit={handleSubmit} disabled={loading}>
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <Label htmlFor="name" className="mb-2  ">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="E.g. Anoop Singh"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="phone" className="mb-2 ">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="E.g. 8293654827"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="pincode" className="mb-2 ">
              Pincode
            </Label>
            <Input
              type="text"
              name="pincode"
              id="pincode"
              placeholder="E.g. 220383"
              required
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="street" className="mb-2 ">
              Street
            </Label>
            <Input
              type="text"
              name="street"
              id="street"
              placeholder="E.g. Gujaini"
              required
              value={formData.street}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address" className="mb-2 ">
            Address
          </Label>
          <Textarea
            name="address"
            id="address"
            placeholder="E.g. Gujaini"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="city" className="mb-2 ">
              City
            </Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="E.g. Lucknow"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="state" className="mb-2 ">
              State
            </Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="E.g. Uttar Pradesh"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <LoadingButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Address"}
        </LoadingButton>
      </form>
    </div>
  );
}

