import { useAppSelector } from "../../app/hooks"
import { selectUserData } from "../../reducers/UserSlice"
import AdminPanelButton from "../admin/AdminPanelButton"
import Logout from "../logout/Logout"
import { Avatar, Box, Button, Tooltip } from "@mui/material"
import { deepOrange, grey, red } from "@mui/material/colors"

export default function HomeHeader() {
    const user_data = useAppSelector(selectUserData)

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <h1 style={{color: red[400], margin: 10}}>ОЦРВ</h1>
                    <AdminPanelButton />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Tooltip title={user_data?.name}>
                    <Avatar sx={{ bgcolor: deepOrange[500], margin: 1 }}>{user_data?.name?.at(0)?.toUpperCase()}</Avatar>
                </Tooltip>
                <Logout /> 
                </Box>
            </Box>
        </>
    )
}