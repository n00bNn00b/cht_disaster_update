import { NavLink } from 'react-router-dom'

const AdmitCard = () => {
  return (
    <>
     <div className='flex flex-col gap-2'>
     <NavLink to="/admin/verify" className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }>টিমের অগ্রগতি
      </NavLink>
      <NavLink to="/admin/affected-area" className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }>দুর্গত এলাকাসমূহ
      </NavLink>
      <NavLink to="/admin/victim-list" className={({ isActive }) =>
            isActive
              ? "underline text-white font-special font-bold"
              : "text-white font-special font-bold hover:underline"
          }>ভিক্টিমের তালিকা
      </NavLink> 
     </div>
    </>
  )
}

export default AdmitCard
