import { LOGIN_PATH } from "../../constants/BrowserPathes"
import { useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router"
import { send_log_out } from "../../reducers/UserSlice"
import { Button, IconButton, Tooltip } from "@mui/material"
import { grey, red } from "@mui/material/colors"
import LogoutOutlined from "@mui/icons-material/Logout"

export default function Logout() {
    const dispath = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispath(send_log_out())
            .then(() => navigate(LOGIN_PATH))
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