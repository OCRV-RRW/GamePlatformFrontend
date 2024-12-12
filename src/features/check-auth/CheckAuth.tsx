import { useAppSelector } from "../../app/hooks";
import { selectAccessToken } from "../user/UserSlice";
import { Navigate } from "react-router";
import { HOME_PATH } from "../../app/BrowserPathes";

interface CheckAuthProps {
    children: JSX.Element,
    redirect_path_unathorized: string
}

export default function CheckAuth({ children, redirect_path_unathorized }: CheckAuthProps) {
    const access_token = useAppSelector(selectAccessToken)

    return (
        <>
            {access_token !== "" 
                ? children 
                : <Navigate to={redirect_path_unathorized}></Navigate>
            }
            {access_token === "" 
                ? children 
                : <Navigate to={HOME_PATH}></Navigate>
            }
        </>
    )
}