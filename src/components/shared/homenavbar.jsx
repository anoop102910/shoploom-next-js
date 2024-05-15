"use client";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/shared/icon";
import { useAuthContext } from "@/context/authprovider";
import { Avatar } from "@/components/shared/avatar";
import ShoppingCart from "@/components/shared/Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, ListOrderedIcon, Heart, LogOutIcon, User } from "lucide-react";
import { Input } from "../ui/input";
import SearchInput from "./search";

const menuItems = [
  { text: "Home", href: "/" },
  { text: "Shop", href: "/shop" },
];

const accountItems = [
  { icon: User, text: "Profile", href: "/dashboard/profile" },
  { icon: ListOrderedIcon, text: "Orders", href: "/dashboard/orders" },
  { icon: Heart, text: "Wishlist", href: "/dashboard/wishlist" },
  { icon: LayoutDashboard, text: "Dashboard", href: "/admin" },
];

const NavBar = () => {
  const { isAuthenticated, user, login, logout } = useAuthContext();
  useLayoutEffect(() => {
    login();
  }, []);
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-slate-200 border-b  ">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <img className="h-10 mix-blend-multiply" src="logo.jpeg" alt="" />
          </span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Icon icon="mingcute:menu-fill" className="text-3xl lg:hidden text-slate-700" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-800 text-white">
            <ul className="space-y-4 mt-10">
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    href={menuItem.href}
                    className="block py-2 px-3 rounded md:bg-transparent "
                    aria-current="page"
                  >
                    {menuItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium  items-center flex flex-col p-4 md:p-0 mt-4 border border-slate-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-slate-700">
            <SearchInput />
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <Link
                  href={menuItem.href}
                  className="block py-2 px-3  bg-blue-700 rounded md:bg-transparent "
                  aria-current="page"
                >
                  {menuItem.text}
                </Link>
              </li>
            ))}
            {!isAuthenticated ? (
              <li>
                <Link
                  href={"/auth/signin"}
                  className="block py-2 px-3  bg-blue-700 rounded md:bg-transparent "
                  aria-current="page"
                >
                  {"Signin"}
                </Link>
              </li>
            ) : (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none focus-within:outline-none">
                      <Avatar name={user.name} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {accountItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                          <Link href={item.href} className="flex items-center space-x-2">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.text}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem>
                        <div onClick={handleLogout} className="flex items-center space-x-2">
                          <LogOutIcon className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Icon icon="mynaui:cart" fontSize={28} className="text-orange-700 " />
                </SheetTrigger>
                <SheetContent className=" max-w-5xl" side="right">
                  <ShoppingCart />
                </SheetContent>
              </Sheet>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
