"use client";
import React from "react";
import Icon from "@/components/shared/icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, User, UserCircle,Settings, ShoppingBag, Slack, Radar,} from "lucide-react";

// const dashboardItems = [
//   {
//     icon: "mynaui:home",
//     title: "Home",
//     link: "/admin/",
//   },
//   {
//     icon: "mingcute:user-3-line",
//     title: "Users",
//     link: "/admin/users",
//   },
//   {
//     icon: "fluent-mdl2:product",
//     title: "Products",
//     link: "/admin/products",
//   },
//   {
//     icon: "cib:brand-ai",
//     title: "Brand",
//     link: "/admin/brand",
//   },
//   {
//     icon: "material-symbols:category-outline",
//     title: "Category",
//     link: "/admin/category",
//   },

//   {
//     icon: "mdi:account-outline",
//     title: "Account",
//     link: "/admin/account",
//   },
//   {
//     icon: "solar:settings-linear",
//     title: "Settings",
//     link: "/admin/",
//   },
// ];

const dashboardItems = [
  {
    icon: Home,
    title: "Home",
    link: "/admin/",
  },
  {
    icon: User,
    title: "Users",
    link: "/admin/users",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    link: "/admin/products",
  },
  {
    icon: Slack,
    title: "Brand",
    link: "/admin/brand",
  },
  {
    icon: Radar,
    title: "Category",
    link: "/admin/category",
  },

  {
    icon: Settings,
    title: "Settings",
    link: "/admin/settings/",
  },
];
function Dashboard({ className }) {
  const activePath = usePathname().split("/")[2];
  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} scrollbar bg-white font-urbanist w-[300px] px-6  shadow-md rounded-md `}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <Link
          href="/"
          className="flex  items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main  transition duration-150 cursor-pointer"
        >
          <Image
            width={40}
            height={40}
            src="/avatar.png"
            className=" rounded-full"
            alt="profile image"
          />
          <span className="ml-4 font-semibold  tracking-wide ">Netmarket</span>
        </Link>
      </div>

      <div className="wrapper pt-6">
        <ul>
          {dashboardItems.map((item, index) => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-500 hover:text-white transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-violet-600 text-white"
                }`}
              >
                <item.icon />
                <span className="ml-8 text-[0.9rem] font-semibold  tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <button>
            <div className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-500 hover:text-white transition duration-150 cursor-pointer">
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

export default Dashboard;
