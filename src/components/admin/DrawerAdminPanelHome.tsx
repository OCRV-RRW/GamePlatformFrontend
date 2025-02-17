import { Divider, Drawer, List, ListItem } from "@mui/material";
import ToGameListAdminPanelButton from "./ToGameListAdminPanelButton";
import { grey, red } from "@mui/material/colors";
import ToSkillsListAdminPanelButton from "./ToSkillsListAdminPanelButton";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface DrawerAdminPanelHomeProps {
    drawer_width: string
}

export function DrawerAdminPanelHome({drawer_width}: DrawerAdminPanelHomeProps) {
    return <>
        <Drawer sx={{
            boxSizing: 'border-box',
            width: drawer_width,
            containerType: 'inline-size',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawer_width, backgroundColor: grey[900]}}} variant='permanent'>
                <h1 style={{color: grey[500]}}><AdminPanelSettingsIcon/></h1>
                <Divider sx={{borderColor: grey[500]}} variant='middle'/>
                <List>
                    <ListItem sx={{justifyContent: 'center'}}>
                        <ToGameListAdminPanelButton />
                    </ListItem>
                    <ListItem sx={{justifyContent: 'center'}}>
                        <ToSkillsListAdminPanelButton />
                    </ListItem>
                </List>
        </Drawer>
    </>
}