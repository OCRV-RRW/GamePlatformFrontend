import { useNavigate } from "react-router"
import { HOME_PATH } from "../constants/BrowserPathes"
import game_header_styles from '../../src/css_modules/style.module.css'
import { red } from "@mui/material/colors"

export default function GoToHomeButton() {
    const navigate = useNavigate()

    const backHome = () => {
        navigate(HOME_PATH)
    }

    return (
        <>
            <h1 onClick={backHome} className={game_header_styles.noSelect} style={{color: red[400], margin: 10}}>ОЦРВ</h1>
        </>
    )
}