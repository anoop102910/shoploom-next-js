"use client";
import Icon from "@/components/shared/icon";
import Image from "next/image";
import SearchInput from "./search";
import Dashboard from "./dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Navbar() {

  return (
    <>
      <header
        className="sticky z-[3] top-0 left-0 w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Icon
              icon="mingcute:menu-fill"
              className="text-3xl lg:hidden text-slate-700"
            />
          </SheetTrigger>
          <SheetContent>
            <Dashboard className={` lg:hidden absolute top-0 left-0 min-h-screen `} />
          </SheetContent>
        </Sheet>

          <SearchInput className={'md:w-[500px]'} />

        <div className="max-w-[230px] max-sm:hidden flex gap-10 justify-between items-center rounded-lg bg-white border border-slate-200 px-2 py-1 ">
          <div className="flex  items-center gap-4">
            <Image
              width={40}
              height={40}
              src="/avatar.png"
              className=" rounded-full"
              alt="profile image"
            />

            <div className="flex flex-col max-sm:hidden ">
              <span className="text-xs">Welcome back</span>
            </div>
          </div>
          <div>
            <Icon icon="bx:arrow-back" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
