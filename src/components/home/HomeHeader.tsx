import { useAppSelector } from "../../app/hooks"
import { selectUserData } from "../../reducers/UserSlice"
import Logout from "../logout/Logout"
import home_header_styles from '../../../src/css_modules/style.module.css'
import { Avatar, Box, Button, Tooltip } from "@mui/material"
import { deepOrange, grey, red } from "@mui/material/colors"
import { useNavigate } from "react-router"
import { GAMES_LIST_PATH } from "../../constants/BrowserPathes"

export default function HomeHeader() {
    const user_data = useAppSelector(selectUserData)
    const navigate = useNavigate()

    const onClickUpdateGame = () => {
        navigate(GAMES_LIST_PATH)
    }
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
                    <Button type='submit' variant='outlined' onClick={onClickUpdateGame} sx={{
                        color: grey[900],
                        borderColor: grey[900],
                        margin: 1
                    }}>Обновить игру</Button>
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