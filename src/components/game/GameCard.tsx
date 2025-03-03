import { Game } from "../../app/game_type"
import game_card_styles from '../../../src/css_modules/gameStyle.module.css'
import { NavLink } from "react-router"
import React from "react"
import { Box, InputLabel } from "@mui/material"
import { grey, red } from "@mui/material/colors"
import SportsEsportsSharpIcon from '@mui/icons-material/SportsEsportsSharp';

interface GameCardProps {
    game_data: Game
}

function GameCard(props: GameCardProps) {
    return (
        <>
            <NavLink to={"game?name=" + props.game_data.name} className={game_card_styles.gameCardLink}>
                <Box className={game_card_styles.gameCard + " " + game_card_styles.noSelect}>
                    <Box className={game_card_styles.gameCardContainer}>
                        {props.game_data.preview_url !== ""
                        ? <>
                            <img src={props.game_data.preview_url} style={{width: "100%", height: "100%"}}/>
                        </>
                        : <>
                            <Box sx={{margin: 1}}>
                                <h1 style={{color: red[400], margin: 20}}>ОЦРВ</h1>
                                <SportsEsportsSharpIcon sx={{
                                    color: red[700],
                                    width: "50%",
                                    height: "20%"
                                }} />
                            </Box>
                            </>}
                    </Box>
                    <Box className={game_card_styles.gameCardBackdrop}>
                    </Box> 
                    <Box className={game_card_styles.gameCardTitle}>
                        <InputLabel sx={{color: grey[100], fontSize: 34}}>{props.game_data.friendly_name}</InputLabel>
                        <InputLabel sx={{color: grey[300], fontSize: 14}}>{props.game_data.skills.map((skill) => skill.friendly_name).join(', ')}</InputLabel>
                    </Box>
                </Box>
            </NavLink>
        </>
    )
}

export default React.memo(GameCard)