import { Box } from '@mui/material'
import GoToOtherPageButton from '../../GoToHomeButton'
import { grey } from '@mui/material/colors'

interface AdminHeaderProps {
    pathToPage: string
}

export default function AdminHeader({ pathToPage } : AdminHeaderProps) {
    return (
        <>
            <Box sx={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}>
                <GoToOtherPageButton pathToPage={pathToPage} />
                <h2 style={{margin: 10, color: grey[900], fontSize: 24}}>Админ-панель</h2>
            </Box>
        </>
    )
}