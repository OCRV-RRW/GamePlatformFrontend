import { useLocation } from "react-router"
import styles from '../../../src/css_modules/style.module.css'
import { useEffect, useState } from "react"
import { fetch_get_game } from "../../api/getGameAPI"
import { useAppDispatch } from "../../app/hooks"
import { updateToken } from "../../reducers/UserSlice"
import { QUERY_STRING_GAME_EXP } from "../../constants/reg-exp"

export default function Game() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [source, setSource] = useState<string>("")
    const [gameLoaded, setGameLoaded] = useState<boolean>(false)
    
    function sendMessageToIframe(message: object){
        const frame = document.getElementById("game_iframe") as HTMLIFrameElement | null
        if (frame && frame.contentWindow){
            frame.contentWindow.postMessage(message, "https://ocrv-game.ru")
        }
    }

    useEffect(() => {
        if (QUERY_STRING_GAME_EXP.test(location.search)) {
            fetch_get_game(location.search)
            .then((data) => {
                dispatch(updateToken({access_token: data.access_token}))
                return data.response.json()
            })
            .then((json) => {
                console.log(json)
                setSource(json?.data?.games[0]?.source)
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
    }, [gameLoaded, access_token])


    return (
        <>
            {source && <div className={styles.gameView}>
                <div className={styles.gameHeader}></div>
                    <iframe id="game_iframe" title="game" style={{
                            width: "100%", 
                            height: "100%"
                        }}
                        src={source} />
            </div>}
            {!source && <div>
                    <h1>404. У нас нет этой игры</h1>
                </div>}
        </>
    )
}