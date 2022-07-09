import { Button, Toolbar } from "@mui/material";
import LocalStorage from "global/LocalStorage";
import { useCallback } from "react";
import { useAppDispatch } from "store";
import { signOut } from "store/reducers/session";

const Topbar = () => {
    const dispatch = useAppDispatch();

    const logOut = useCallback(() => {
        LocalStorage.removeToken();
        dispatch(signOut());
        window.location.href = "/signin";
    }, [dispatch])
    return (
        <div className="flex justify-end" color="primary">
            <Toolbar>
                <Button variant="outlined" onClick={logOut}>Log Out</Button>
            </Toolbar>
        </div>
    )
}
export default Topbar;