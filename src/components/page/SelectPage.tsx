import { useContext, useRef } from "react";
import { PathContext } from "./Page";
import { FORGOT_PASSWORD_PATH, GAME_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH, REGISTER_VERIFY_EMAIL_PATH, RESET_PASSWORD_PATH } from "../../constants/BrowserPathes";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../forgot-password/ForgotPassword";
import Home from "../home/Home";
import Game from "../game/Game";
import VerifyEmail from "../register/VerifyEmail";
import ResetPassword from "../reset-password/ResetPassword";
import NotFoundPage from "../not-found-page/NotFoundPage";

export default function SelectPath() {
    const path = useContext(PathContext)

    const pages = useRef<{path: string, page: JSX.Element}[]>(
        [
            {path: REGISTER_PATH, page: <Register />},
            {path: LOGIN_PATH, page: <Login />},
            {path: FORGOT_PASSWORD_PATH, page: <ForgotPassword />},
            {path: HOME_PATH, page: <Home />},
            {path: GAME_PATH, page: <Game />},
            {path: REGISTER_VERIFY_EMAIL_PATH, page: <VerifyEmail />},
            {path: RESET_PASSWORD_PATH, page: <ResetPassword />}
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