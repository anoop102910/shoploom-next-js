import "../../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import Dashboard from "@/components/shared/dashboard";
import Navbar from "@/components/shared/navbar";

export const metadata = {
  title: "Netmarket",
  description: "",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="text-slate-900">
            <div className="relative flex min-h-screen ">
              <Dashboard className="sticky top-0 left-0 bottom-0 h-[100vh] overflow-y-scroll  max-lg:hidden " />
              <div className="w-full md:ml-2 mt-1 relative">
                <Navbar />
                <div className="p-4">{children}</div>
              </div>
            </div>
            <Toaster position="bottom-center" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}