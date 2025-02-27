import { createContext, useEffect, useState } from "react"
import { fetch_get_games } from "../../../api/getGamesAPI"
import { useAppDispatch } from "../../../app/hooks"
import { updateToken } from "../../../reducers/UserSlice"
import { Game } from "../../../app/game_type"
import styles from '../../../css_modules/style.module.css'
import { grey } from "@mui/material/colors"
import Loader from "../../loader/Loader"
import { AdminListItem } from "../AdminListItem"
import { UPDATE_GAME_PATH } from "../../../constants/BrowserPathes"
import { AdminList } from "../AdminList"
import { fetch_delete_game } from "../../../api/admin/deleteGameAPI"
import { CreateGameForm } from "../../../app/api_forms_interfaces"
import { fetch_create_game } from "../../../api/admin/createGameAPI"
import { AddGameEntityDialog } from "../AddGameEntityDialog"
import { set_status } from "../../../reducers/PageSlice"
import { FORBIDDEN, NOT_FOUND } from "../../../constants/ResponseCodes"
import { BAD_STATUS_SERVER_RESPONSE_CLIENT_WARNING_REG_EXP } from "../../../constants/reg-exp"

export const OpenCreateDialogWindowContext = createContext<(isOpen: boolean) => void>(() => {})
type GameListGamesName = {
    name: string,
    friendly_name: string
}


export default function GamesList() {
    const dispatch = useAppDispatch()
    const [gameNames, setGameNames] = useState<Array<GameListGamesName>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [createDialogWindowOpen, setCreateDialogWindowOpen] = useState<boolean>(false)
    
    const fetch_games = () => {
        setLoading(true)
        fetch_get_games()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json().then((json) => {
                    let games : Array<Game> = json.data.games as Array<Game>
                    setGameNames(games.map<GameListGamesName>((game) => {
                        return {name: game.name, friendly_name: game.friendly_name}
                    }))
                    setLoading(false)
                })
            }, (reason) => {
                setLoading(false)
                if (reason === FORBIDDEN.toString()) {
                    dispatch(updateToken({access_token: ""}))
                    return
                }
                if (reason === NOT_FOUND.toString()) return
                dispatch(set_status(reason))
            })
    }

    useEffect(() => {
        fetch_games()
    }, [])

    return (
        <>
            <h1 style={{color: grey[500]}}>Список игр</h1>
            {loading && <Loader />}
            <OpenCreateDialogWindowContext.Provider value={(isOpen) => setCreateDialogWindowOpen(isOpen)}>
            {!loading && 
                <div className={styles.scrollableContainer}>
                    <AdminList>
                        {gameNames?.map((g) => 
                            <AdminListItem 
                                key={g.name} 
                                title={g.friendly_name} 
                                eleName={g.name} 
                                update_path={UPDATE_GAME_PATH} 
                                delete_fetch={() => fetch_delete_game(g.name).then((data) => {
                                    fetch_games()
                                    dispatch(updateToken({access_token: data.access_token}))
                            }, (reason) => 
                                { 
                                    if (BAD_STATUS_SERVER_RESPONSE_CLIENT_WARNING_REG_EXP.test(reason)) {
                                        dispatch(updateToken({access_token: ""}))
                                        return
                                    }
                                    dispatch(set_status(reason)) 
                                })} 
                            />)}
                    </AdminList>
                </div>}
                <AddGameEntityDialog 
                    isOpen={createDialogWindowOpen}
                    createGameEntityFetch={(form: CreateGameForm) => fetch_create_game(form).then((data) => {
                        fetch_games()
                        dispatch(updateToken({access_token: data.access_token}))
                    }, (reason) => {
                        if (BAD_STATUS_SERVER_RESPONSE_CLIENT_WARNING_REG_EXP.test(reason)) {
                            dispatch(updateToken({access_token: ""}))
                            return
                        }
                        dispatch(set_status(reason))
                    })}/>
            </OpenCreateDialogWindowContext.Provider>
        </>
    )
}