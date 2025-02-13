import { useEffect, useState } from "react"
import { Game } from "../../app/game_type"
import { GAME_DOMAIN } from "../../constants/Settings"
import React from "react"

interface GameProps {
    source: string,
    name: string
}

function GameStarter({source, name}: GameProps) {
     const [gameLoaded, setGameLoaded] = useState<boolean>(false)
        
    function sendMessageToIframe(message: object | string){
        const frame = document.getElementById("game_iframe") as HTMLIFrameElement | null
        if (frame && frame.contentWindow){
            frame.contentWindow.postMessage(message, GAME_DOMAIN) 
        }
    }
        
    useEffect(()=>{
        if(gameLoaded) return
        window.onmessage = function(e: MessageEvent){
            console.log("RECEIVE DEFOLD MESSAGE: " + e.data)
            if(e.data === "is-loaded"){
                console.log("game is loaded")
                setGameLoaded(true)
            }
        }
    }, [gameLoaded])

    useEffect(()=>{
        if (gameLoaded){
            sendMessageToIframe({type: "start-game", name: name})
        }
    }, [gameLoaded])
    
    return <>
        <iframe id="game_iframe" title="game" style={{
            width: "100%", 
            height: "100%"
        }}
        src={source} />
    </>
}

export default React.memo(GameStarter)