import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

export const Layout = () => {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex flex-col w-screen gap-8 py-3 px-10 pb-10">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
