import { useEffect, useState } from "react"
import { Game } from "../../app/game_type"
import { useAppDispatch } from "../../app/hooks"
import { fetch_get_games } from "../../api/getGamesAPI"
import { updateToken } from "../../reducers/UserSlice"
import GameCard from "./GameCard"
import game_catalog_styles from '../../../src/css_modules/style.module.css'
import { Box } from "@mui/material"
import Loader from "../loader/Loader"
import { cyan, grey } from "@mui/material/colors"

export default function GameCatalog() {
    const dispatch = useAppDispatch()
    const [games, setGames] = useState<Array<Game>>([])
    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setLoading(true)
        fetch_get_games().then((data) => {
            dispatch(updateToken({access_token: data.access_token}))
            return data.response.json()
        }).then((json) => {
            setGames(json.data?.games)
            setLoading(false)
        })
    }, [dispatch])

    return (
        <>
        <h1 style={{color: grey[500]}}>Каталог игр</h1>
        {/* className={game_catalog_styles.gamesCatalog} */}
        {!loading &&  <Box sx={{

}}>
    <div className={game_catalog_styles.gameCatalogGrid}>
        {games.map((gd) => <GameCard key={gd.name} game_data={gd}></GameCard>)}
    </div>
</Box>}
        {loading && <Loader />}
        </>
    )
}