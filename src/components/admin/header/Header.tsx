import { Box } from '@mui/material'
import styles from '../../../css_modules/style.module.css'
import GoToHomeButton from '../../GoToHomeButton'
import { grey } from '@mui/material/colors'

export default function Header() {
    return (
        <>
            <Box sx={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}>
                <GoToHomeButton />
                <h2 style={{margin: 10, color: grey[900], fontSize: 24}}>Админ-панель</h2>
            </Box>
        </>
    )
}