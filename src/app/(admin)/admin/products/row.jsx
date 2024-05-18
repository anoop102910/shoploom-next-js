"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import ProductForm from "./ProductForm";

function ProductRow({ product, onDelete, onUpdate }) {
  return (
    <TableRow>
      <TableCell className="px-6 py-4 flex items-center gap-3">
        <img
          className="w-10 h-10 object-cover rounded"
          src={
            product.image
              ? product.image
              : "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
          }
          alt="product image"
        />
        <span>{product.title}</span>
      </TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.discount ? product.discount : 0}</TableCell>
      <TableCell>
        <form>
          <div className="space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"sm"} variant="destructive">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(product.id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] h-[90vh] scrollbar overflow-y-scroll">
                <ProductForm type={'update'} product={product} onSubmit={onUpdate} />
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
