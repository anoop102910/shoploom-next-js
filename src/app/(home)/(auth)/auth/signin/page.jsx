"use client";
import LoadingButton from "@/components/shared/loadbtn";
import { useAuthContext } from "@/context/authprovider";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const router = useRouter();

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignin = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/signin", formData);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      login();
      tst.success("Signin success");
      setLoading(false);
    } catch (error) {
      tst.error(error)
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6 w-full ">
      <div className="w-full  mx-auto max-w-sm p-4 bg-slate-200 border border-slate-400 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSignin}>
          <h5 className="text-xl font-medium text-slate-800">Sign in to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-800">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-300 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. anoop@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-800">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="E.g. welcome"
              className="bg-slate-300 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-start">
            <a href="#" className="text-sm text-blue-700 hover:underline">
              Forgot your password?
            </a>
          </div>
          <LoadingButton loading={loading}>Login to your Account</LoadingButton>
          <div className="text-sm font-medium text-slate-800">
            Not registered?{" "}
            <Link href="/auth/signup" className="text-blue-700 hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
