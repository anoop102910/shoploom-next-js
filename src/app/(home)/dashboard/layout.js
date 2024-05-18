import React from "react";
import Sidebar from "./sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen ">
      <Sidebar className="sticky top-0 left-0 bottom-0 h-[100vh] overflow-y-scroll  max-sm:hidden" />
      <div className="w-full md:ml-2 mt-1 relative">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
