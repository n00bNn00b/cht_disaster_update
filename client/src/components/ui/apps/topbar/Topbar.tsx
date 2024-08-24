import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  return (
    <>
      <div className="bg-Green-200 text-white w-[100vw] h-16 fixed z-10 ">
        <div className="w-[90%] h-full mx-auto flex justify-between items-center">
          {/* logo */}
          <Link to="/" className="font-special font-extrabold text-xl">
            CHT Disaster Updates(Beta)
          </Link>

          {/* menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-[220px]">
              <SheetHeader>
                <div className="flex flex-col items-start gap-2">
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? "underline text-Green-100"
                        : "hover:underline text-Green-100"
                    }
                  >
                    মূল পাতা
                  </NavLink>
                  <NavLink
                    to={"/submit"}
                    className={({ isActive }) =>
                      isActive
                        ? "underline text-Green-100"
                        : "hover:underline text-Green-100"
                    }
                  >
                    হালনাগাদ করুন
                  </NavLink>
                  <NavLink
                    to={"/affected-areas"}
                    className={({ isActive }) =>
                      isActive
                        ? "underline text-Green-100"
                        : "hover:underline text-Green-100"
                    }
                  >
                    দুর্গত এলাকাসমূহ
                  </NavLink>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>

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
              to={"/affected-areas"}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Affected Areas
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
