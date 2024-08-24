import { NavLink, Outlet } from "react-router-dom";

const Submit = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
      <NavLink
          to={"/submit/team-progress"}
          className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }
        >
          টিমের অগ্রগতি
        </NavLink>
        <NavLink
          to={"/submit/affected-areas"}
          className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }
        >
          দুর্গত এলাকার নাম হালনাগাদ
        </NavLink>
        <NavLink
          to={"/submit/victim-family-list"}
          className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }
        >
          ভিক্টিমের তালিকা হালনাগাদ
        </NavLink>

      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Submit;
