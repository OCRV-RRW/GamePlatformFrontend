import { useLocation } from "react-router"
import game_styles from '../../../src/css_modules/style.module.css'
import { useEffect, useState } from "react"
import { fetch_get_game } from "../../api/getGameAPI"
import { useAppDispatch } from "../../app/hooks"
import { updateToken } from "../../reducers/UserSlice"
import { QUERY_STRING_GAME_REG_EXP } from "../../constants/reg-exp"
import GameHeader from "./GameHeader"
import Loader from "../loader/Loader"

export default function Game() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [source, setSource] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [gameLoaded, setGameLoaded] = useState<boolean>(false)
    
    function sendMessageToIframe(message: object){
        const frame = document.getElementById("game_iframe") as HTMLIFrameElement | null
        if (frame && frame.contentWindow){
            frame.contentWindow.postMessage(message, "https://ocrv-game.ru")
        }
    }

    useEffect(() => {
        if (QUERY_STRING_GAME_REG_EXP.test(location.search)) {
            setIsLoading(true)
            fetch_get_game(location.search)
            .then((data) => {
                dispatch(updateToken({access_token: data.access_token}))
                return data.response.json()
            })
            .then((json) => {
                console.log(json)
                setSource(json?.data?.games[0]?.source)
                setName(json?.data?.games[0]?.friendly_name)
                setIsLoading(false)
            })
        }
    }, [dispatch, location.search])

    useEffect(()=>{
        if(gameLoaded) return
        window.addEventListener("is-loaded", _ =>{
            console.log("game is loaded")
            setGameLoaded(true)
        })
    }, [gameLoaded])

    useEffect(()=>{
        if (gameLoaded){
            sendMessageToIframe({type: "start-game"})
        }
    }, [gameLoaded])


    return (
        <>
            {source && <div className={game_styles.gameView}>
                <GameHeader game_name={name} />
                    <iframe id="game_iframe" title="game" style={{
                            width: "100%", 
                            height: "100%"
                        }}
                        src={source} />
            </div>}
            {!source && !isLoading && <div>
                    <h1>404. У нас нет этой игры</h1>
                </div>}
            {!source && isLoading && <div>
                <Loader />
            </div>}
        </>
    )
}