import Topbar from "@/components/ui/apps/topbar/Topbar";
import { Outlet } from "react-router-dom";
import backgroundImage from "../images/bg-image.jpeg";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <>
      <div className="font-poppins">
        <Topbar/>
        <div
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.1), rgba(0,0,0,0.1)),url(${backgroundImage})`,
          }}
          className="min-h-[100vh] pb-6 pt-20 bg-cover bg-center"
        >
          <div className="w-[96%] mx-auto">
            <Outlet/>
          </div>
        </div>
        <Toaster/>
      </div>
    </>
  );
};

export default Layout;
