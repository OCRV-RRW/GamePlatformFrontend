import { useAppSelector } from "../../app/hooks";
import { selectAccessToken } from "../user/UserSlice";
import { LOGIN_PATH } from "../../app/BrowserPathes";
import { Navigate } from "react-router";
import { HOME_PATH } from "../../app/BrowserPathes";

interface CheckAuthProps {
    children: JSX.Element
}

export default function CheckAuth({ children }: CheckAuthProps) {
    const access_token = useAppSelector(selectAccessToken)

    return (
        <>
            {access_token !== "" 
                ? children 
                : <Navigate to={LOGIN_PATH}></Navigate>
            }
            {access_token === "" 
                ? children 
                : <Navigate to={HOME_PATH}></Navigate>
            }
        </>
    )
}