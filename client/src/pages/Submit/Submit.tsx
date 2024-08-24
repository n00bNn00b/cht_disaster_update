import { NavLink, Outlet } from "react-router-dom"


const Submit = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <NavLink to={'/submit/team-progress'} className={({isActive}) => isActive? "underline text-white font-special font-bold" : "text-white font-special font-bold hover:underline"}>Submit Team Progress</NavLink>
        <NavLink to={'/submit/affected-areas'} className={({isActive}) => isActive? "underline text-white font-special font-bold" : "text-white font-special font-bold hover:underline"}>Submit Affected Areas</NavLink>
        <NavLink to={'/submit/victim-family'} className={({isActive}) => isActive? "underline text-white font-special font-bold" : "text-white font-special font-bold hover:underline"}>Submit Victim Family Information</NavLink>
      </div>
      <div className="mt-4">
        <Outlet/> 
      </div>
    </>
  )
}

export default Submit