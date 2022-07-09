import { Outlet } from "react-router";
import SideNav from "views/components/SideNav";
import Topbar from "views/components/Topbar";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex w-full">
                <SideNav />
                <div className={"bg-gray-100 min-h-full p-8 pb-24 w-full"}>
                    <Topbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default DashboardLayout;