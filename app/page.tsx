"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import ChartsDemo  from "@/components/charts-demo"

import { FaRegSnowflake } from "react-icons/fa";

import { FaTemperatureHigh } from 'react-icons/fa'; // Import temperature icon
import { FaCloud, FaWind, FaTint } from 'react-icons/fa';
import { BiDevices } from "react-icons/bi";
import { Charts } from "@/components/charts";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ModeToggle />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center shadow-blue">
              <div className="flex items-center gap-2">
                <FaTemperatureHigh className="text-2xl text-red-500" /> {/* Temperature Icon */}
                <h3 className="text-2xl font-bold">Temperature</h3>
              </div>
              <div className="flex mt-6 justify-center">
                <h2 className="text-2xl">65°C</h2>
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center shadow-blue">
              <div className="flex items-center gap-2">
                <FaCloud className="text-3xl text-blue-500" /> {/* Placeholder Cloud Icon */}
                <h3 className="text-2xl font-bold">Humidity</h3>
              </div>
              <div className="flex mt-6 justify-center">
                <h2 className="text-2xl">30%</h2>
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center shadow-blue">
              <div className="flex items-center gap-2">
                <BiDevices className="text-3xl text-purple-500" />
                <h3 className="text-2xl font-bold">Devices</h3>
              </div>
              <div className="flex mt-6 justify-center">
                <h2 className="text-xl">Total 5</h2>
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center shadow-blue">
              <div className="flex items-center gap-2">
                <FaTint className="text-3xl text-blue-400" /> {/* Placeholder Rain Icon */}
                <h3 className="text-2xl font-bold">Precipitation</h3>
              </div>
              <div className="flex mt-6 justify-center">
                <h2 className="text-2xl">31°C</h2>
              </div>
            </div>



          </div>
          <div className="" >
            {/* <ChartsDemo /> */}
            <Charts/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
