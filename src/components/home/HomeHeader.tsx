import { useAppSelector } from "../../app/hooks"
import { selectUserData } from "../../reducers/UserSlice"
import Logout from "../logout/Logout"
import home_header_styles from '../../../src/css_modules/style.module.css'

export default function HomeHeader() {
    const user_data = useAppSelector(selectUserData)

    return (
        <>
            <div className={home_header_styles.homeHeader}>
                <h1>{user_data?.name}</h1>
                <Logout /> 
            </div>
        </>
    )
}