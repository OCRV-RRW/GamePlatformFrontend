import { useContext, useRef } from "react";
import { PathContext } from "./Page";
import { 
    FORGOT_PASSWORD_PATH, 
    GAME_PATH, 
    GAMES_LIST_PATH, 
    HOME_PATH, 
    LOGIN_PATH, 
    REGISTER_PATH, 
    REGISTER_VERIFY_EMAIL_PATH, 
    RESET_PASSWORD_PATH, 
    UPDATE_GAME_PATH 
} from "../../constants/BrowserPathes";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../forgot-password/ForgotPassword";
import Home from "../home/Home";
import Game from "../game/Game";
import VerifyEmail from "../register/VerifyEmail";
import ResetPassword from "../reset-password/ResetPassword";
import NotFoundPage from "../not-found-page/NotFoundPage";
import GamesList from "../admin/update-game/GamesList";
import UpdateGamePage from "../admin/update-game/UpdateGamePage";
import RefreshTokenTimer from "../refresh_token_timer/RefreshTokenTimer";

export default function SelectPath() {
    const path = useContext(PathContext)

    const pages = useRef<{path: string, page: JSX.Element}[]>(
        [
            {path: REGISTER_PATH, page: <Register />},
            {path: LOGIN_PATH, page: <Login />},
            {path: FORGOT_PASSWORD_PATH, page: <ForgotPassword />},
            {path: HOME_PATH, page: <Home />},
            {path: GAME_PATH, page: <RefreshTokenTimer>
                    <Game />
                </RefreshTokenTimer>},
            {path: REGISTER_VERIFY_EMAIL_PATH, page: <VerifyEmail />},
            {path: RESET_PASSWORD_PATH, page: <ResetPassword />},
            {path: GAMES_LIST_PATH, page: <GamesList />},
            {path: UPDATE_GAME_PATH, page: <UpdateGamePage />}
        ]
    )
    
    const selectComponent = (path_context: string) : JSX.Element => {
        const el = pages.current.find(({path}) => path === path_context)
        return el?.page ?? <NotFoundPage />
    }

    return(
        <>
            {selectComponent(path)}
        </>
    )
}