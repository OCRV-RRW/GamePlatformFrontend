import { useEffect, useState } from "react"
import { Game } from "../../app/game_type"
import { useAppDispatch } from "../../app/hooks"
import { fetch_get_games } from "../../api/getGamesAPI"
import { updateToken } from "../../reducers/UserSlice"
import GameCard from "./GameCard"
import styles from '../../../src/css_modules/style.module.css'

export default function GameCatalog() {
    const dispatch = useAppDispatch()
    const [games, setGames] = useState<Array<Game>>([])
    
    useEffect(() => {
        fetch_get_games().then((data) => {
            dispatch(updateToken({access_token: data.access_token}))
            return data.response.json()
        }).then((json) => setGames(json.data?.games))
    }, [dispatch])

    return (
        <>
            <div className={styles.gamesCatalog}>
                <h1>Каталог игр</h1>
                <div className={styles.gameCatalogGrid}>
                    {games.map((gd) => <GameCard key={gd.name} game_data={gd}></GameCard>)}
                </div>
            </div>
        </>
    )
}