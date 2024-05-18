"use client";
import { useOrders } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/shared/tableskeleton";

export default function OrderPage() {
  const { orders, isLoading, error } = useOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={5} />
        ) : error ? (
          <Error />
        ) : (
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="default" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

