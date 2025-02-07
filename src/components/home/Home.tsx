import { useNavigate } from "react-router"
import GameCatalog from "../game/GameCatalog"
import HomeHeader from "./HomeHeader"
import { GAMES_LIST_PATH } from "../../constants/BrowserPathes"
import RefreshTokenTimer from "../refresh_token_timer/RefreshTokenTimer"

export default function Home() {
    const navigate = useNavigate()
    
    const onClickUpdateGame = () => {
        navigate(GAMES_LIST_PATH)
    }

    return (
        <>
            <HomeHeader />
            <GameCatalog />
            <RefreshTokenTimer />
            <button onClick={onClickUpdateGame}>Обновить игру</button>
        </>
    )
}