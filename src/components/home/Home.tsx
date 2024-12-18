import { useAppSelector, useAppDispatch } from "../../app/hooks"
import Logout from "../logout/Logout"
import { selectUserData, send_user_get_me } from "../../reducers/UserSlice"

export default function Home() {
    const user_data = useAppSelector(selectUserData)
    const dispatch = useAppDispatch()

    const buttonClick = () => {
        dispatch(send_user_get_me()).then((payload) => {console.log(payload)})
    }

    return (
        <>
            <h1>Добро пожаловать {user_data?.name}</h1>
            <Logout/>
            <button onClick={buttonClick}>ПОЛУЧИТЬ</button>
        </>
    )
}