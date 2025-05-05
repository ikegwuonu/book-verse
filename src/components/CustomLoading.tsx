import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8 pt-16">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Skeleton className="h-10 w-full sm:w-96" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <TableLoading
            columns={6}
            rows={8}
            hasActions={true}
            hasImage={true}
            hasBadge={true}
            headerSizes={["w-64", "w-24", "w-32", "w-40", "w-32", "w-24"]}
            cellSizes={["w-48", "w-16", "w-24", "w-32", "w-24", "w-16"]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface TableLoadingProps {
  columns: number;
  rows: number;
  hasActions?: boolean;
  hasBadge?: boolean;
  hasImage?: boolean;
  headerSizes?: string[];
  cellSizes?: string[];
}

export function TableLoading({
  columns = 5,
  rows = 10,
  hasActions = true,
  hasBadge = false,
  hasImage = false,
  headerSizes = [],
  cellSizes = [],
}: TableLoadingProps) {
  // Default header sizes if not provided
  const defaultHeaderSizes = Array(columns).fill("w-full");
  const actualHeaderSizes = headerSizes.length
    ? headerSizes
    : defaultHeaderSizes;

  // Default cell sizes if not provided
  const defaultCellSizes = Array(columns).fill("w-full");
  const actualCellSizes = cellSizes.length ? cellSizes : defaultCellSizes;

  return (
    <div className="w-full overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={`header-${index}`}>
                <Skeleton
                  className={`h-5 ${actualHeaderSizes[index] || "w-full"}`}
                />
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="text-right">
                <Skeleton className="h-5 w-16 ml-auto" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  {colIndex === 0 && hasImage ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div className="space-y-1">
                        <Skeleton
                          className={`h-5 ${actualCellSizes[colIndex] || "w-32"}`}
                        />
                        {rowIndex % 2 === 0 && (
                          <Skeleton className="h-4 w-24" />
                        )}
                      </div>
                    </div>
                  ) : hasBadge && colIndex === 1 ? (
                    <Skeleton className="h-6 w-16 rounded-full" />
                  ) : (
                    <Skeleton
                      className={`h-5 ${actualCellSizes[colIndex] || "w-full"}`}
                    />
                  )}
                </TableCell>
              ))}
              {hasActions && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
