"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

function UploadImage({ className, image, onImageSelect, ...props }) {
  const handleImageSelect = e => {
    const file = e.target.files[0];
    onImageSelect(file);
  };
  return (
    <>
      <label
        htmlFor="file-upload"
        className={cn(
          "border-2  border-dashed w-full aspect-square rounded-lg  flex justify-center items-center cursor-pointer",
          className
        )}
      >
        {image ? (
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt="Uploaded Image"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Icon fontSize={40} className="text-slate-500 " icon="fluent:image-28-regular" />
        )}
      </label>
      <input
        {...props}
        required={true}
        accept="image/*"
        onChange={handleImageSelect}
        type="file"
        name="image"
        id="file-upload"
        className="hidden"
      />
    </>
  );
}

export default UploadImage;
