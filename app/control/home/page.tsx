"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { FaLightbulb, FaTv, FaDoorClosed } from "react-icons/fa";

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
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Light Toggle Card */}
            <div className="aspect-video rounded-xl bg-gray-100 p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <FaLightbulb className="text-4xl text-yellow-500" />
              <h3 className="mt-4 text-2xl font-semibold">Toggle Light</h3>
              <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                Turn On/Off
              </button>
            </div>

            {/* TV Control Card */}
            <div className="aspect-video rounded-xl bg-gray-100 p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <FaTv className="text-4xl text-blue-500" />
              <h3 className="mt-4 text-2xl font-semibold">TV Control</h3>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Turn On/Off
              </button>
            </div>

            {/* Smart Door Lock Card */}
            <div className="aspect-video rounded-xl bg-gray-100 p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <FaDoorClosed className="text-4xl text-red-500" />
              <h3 className="mt-4 text-2xl font-semibold">Smart Door Lock</h3>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Lock/Unlock
              </button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
