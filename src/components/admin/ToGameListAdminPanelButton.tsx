import { Box } from "@mui/material";
import VideogameIcon from '@mui/icons-material/VideogameAsset';
import { AdminPanelDrawerButton } from "./AdminPanelDrawerButton";
import { AdminPages, ChangePageFuncContext } from "./admin-panel-home/AdminPanelHome";
import { red } from "@mui/material/colors";

export default function ToGameListAdminPanelButton() {
    return <>
        <ChangePageFuncContext.Consumer>
            {page => (
                <AdminPanelDrawerButton variant={page.page === 'games' ? 'contained' : 'text'} onClick={() => {
                    page.change_page('games')}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <VideogameIcon sx={{padding: 1, color: red[400]}}/>
                        Игры
                    </Box>
                </AdminPanelDrawerButton>
            )}
        </ChangePageFuncContext.Consumer>
    </>
}