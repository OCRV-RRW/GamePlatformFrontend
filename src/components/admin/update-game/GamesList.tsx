import { useEffect, useState } from "react"
import Header from "../header/Header"
import { fetch_get_games } from "../../../api/getGamesAPI"
import { useAppDispatch } from "../../../app/hooks"
import { updateToken } from "../../../reducers/UserSlice"
import { Game } from "../../../app/game_type"
import styles from '../../../css_modules/style.module.css'

type GameListGamesName = {
    name: string,
    friendly_name: string
}

export default function GamesList() {
    const dispatch = useAppDispatch()
    const [gameNames, setGameNames] = useState<Array<GameListGamesName>>([])

    useEffect(() => {
        fetch_get_games()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json()
            })
            .then((json) => {
                let games : Array<Game> = json.data.games as Array<Game>
                setGameNames(games.map<GameListGamesName>((game) => {
                    return {name: game.name, friendly_name: game.friendly_name}
                }))
            })
    }, [])

    return (
        <>
            <Header />
            <div className={styles.scrollableContainer}>
                {gameNames.map((gn) => 
                    <a 
                        key={gn.name} 
                        className={styles.gameListLink} 
                        href={window.location + "/update-game/" + gn.name}>
                            {gn.friendly_name}
                    </a>)}
            </div>
        </>
    )
}