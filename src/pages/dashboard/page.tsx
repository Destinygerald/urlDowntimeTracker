import { Route, Routes } from "react-router-dom"
import { DashboardMain } from "../../components/dashboard/main"
import { Topbar } from "../../components/dashboard/topbar"
import "../../styles/dashboard.css"
import { Details } from "../../components/dashboard/details"

export default function Page () {
    return (
        <div className="dashboard">
            <Topbar />
            
            <Routes>
                <Route path="/" Component={DashboardMain} />
                <Route path="/:id" Component={Details} />
                <Route path="*" Component={DashboardMain} />
            </Routes>
        </div>
    )
}