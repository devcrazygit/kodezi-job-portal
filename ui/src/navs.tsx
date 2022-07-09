import { matchPath } from "react-router";
import SignIn from "views/layouts/authentication/SignIn";
import SignUp from "views/layouts/authentication/SignUp";
import AdminHome from "views/pages/admin/AdminHome";
import EmptyPage from "views/pages/EmptyPage";
import UserHome from "views/pages/user/UserHome";

export enum Guard {
    PUBLIC = 0,
    USER = 1,
    ADMIN = 2
}

export type NavItemType = {
    anchor: string;
    to: string;
    component: any,
    guard: Guard
}

const navs: NavItemType[] = [
    {
        anchor: 'User Dashboard',
        to: '/user',
        component: UserHome,
        guard: Guard.USER
    },
    {
        anchor: 'Admin Dashboard',
        to: '/admin',
        component: AdminHome,
        guard: Guard.ADMIN
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
    