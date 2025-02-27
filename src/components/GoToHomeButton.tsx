import { useNavigate } from "react-router"
import game_header_styles from '../../src/css_modules/style.module.css'
import { red } from "@mui/material/colors"
import { Button } from "@mui/material"

interface GoToOtherPageButtonProps {
    pathToPage: string
}

export default function GoToOtherPageButton({ pathToPage } : GoToOtherPageButtonProps) {
    const navigate = useNavigate()

    const goToPage = () => {
        navigate(pathToPage)
    }

    return (
        <>
            <Button onClick={goToPage} className={game_header_styles.noSelect} style={{color: red[400], margin: 10}}>
                <h1>ОЦРВ</h1>
            </Button>
        </>
    )
}