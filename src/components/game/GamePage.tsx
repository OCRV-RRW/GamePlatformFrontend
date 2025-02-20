import { useLocation } from "react-router"
import game_styles from '../../../src/css_modules/style.module.css'
import { useEffect, useState } from "react"
import { fetch_get_game } from "../../api/getGameAPI"
import { useAppDispatch } from "../../app/hooks"
import { updateToken } from "../../reducers/UserSlice"
import { QUERY_STRING_GAME_REG_EXP } from "../../constants/reg-exp"
import GameHeader from "./GameHeader"
import Loader from "../loader/Loader"
import GameStarter from "./Game"
import { FORBIDDEN, NOT_FOUND } from "../../constants/ResponseCodes"
import { set_status } from "../../reducers/PageSlice"

export default function GamePage() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [source, setSource] = useState<string>("")
    const [friendlyName, setFriendlyName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (QUERY_STRING_GAME_REG_EXP.test(location.search)) {
            setIsLoading(true)
            fetch_get_game(location.search)
            .then((data) => {
                dispatch(updateToken({access_token: data.access_token}))
                return data.response.json()
            }, (reason) => {
                if (reason === FORBIDDEN.toString()) {
                    dispatch(updateToken({access_token: ""}))
                    return
                }
                if (reason === NOT_FOUND.toString()) return
                dispatch(set_status(reason))
            })
            .then((json) => {
                console.log(json)
                var game = json?.data?.games[0];
                setSource(game?.release_source)
                setName(game?.name)
                setFriendlyName(game?.friendly_name)
                setIsLoading(false)
            })
        }
    }, [dispatch, location.search])


    return (
        <>
            {source && <div className={game_styles.gameView}>
                <GameHeader game_name={friendlyName} />
                <GameStarter source={source} name={name}/>
            </div>}
            {!source && !isLoading && <div>
                    <h1>404. У нас нет этой игры</h1>
                </div>}
            {!source && isLoading && <Loader />}
        </>
    )
}