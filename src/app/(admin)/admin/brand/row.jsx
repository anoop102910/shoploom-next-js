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
import BrandForm from "./BrandForm";

function BrandRow({ brand, onDelete, onUpdate }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{brand.name}</TableCell>
      <TableCell>{brand.description ? brand.description : "No Desciption"}</TableCell>
      <TableCell>{brand.category.name}</TableCell>
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
                    onClick={() => onDelete(brand.id)}
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
              <DialogContent className="sm:max-w-[425px]">
                <BrandForm type={"update"} brand={brand} onSubmit={onUpdate} />
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </TableCell>
    </TableRow>
  );
}

export default BrandRow;
