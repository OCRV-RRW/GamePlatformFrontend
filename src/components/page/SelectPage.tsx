import { useContext, useEffect, useRef, useState } from "react";
import { PathContext } from "./Page";
import { 
    ADMIN_PANEL_PATH,
    FORGOT_PASSWORD_PATH, 
    GAME_PATH, 
    GAMES_LIST_PATH, 
    HOME_PATH, 
    LOGIN_PATH, 
    REGISTER_PATH, 
    REGISTER_VERIFY_EMAIL_PATH, 
    RESET_PASSWORD_PATH, 
    UPDATE_GAME_PATH, 
    UPDATE_SKILL_PATH, 
    UPDATE_USER_PATH
} from "../../constants/BrowserPathes";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../forgot-password/ForgotPassword";
import Home from "../home/Home";
import GamePage from "../game/GamePage";
import VerifyEmail from "../register/VerifyEmail";
import ResetPassword from "../reset-password/ResetPassword";
import GamesList from "../admin/update-game/GamesList";
import UpdateGamePage from "../admin/update-game/UpdateGamePage";
import RefreshTokenTimer from "../refresh_token_timer/RefreshTokenTimer";
import AdminPanelHome from "../admin/admin-panel-home/AdminPanelHome";
import UpdateUserPage from "../admin/update-game/UpdateUserPage";
import UpdateSkillPage from "../admin/update-game/UpdateSkillPage";

export default function SelectPath() {
    const path = useContext(PathContext)
    const [currentComponent, setCurrentComponent] = useState<JSX.Element>()
    const pages = useRef<{path: string, page: JSX.Element}[]>(
        [
            {path: REGISTER_PATH, page: <Register />},
            {path: LOGIN_PATH, page: <Login />},
            {path: FORGOT_PASSWORD_PATH, page: <ForgotPassword />},
            {path: HOME_PATH, page: <Home />},
            {path: GAME_PATH, page: <RefreshTokenTimer>
                    <GamePage />
                </RefreshTokenTimer>},
            {path: REGISTER_VERIFY_EMAIL_PATH, page: <VerifyEmail />},
            {path: RESET_PASSWORD_PATH, page: <ResetPassword />},
            {path: GAMES_LIST_PATH, page: <GamesList />},
            {path: UPDATE_GAME_PATH, page: <UpdateGamePage />},
            {path: ADMIN_PANEL_PATH, page: <AdminPanelHome />},
            {path: UPDATE_USER_PATH, page: <UpdateUserPage />},
            {path: UPDATE_SKILL_PATH, page: <UpdateSkillPage />}
        ]
    )
    
    const selectComponent = (path_context: string) : JSX.Element => {
        const el = pages.current.find(({path}) => path === path_context)
        return el?.page!
    }

    useEffect(() => {
        setCurrentComponent(selectComponent(path))
    }, [path])

    return(
        <>
            {currentComponent}
        </>
    )
}