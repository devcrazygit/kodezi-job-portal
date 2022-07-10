import { Button, Toolbar } from "@mui/material";
import LocalStorage from "global/LocalStorage";
import { useCallback } from "react";
import { useAppDispatch } from "store";
import { signOut } from "store/reducers/session";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";

const Topbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        LocalStorage.removeToken();
        dispatch(signOut());
        window.location.href = "/signin";
    }, [dispatch])
    return (
        <div className="flex justify-between" color="primary">
            <div className="flex gap-x-2 cursor-pointer items-center" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
                <div>Back</div>
            </div>
            <Toolbar>
                <Button variant="outlined" onClick={logOut}>Log Out</Button>
            </Toolbar>
        </div>
    )
}
export default Topbar;