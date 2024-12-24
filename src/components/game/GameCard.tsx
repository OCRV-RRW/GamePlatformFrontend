import { Game } from "../../app/game_type"
import styles from '../../../src/css_modules/style.module.css'
import { useNavigate } from "react-router"
import { GAME_PATH } from "../../constants/BrowserPathes"
import { QUERY_STRING_GAME } from "../../constants/QueriesString"

interface GameCardProps {
    game_data: Game
}

export default function GameCard(props: GameCardProps) {
    const navigate = useNavigate()

    const onClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate(GAME_PATH + QUERY_STRING_GAME + props.game_data.name)
    } 

    return (
        <>
            <div className={styles.gameCard + " " + styles.noSelect}
                onClick={onClicked}>
                <h4>Название: {props.game_data.friendly_name}</h4>
                <h4>Описание: {props.game_data.description}</h4>
                <h4>Навыки: {props.game_data.skills.map((skill) => skill.name).join(', ')}</h4>
            </div>
        </>
    )
}