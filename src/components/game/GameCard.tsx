import { Game } from "../../app/game_type"
import game_card_styles from '../../../src/css_modules/style.module.css'
import { HOST } from "../../constants/Settings"
import { NavLink } from "react-router"

interface GameCardProps {
    game_data: Game
}

export default function GameCard(props: GameCardProps) {
    return (
    <>
        <NavLink to={"game?name=" + props.game_data.name}>
                <div className={game_card_styles.gameCard + " " + game_card_styles.noSelect}>
                    <h4>Название: {props.game_data.friendly_name}</h4>
                    <h4>Описание: {props.game_data.description}</h4>
                    <h4>Навыки: {props.game_data.skills.map((skill) => skill.name).join(', ')}</h4>
                </div>
        </NavLink>
        </>
    )
}