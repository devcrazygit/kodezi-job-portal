import { Outlet } from "react-router";
import SideNav from "views/components/SideNav";
import Topbar from "views/components/Topbar";

const DashboardLayout = () => {

    return (
        <div className="flex w-full">
            <SideNav />
            <div className={"bg-gray-100 p-8 w-full max-h-screen flex flex-col"}>
                <Topbar />
                <Outlet />
            </div>
        </div>
    )
}
export default DashboardLayout;