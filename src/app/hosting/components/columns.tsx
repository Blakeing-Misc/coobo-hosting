"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import slugify from "@sindresorhus/slugify";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[500px] hover:text-slate-500 font-medium items-center">
        <Link href={`/clients/${slugify(row.getValue("client"))}`}>
          {row.getValue("client")}
        </Link>
        {/* <ArrowUpRight className="ml-2 h-4 w-4 text-muted-foreground" /> */}
      </div>
    ),
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "siteURL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Site URL" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[500px] hover:text-slate-500 items-center">
        <Link href={row.getValue("siteURL")}>{row.getValue("siteURL")}</Link>
        <ArrowUpRight className="ml-2 h-4 w-4 text-muted-foreground" />
      </div>
    ),
    // enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Email" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate">
            {row.getValue("contactEmail")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "bill",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{`$${row.getValue("bill")}`}</div>
    ),
  },
  {
    accessorKey: "billDay",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Day" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("billDay")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
