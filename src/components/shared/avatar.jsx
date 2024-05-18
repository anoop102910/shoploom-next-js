"use client"
import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Avatar({ image, name }) {
  return (
    <ShadAvatar>
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback className="bg-green-400 text-white">{name[0]}</AvatarFallback>
    </ShadAvatar>
  );
}
