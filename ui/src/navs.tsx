import { matchPath } from "react-router";
import SignIn from "views/layouts/authentication/SignIn";
import SignUp from "views/layouts/authentication/SignUp";
import AdminHome from "views/pages/admin/AdminHome";
import EmptyPage from "views/pages/EmptyPage";
import JobDetail from "views/pages/user/JobDetail";
import AdminJobDetail from "views/pages/admin/JobDetail";
import UserHome from "views/pages/user/UserHome";
import JobCreate from "views/pages/admin/JobCreate";

export enum Guard {
    PUBLIC = 0,
    USER = 1,
    ADMIN = 2
}

export type NavItemType = {
    anchor: string;
    to: string;
    component: any,
    guard: Guard,
    menu?: boolean,
}

const navs: NavItemType[] = [
    {
        anchor: 'Dashboard',
        to: '/user',
        component: UserHome,
        guard: Guard.USER,
        menu: true
    },
    {
        anchor: 'Job Detail',
        to: '/user/jobs/:id',
        component: JobDetail,
        guard: Guard.USER,
        menu: false
    },
    {
        anchor: 'Dashboard',
        to: '/admin',
        component: AdminHome,
        guard: Guard.ADMIN,
        menu: true
    },
    {
        anchor: 'Job Post',
        to: '/admin/jobs/new',
        component: JobCreate,
        guard: Guard.ADMIN,
    },
    {
        anchor: 'Job Detail',
        to: '/admin/jobs/:id',
        component: AdminJobDetail,
        guard: Guard.ADMIN,
    },
    {
        anchor: 'Empty Page',
        to: '/',
        component: EmptyPage,
        guard: Guard.PUBLIC
    },
    {
        anchor: 'Sign In',
        to: '/signin',
        component: SignIn,
        guard: Guard.PUBLIC
    },
    {
        anchor: 'Sign Up',
        to: '/signup',
        component: SignUp,
        guard: Guard.PUBLIC
    }
]

export default navs;
export const publicPaths = navs.filter(({ guard }) => guard === Guard.PUBLIC);
export const adminPaths = navs.filter(({ guard }) => guard === Guard.ADMIN);
export const userPaths = navs.filter(({ guard }) => guard === Guard.USER);

export const isPublicPath = (path: string) =>
    publicPaths.findIndex(({ to }) => to === path) > -1;

export const userNavs = navs.filter(({ guard, menu }) => menu && guard === Guard.USER);
export const adminNavs = navs.filter(({ guard, menu }) => menu && guard === Guard.ADMIN);

export const isUserPath = (path: string) =>
    userPaths.findIndex(({ to }) => to === path) > -1;

export const isAdminhPath = (path: string) =>
    adminPaths.findIndex(({ to }) => to === path) > -1;

export const getNavItemFromPath = (path: string) => {
    for (let i = 0; i < navs.length; i++) {
        if (matchPath(navs[i].to, path)) return navs[i];
    }
    return navs[navs.length - 1];
};