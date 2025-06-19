// Layout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Layout = () => (
  <div style={{ display: "flex" }}>
    <div className="w-[20%]">
      <Sidebar />
    </div>
    <div style={{ flex: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default Layout;
