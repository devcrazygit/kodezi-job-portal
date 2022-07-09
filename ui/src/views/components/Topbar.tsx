import { Button, Toolbar } from "@mui/material";

const Topbar = () => {
    return (
        <div className="flex justify-end" color="primary">
            <Toolbar>
                <Button variant="outlined">Log Out</Button>
            </Toolbar>
        </div>
    )
}
export default Topbar;