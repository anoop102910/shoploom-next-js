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
import CategoryForm from "./CategoryForm";

function CategoryRow({ category, onDelete, onUpdate }) {
  let name = 'rohan'
  return (
    <TableRow>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell >
        {category.parentId ? category.parentCategory.name : "No Category"}
      </TableCell>
      <TableCell className="line-clamp-1" >
        {category.description ? category.description.slice(0,10): "No Description"}
      </TableCell>
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
                    onClick={() => onDelete(category.id)}
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
              <DialogContent className="sm:max-w-[600px]">
                <CategoryForm category={category} onSubmit={onUpdate} />
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </TableCell>
    </TableRow>
  );
}

export default CategoryRow;
