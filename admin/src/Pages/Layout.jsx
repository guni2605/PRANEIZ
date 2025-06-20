import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Layout = () => (
  <div className="flex flex-col md:flex-row min-h-screen">
    <div className="w-full md:w-[20%]">
      <Sidebar />
    </div>
    <div className="flex-1 p-4 bg-gray-50">
      <Outlet />
    </div>
  </div>
);

export default Layout;
