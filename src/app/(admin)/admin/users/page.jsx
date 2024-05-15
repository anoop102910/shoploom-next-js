"use client";
import UserRow from "./row";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { tst } from "@/lib/utils";
import Loader from "@/components/shared/loader";
import { useUsers } from "@/lib/data";

const UserList = ({ searchParams }) => {
  const query = searchParams.query;
  const { users, isLoading, error, mutate } = useUsers();

  const handleUserDelete = async id => {
    try {
      await api.delete(`/users/${id}`);
      mutate(users.filter(user => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleUserUpdate = async (id, formData) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      mutate(users.map(user => (user.id === id ? { ...user, ...res.data.data } : user)));
      toast.success("User updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 rounded-md overflow-hidden">
          <thead className="text-xs uppercase bg-slate-700 text-slate-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <Input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-slate-800 focus:ring-offset-slate-800 focus:ring-2 bg-slate-700 border-slate-600"
                  />{" "}
                  <Label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </Label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                onDelete={handleUserDelete}
                onUpdate={handleUserUpdate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
