import { getNavItemFromPath, Guard } from "navs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import LocalStorage from "./global/LocalStorage";
import { useAppDispatch, useAppSelector } from "./store"
import { getSession, SessionState } from "./store/reducers/session";
import { sessionSelector } from "./store/selectors/session";
import { Role } from './types/models/session';
const Root = (props: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const {
        data: session,
        loading: sessionLoading,
        initial: sessionInitial
    } = useAppSelector<SessionState>(sessionSelector);

    useEffect(() => {
        const token = LocalStorage.getToken();
        const path = location.pathname;

        const currentPath = getNavItemFromPath(path);
        if (
            token &&
            !session &&
            sessionInitial &&
            !sessionLoading &&
            (currentPath.guard !== Guard.PUBLIC || path === '/')
        ) {
            dispatch(getSession());
        }
        if (currentPath.guard === Guard.USER) {
            if (!session || session.role === Role.ADMIN) {
                navigate('/signin');
                return;
            }
        } else if (currentPath.guard === Guard.ADMIN) {
            if (!session || session.role === Role.USER) {
                navigate('/signin');
                return;
            }
        } else if (path === '/') {
            if (!session) {
                navigate('/signin');
                return;
            }
            if (session.role === Role.USER) {
                navigate('/user');
                return;
            }
            if (session.role === Role.ADMIN) {
                navigate('/admin');
                return;
            }
        } else if (currentPath.to === '/signin') {
            if (session && session.role === Role.USER) {
                navigate('/user'); return;
            }
            if (session && session.role === Role.ADMIN) {
                navigate('/admin'); return;
            }
        }
    }, [dispatch, location.pathname, navigate, session, sessionInitial, sessionLoading])
    
    return <>{props.children}</>
}

export default Root;