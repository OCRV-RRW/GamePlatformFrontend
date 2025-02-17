import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GAMES_LIST_PATH } from "../../constants/BrowserPathes";
import { useNavigate } from "react-router";

export default function ToUpdateGamePageButton() {
    const navigate = useNavigate()
    
    const onClickUpdateGame = () => {
        navigate(GAMES_LIST_PATH)
    }

    return <>
        <Button type='submit' variant='outlined' onClick={onClickUpdateGame} sx={{
            color: grey[900],
            borderColor: grey[900],
            margin: 1}}>
                Обновить игру
        </Button>
    </>
}