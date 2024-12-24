import { useContext, useRef } from "react";
import { PathContext } from "./Page";
import { FORGOT_PASSWORD_PATH, GAME_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "../../constants/BrowserPathes";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../forgot-password/ForgotPassword";
import Home from "../home/Home";
import Game from "../game/Game";

export default function SelectPath() {
    const path = useContext(PathContext)

    const pages = useRef<{path: string, page: JSX.Element}[]>(
        [
            {path: REGISTER_PATH, page: <Register />},
            {path: LOGIN_PATH, page: <Login />},
            {path: FORGOT_PASSWORD_PATH, page: <ForgotPassword />},
            {path: HOME_PATH, page: <Home />},
            {path: GAME_PATH, page: <Game />}
        ]
    )
    
    const selectComponent = (path_context: string) : JSX.Element => {
        const el = pages.current.find(({path}) => path === path_context)
        return el?.page ?? <>
            <h1>401</h1>
        </>
    }

    return(
        <>
            {selectComponent(path)}
        </>
    )
}