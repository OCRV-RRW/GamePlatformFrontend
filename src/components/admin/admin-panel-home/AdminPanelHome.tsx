import { Box } from "@mui/material";
import Header from "../header/Header";
import { DrawerAdminPanelHome } from "../DrawerAdminPanelHome";
import { createContext, useState } from 'react';
import GamesList from "../update-game/GamesList";
import { grey, red } from "@mui/material/colors";
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SkillsList from "../update-skill/SkillsList";

export type AdminPages = 'none' | 'games' | 'skills'

export const ChangePageFuncContext = createContext<{page: AdminPages, change_page: (page: AdminPages) => void}>({page: 'none', change_page: () => {}})

export default function AdminPanelHome() {
    const [currentPage, setCurrentPage] = useState<AdminPages>('games')
    const drawer_width = '15%'
    return <>
        <ChangePageFuncContext.Provider value={{page: currentPage, change_page: setCurrentPage}}>
            <Box sx={{display: 'flex'}}>
                <DrawerAdminPanelHome  drawer_width={drawer_width}/>
                <Box sx={{width: {sm: `calc(100% - ${drawer_width})`}}}>
                    <Header />
                    {currentPage === 'games' && <GamesList />}
                    {currentPage === 'skills' && <SkillsList />}
                    {currentPage === 'none' && <Box><h1 style={{color: grey[500]}}>Ничего не выбрано</h1><SentimentDissatisfiedTwoToneIcon sx={{width: 100, height: 100, color: red[900]}}/></Box>}
                </Box>
            </Box>
        </ChangePageFuncContext.Provider>
    </>
}