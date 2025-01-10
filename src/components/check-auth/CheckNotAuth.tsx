import { useNavigate } from "react-router"
import { useAppSelector } from "../../app/hooks"
import { selectAccessToken } from "../../reducers/UserSlice"
import { useEffect } from "react"
import { HOME_PATH } from "../../constants/BrowserPathes"

interface CheckNotAuthProps {
    children: JSX.Element
}

export default function CheckNotAuth({ children } : CheckNotAuthProps) {
    const access_token = useAppSelector(selectAccessToken)
    const navigate = useNavigate()

    useEffect(() => {
        if (access_token !== "") {
            navigate(HOME_PATH)
        }
    }, [access_token])

    return (
        <>
            {access_token === "" && children}
        </>
    )
}