"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/shared/loadbtn";
import { tst } from "@/lib/utils";
import api from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui/button";

export default function UpdateProfile() {
  const { profile, isLoading, error } = useProfile();
  console.log(profile);

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    gender: profile?.gender || "",
    bio: profile?.bio || "",
  });
  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await api.post("/users/profile", formData);
      tst.success("Profile updated");
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
      tst.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="max-w-lg mx-auto">
      <form className="space-y-4 w-full" onSubmit={handleSubmit} disabled={pending}>
        <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="E.g. Anoop Singh"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="gender" className="mb-2">
            Gender
          </Label>
          <Select
            className="w-full"
            value={formData.gender}
            onValueChange={value => setFormData({ ...formData, gender: value })}
          >
            <SelectTrigger className="col-span-3 bg-white">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bio" className="mb-2">
            Bio
          </Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Tell us something about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <Button pending={pending} type="submit" >
          Save
        </Button>
      </form>
    </div>
  );
}
