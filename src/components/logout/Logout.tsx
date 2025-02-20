import { useAppDispatch } from "../../app/hooks"
import { send_log_out } from "../../reducers/UserSlice"
import { Button, Tooltip } from "@mui/material"
import { grey } from "@mui/material/colors"
import LogoutOutlined from "@mui/icons-material/Logout"
import { unwrapResult } from "@reduxjs/toolkit"
import { set_status } from "../../reducers/PageSlice"

export default function Logout() {
    const dispath = useAppDispatch()

    const logout = () => {
        dispath(send_log_out())
            .then(unwrapResult)
            .catch((error) => dispath(set_status(error.message)))
    }

    return (
        <>
            <Tooltip title="Выйти">
                <Button sx={{
                        '&.MuiButton-text': {
                            color: grey[900]
                        }}} type='submit' variant='text' onClick={logout}><LogoutOutlined />
                </Button>
            </Tooltip>
        </>
    )
}