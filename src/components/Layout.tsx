import { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Navigation from "../components/Navigation";
import SideMenu from "./SideMenu";

// Layout for the app view
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <SideMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component */}
        <div className="flex min-h-0 flex-1 flex-col bg-blue-100 ">
          <div className="flex h-16 flex-shrink-0 items-center px-4 ">
            <img className="h-8 w-auto" src="/logo.svg" alt="Test App" />
            <h1 className="ml-3 text-xl">Test App</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <Navigation />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 md:bg-white bg-blue-100 items-center justify-between">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <img
            className="md:hidden h-8 w-auto px-4"
            src="/logo.svg"
            alt="Test App"
          />
        </div>
        {/* main components*/}
        {children}
      </div>
    </div>
  );
};

export default Layout;
