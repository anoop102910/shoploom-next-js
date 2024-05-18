"use client";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({columnCount,rowCount=10}) => {
  return (
    <tbody>
      {[...Array(rowCount)].map((_, index) => (
        <tr key={index}>
          {[...Array(columnCount)].map((_, index) => (
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
