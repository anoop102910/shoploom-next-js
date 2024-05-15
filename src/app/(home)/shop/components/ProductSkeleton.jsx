import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton({count}) {
  return (
    <div className="flex gap-4 flex-wrap basis-4/5">
      {[...Array(count)].map((_, index) => ( 
        <div key={index}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
