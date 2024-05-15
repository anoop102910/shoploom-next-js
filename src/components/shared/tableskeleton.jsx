"use client";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({count}) => {
  return (
    <tbody>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          <td className="p-4">
            <Skeleton className="h-4 w-4" />
          </td>
          {[...Array(count)].map((_, index) => (
            <td key={index} className="px-6 py-4">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-20" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
