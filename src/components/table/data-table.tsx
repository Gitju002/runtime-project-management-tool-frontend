import { useEffect, useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, EyeClosed, FileDown, Sheet } from "lucide-react";
import { DataTableSkeleton } from "../skeleton/data-table-skeleton";
import {
  useGetCSVByUserMutation,
  useGetPDFByUserMutation,
} from "@/store/api/user";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUser, setSelectedUser] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const userName = params.get("userName");
    if (userName) {
      setSelectedUser(userName);
    }
  }, [searchParams]);

  const [getCSVByUser] = useGetCSVByUserMutation();
  const [getPDFByUser] = useGetPDFByUserMutation();

  const handleDownload = async (type: "csv" | "pdf") => {
    try {
      const fetchFunction =
        type === "csv"
          ? await getCSVByUser(selectedUser ? selectedUser : "").unwrap()
          : await getPDFByUser(selectedUser ? selectedUser : "").unwrap();

      if (!fetchFunction) {
        return;
      }

      const blob = new Blob([fetchFunction], {
        type: type === "csv" ? "text/csv" : "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `tasks.${type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Failed to download ${type}`, error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center py-4">
        <div className="flex gap-2 justify-start">
          {(router.pathname === "/user" ||
            router.pathname === "/admin/analytics") && (
            <div>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => handleDownload("csv")}
              >
                <Sheet />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => handleDownload("pdf")}
              >
                <FileDown />
              </Button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Eye size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader className="text-nowrap ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="transition-all duration-200 dark:text-lime-shade"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="text-nowrap"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center h-96">
                      <img
                        src="/images/missing.png"
                        alt="No projects found"
                        className="w-36 h-36 mb-4"
                      />
                      <p className="text-lg font-semibold text-gray-600">
                        No projects found.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please verify the search criteria and try again.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
