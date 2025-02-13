import { useNavigate } from "react-router"
import GameCatalog from "../game/GameCatalog"
import HomeHeader from "./HomeHeader"
import { GAMES_LIST_PATH } from "../../constants/BrowserPathes"
import { red } from "@mui/material/colors"

export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <HomeHeader />
            <GameCatalog />
        </>
    )
}