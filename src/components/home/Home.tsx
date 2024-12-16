import { useAppSelector } from "../../app/hooks"
import Logout from "../logout/Logout"
import { selectUserData } from "../../reducers/UserSlice"

export default function Home() {
    const user_data = useAppSelector(selectUserData)
    return (
        <>
            <h1>Добро пожаловать {user_data?.name}</h1>
            <Logout/>
        </>
    )
}