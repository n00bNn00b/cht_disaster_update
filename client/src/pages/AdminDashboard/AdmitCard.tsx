import { NavLink, Outlet } from 'react-router-dom'

const AdmitCard = () => {
  return (
    <>
     <div className='flex flex-col gap-2'>
      <NavLink to="/admin/verify/home" className={({ isActive }) =>
              isActive
                ? "underline text-white font-special font-bold"
                : "text-white font-special font-bold hover:underline"
            }>টিমের অগ্রগতি
        </NavLink>
        <NavLink to="/admin/verify/areas" className={({ isActive }) =>
              isActive
                ? "underline text-white font-special font-bold"
                : "text-white font-special font-bold hover:underline"
            }>দুর্গত এলাকাসমূহ
        </NavLink>
        <NavLink to="/admin/verify/victim-list" className={({ isActive }) =>
              isActive
                ? "underline text-white font-special font-bold"
                : "text-white font-special font-bold hover:underline"
            }>ভিক্টিমের তালিকা
        </NavLink> 
     </div>
     <div className='mt-6'>
      <Outlet/>
     </div>
    </>
  )
}

export default AdmitCard
