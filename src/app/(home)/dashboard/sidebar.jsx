"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/authprovider";
import { cn } from "@/lib/utils";
import { Heart, User, Package, LogOut, Home } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";

const dashboardItems = [
  {
    icon: Heart,
    title: "Wishlist",
    link: "/dashboard/wishlist",
  },
  {
    icon: User,
    title: "Profile",
    link: "/dashboard/profile",
  },
  {
    icon: Package,
    title: "Orders",
    link: "/dashboard/orders",
  },
  {
    icon: Home,
    title: "Address",
    link: "/dashboard/address",
  },
];

function Sidebar({ className }) {
  const activePath = usePathname().split("/")[2];

  return (
    <aside
      aria-label="sidebar"
      aria-controls="default-sidebar"
      className={cn(
        className,
        "scrollbar w-[300px] px-6 border-r border-slate-200 "
      )}
    >
      <div className="pt-10 text-slate-600 flex gap-2 ml-2  items-center">
        <Avatar name="Mayank" />
        <div className="ml-4">
          <span className="font-semibold tracking-wide">Hi! </span>
          <span className="ml-2"> {"Mayank"}</span>
        </div>
      </div>

      <div className="pt-6">
        <ul>
          {dashboardItems.map(item => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-400 active:bg-orange-300 hover:text-white transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-orange-500 text-white"
                }`}
              >
                <item.icon className="hover:text-white text-2xl" />
                <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <button>
            <div className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-500 hover:text-white transition duration-150 cursor-pointer">
              <LogOut className="hover:text-white text-2xl" />
              <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">Sign out</span>
            </div>
          </button>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
