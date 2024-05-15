"use client";
import React from "react";
import Icon from "@/components/shared/icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/authprovider";

const dashboardItems = [
  {
    icon: "gravity-ui:heart",
    title: "Wishlist",
    link: "/dashboard/wishlist",
  },
  {
    icon: "iconamoon:profile-bold",
    title: "Profile",
    link: "/dashboard/profile",
  },
  {
    icon: "lets-icons:order",
    title: "Order History",
    link: "/dashboard/order-history",
  },
  {
    icon: "fa-regular:address-book",
    title: "Address",
    link: "/dashboard/address",
  },
];

function Sidebar({ className }) {
  const activePath = usePathname().split("/")[2];
  const { user } = useAuthContext();
  // if(!user) return null;
  // user.firstName = user.name.split(" ")[0];

  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} scrollbar bg-white font-urbanist w-[300px] px-6 border-r  border-slate-200 rounded-md `}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <a className="flex  items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main hover:text-white transition duration-150 cursor-pointer">
          <Image
            width={40}
            height={40}
            src="/avatar.png"
            className=" rounded-full"
            alt="profile image"
          />
          <div className="ml-4 ">
            <span className="font-semibold  tracking-wide ">Hi! </span>
            {/* <span>{" "}{user.firstName}</span> */}
          </div>
        </a>
      </div>

      <div className="wrapper pt-6">
        <ul>
          {dashboardItems.map((item, index) => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-400 active:bg-orange-300 hover:text-white transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-orange-500 text-white"
                }`}
              >
                <i>
                  <Icon icon={item.icon} className="hover:text-white text-2xl " />
                </i>
                <span className="ml-8 text-[0.9rem] font-semibold  tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <button>
            <div className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-500 hover:text-white transition duration-150 cursor-pointer">
              <i>
                <Icon icon={"uil:signout"} className="hover:text-white text-2xl " />
              </i>
              <span className="ml-8 text-[0.9rem] font-semibold  tracking-wider">Sign out</span>
            </div>
          </button>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
