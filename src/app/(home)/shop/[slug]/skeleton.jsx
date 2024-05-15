import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton({ count }) {
  return (
    <div className="flex gap-8 flex-wrap p-10 pt-20">
      <div className="w-full flex min-h-[70vh] gap-10">
        <Skeleton className="flex-1 rounded-lg  bg-slate-300 mb-4" />
        <div className="flex-1 w-full">
          <div className="space-y-4 ">
            <Skeleton className="h-12 w-[400px]" />
            <Skeleton className="h-16 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="flex space-x-2 mt-6 items-center">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
