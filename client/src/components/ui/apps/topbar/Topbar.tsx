import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <>
      <div className="bg-Green-200 text-white w-[100vw] h-16 fixed z-10 ">
        <div className="w-[90%] h-full mx-auto flex justify-between items-center">
          {/* logo */}
          <h1 className="font-special font-extrabold text-xl">
            CHT Disaster Updates(Beta)
          </h1>

          {/* menu */}
          <Menu className="md:hidden" />
          <div className="hidden md:flex md:gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/submit"}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Submit
            </NavLink>
            <NavLink
              to={"/about-us"}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              About Us
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
