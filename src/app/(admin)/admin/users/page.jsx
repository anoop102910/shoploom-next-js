"use client";
import UserRow from "./row";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useUsers } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";

const UserList = ({ searchParams }) => {
  const query = searchParams.query;
  const { users, isLoading, error, mutate } = useUsers();

  const handleUserDelete = async id => {
    try {
      await api.delete(`/users/${id}`);
      mutate(users.filter(user => user.id !== id));
      tst.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleUserUpdate = async (id, formData) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      mutate(users.map(user => (user.id === id ? { ...user, ...res.data.data } : user)));
      tst.success("User updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
      </div>
      <Table>
        <TableCaption>List of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={4} />
        ) : (
          <TableBody>
            {users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                onDelete={handleUserDelete}
                onUpdate={handleUserUpdate}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default UserList;
