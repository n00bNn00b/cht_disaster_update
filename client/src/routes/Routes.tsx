import Layout from "@/Layout/Layout";
import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";
import AffectedAreaDashboard from "@/pages/AdminDashboard/AffectedAreaDashboard";
import AffectedAreasPage from "@/pages/AffectedAreas/AffectedAreas";
import Home from "@/pages/Home/Home";
import AffectedAreas from "@/pages/Submit/AffectedAreas";
import Submit from "@/pages/Submit/Submit";
import VictimFamilyForm from "@/pages/Submit/VictimFamilyForm";
import TeamProgress from "@/pages/TeamProgress/TeamProgress";
import VictimFamilyList from "@/pages/VictimFamily/VictimFamilyList";
import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/admin/verify",
                element: <AdminDashboard/>,
            },
            {
                path: "admin/affected-area",
                element: <AffectedAreaDashboard/>
            },
            {
                path: "/affected-areas",
                element: <AffectedAreasPage/>
            },
            {
                path: "/victim-family-list",
                element: <VictimFamilyList/>
            },
            {
                path: "/submit",
                element: <Submit/>,
                children: [
                    {
                        path: "affected-areas",
                        element: <AffectedAreas/>
                    },
                    {
                        path: "team-progress",
                        element: <TeamProgress/>
                    },
                    {
                        path: "victim-family-list",
                        element: <VictimFamilyForm/>
                    }
                ]
            }
        ]
    }
]);

export default routes;