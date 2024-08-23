import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

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
                <Menu/>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="flex justify-end">
                  <div className="flex flex-col items-start gap-4">
                      <NavLink to={'/'} className={({isActive}) => isActive? "underline": "hover:underline"}>Home</NavLink>
                      <NavLink to={'/submit'} className={({isActive}) => isActive? "underline": "hover:underline"}>Submit</NavLink>
                      <NavLink to={'/about-us'} className={({isActive}) => isActive? "underline": "hover:underline"}>About Us</NavLink>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex md:gap-4">
                <NavLink to={'/'} className={({isActive}) => isActive? "underline": "hover:underline"}>Home</NavLink>
                <NavLink to={'/submit'} className={({isActive}) => isActive? "underline": "hover:underline"}>Submit</NavLink>
                <NavLink to={'/about-us'} className={({isActive}) => isActive? "underline": "hover:underline"}>About Us</NavLink>
            </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
