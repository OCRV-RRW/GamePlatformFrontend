import { Box } from "@mui/material";
import SkillsIcon from '@mui/icons-material/EmojiEvents';
import { AdminPanelDrawerButton } from "./AdminPanelDrawerButton";
import { ChangePageFuncContext } from "./admin-panel-home/AdminPanelHome";
import { red } from "@mui/material/colors";

export default function ToSkillsListAdminPanelButton() {
    return (<>
        <ChangePageFuncContext.Consumer>
            {page => ( 
                <AdminPanelDrawerButton variant={page.page === 'skills' ? 'contained' : 'text'} onClick={() => page.change_page('skills')}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <SkillsIcon sx={{padding: 1, color: red[400]}}/>
                            Скиллы
                    </Box>
                </AdminPanelDrawerButton>
            )}
        </ChangePageFuncContext.Consumer>
    </>)
}