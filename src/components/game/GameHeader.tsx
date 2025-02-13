import React from 'react'
import game_header_styles from '../../../src/css_modules/style.module.css'
import GoToHomeButton from '../GoToHomeButton'
import { Box, InputLabel } from '@mui/material'
import { grey } from '@mui/material/colors'

interface GameHeaderProps {
    game_name: string
}

function GameHeader(props: GameHeaderProps) {
    return (
        <>
            <Box sx={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}>
                <GoToHomeButton />
                <h2 style={{margin: 10, color: grey[900], fontSize: 24}}>{props.game_name}</h2>
            </Box>
        </>
    )
}

export default React.memo(GameHeader)