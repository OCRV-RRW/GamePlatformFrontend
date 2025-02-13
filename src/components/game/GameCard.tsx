import { Game } from "../../app/game_type"
import game_card_styles from '../../../src/css_modules/style.module.css'
import { NavLink } from "react-router"
import React from "react"
import { Box, Button, InputLabel } from "@mui/material"
import { common, grey, red } from "@mui/material/colors"
import SportsEsportsSharpIcon from '@mui/icons-material/SportsEsportsSharp';

interface GameCardProps {
    game_data: Game
}

// className={game_card_styles.gameCard + " " + game_card_styles.noSelect}
function GameCard(props: GameCardProps) {
    return (
        <>
            <NavLink to={"game?name=" + props.game_data.name}>
                <Box className={game_card_styles.gameCard + " " + game_card_styles.noSelect} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 350
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "50%",
                        height: "70%",
                        border: 1,
                        borderBottom: 0,
                        borderColor: common.white[300],
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: grey[100]
                    }}>
                        <h1 style={{color: red[400], margin: 10}}>ОЦРВ</h1>
                        <SportsEsportsSharpIcon sx={{
                            color: red[700],
                            width: 200,
                            height: 75
                        }} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "50%",
                        height: "30%",
                        border: 1,
                        borderTop: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: grey[100]
                    }}>
                        <InputLabel sx={{color: grey[800], fontSize: 26}}>{props.game_data.friendly_name}</InputLabel>
                        <InputLabel sx={{color: 'dark', fontSize: 12}}>{props.game_data.skills.map((skill) => skill.friendly_name).join(', ')}</InputLabel>
                    </Box>
                </Box>
            </NavLink>
        </>
    )
}

export default React.memo(GameCard)