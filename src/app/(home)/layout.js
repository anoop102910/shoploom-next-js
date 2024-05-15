import "../../app/globals.css"
import NavBar from "@/components/shared/homenavbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";

export const metadata = {
  title: "Netmarket",
  description: "",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amber-50">
        <div className="container  max-w-screen-xl  mx-auto text-slate-900 relative">
          <AuthProvider>
            <NavBar />

            <div>{children}</div>
            <Toaster position="bottom-center" />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
