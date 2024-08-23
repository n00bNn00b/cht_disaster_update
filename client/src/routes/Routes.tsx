import Layout from "@/Layout/Layout";
import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn/SignIn";
import AffectedAreas from "@/pages/Submit/AffectedAreas";
import Submit from "@/pages/Submit/Submit";
import TeamProgress from "@/pages/TeamProgress/TeamProgress";
import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            },
            {
                path: "/admin",
                element: <SignIn/>
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
                    }
                ]
            }
        ]
    }
]);

export default routes;