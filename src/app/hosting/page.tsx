// "use client";

import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import {
  Card,
  Metric,
  Text,
  CategoryBar,
  Legend,
  Title,
  DonutChart,
} from "@tremor/react";



import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { hostingSchema } from "./data/schema";
import { Hosting } from "./data/hosting";
import slugify from "@sindresorhus/slugify";

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// };

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(path.join(process.cwd(), "./data/tasks.json"));

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

export default async function TaskPage() {
  // const tasks = await getTasks();

  var totalBill = 0;

  for (var i = 0; i < Hosting.length; i++) {
    var bill = parseFloat(Hosting[i].bill);
    if (!isNaN(bill)) {
      totalBill += bill;
    }
  }

  var zeroBillCount = 0;

  for (var i = 0; i < Hosting.length; i++) {
    var bill = parseFloat(Hosting[i].bill);
    if (bill === 0) {
      zeroBillCount++;
    }
  }

  // console.log(zeroBillCount);

  var wpEngineCount = 0;

  for (var i = 0; i < Hosting.length; i++) {
    if (Hosting[i].server === "WPEngine") {
      wpEngineCount++;
    }
  }

  // console.log(wpEngineCount);

  var nexcess1Count = 0;

  for (var i = 0; i < Hosting.length; i++) {
    if (Hosting[i].server === "Nexcess1") {
      nexcess1Count++;
    }
  }

  var nexcess2Count = 0;

  for (var i = 0; i < Hosting.length; i++) {
    if (Hosting[i].server === "Nexcess2") {
      nexcess2Count++;
    }
  }

  const serverDonut = [
    {
      name: "WPEngine",
      sales: wpEngineCount,
    },
    {
      name: "Nexcess1",
      sales: nexcess1Count,
    },
    {
      name: "Nexcess2",
      sales: nexcess2Count,
    },
  ];

  // const newArray = Hosting.map((obj) => {
  //   return { ...obj, client: slugify(obj.client) };
  // });

  // console.log(newArray);

  return (
    <div className="mx-auto my-16 max-w-7xl px-6  lg:px-8">
      <div className="hidden h-full flex-1 flex-col mt-8 space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Hosting</h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>

          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={Hosting} columns={columns} />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        <Card className="" decoration="top" decorationColor="orange">
          <Text>Total Sites</Text>
          <Metric>{Hosting.length}</Metric>
        </Card>
        <Card className="" decoration="top" decorationColor="emerald">
          <Text>Total Billing/Month</Text>
          <Metric>{`$${totalBill}`}</Metric>
        </Card>
        <Card className=" " decoration="top" decorationColor="red">
          <Text>Unbilled Clients</Text>
          <Metric>{zeroBillCount}</Metric>
        </Card>
        <Card className="col-span-3 max-w-xs">
          <Title>Site Server Location</Title>
          <DonutChart
            variant="pie"
            className="mt-6"
            // showLabel={false}
            data={serverDonut}
            category="sales"
            // label="Sites"
            index="name"
            // valueFormatter={valueFormatter}
            colors={["orange", "violet", "indigo"]}
          />
        </Card>
      </div>
    </div>
  );
}
