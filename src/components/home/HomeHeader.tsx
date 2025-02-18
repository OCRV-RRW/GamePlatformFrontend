import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { User } from "../../app/user_type"
import { selectUserData } from "../../reducers/UserSlice"
import AdminPanelButton from "../admin/AdminPanelButton"
import Logout from "../logout/Logout"
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
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
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <ProfileMenu user_data={user_data}/>
                </Box>
            </Box>
        </>
    )
}

interface ProfileMenuProps {
    user_data: User | null
}

export function ProfileMenu({user_data}: ProfileMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            {user_data && <>
                <Tooltip title={user_data.name}>
                    <IconButton
                        size='large'    
                        sx={{ ml: 2, width: 40, height: 40, margin: 1 }}
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        aria-expanded={open ? 'true' : undefined}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{user_data.name?.at(0)?.toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu 
                    anchorEl={anchorEl} 
                    id="profile-menu"
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                textAlign: 'center',
                                backgroundColor: grey[500],
                                overflow: 'visible',
                                mt: 1.5,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <h4 style={{padding: 10}}>имя: {user_data.name}</h4>
                        <Divider />
                        <h4 style={{padding: 10}}>почта: {user_data.email}</h4>
                        <Divider />
                        <MenuItem sx={{justifyContent: 'center'}}>
                            <Logout />
                        </MenuItem>
                </Menu>
            </>}
        </>
    )
}