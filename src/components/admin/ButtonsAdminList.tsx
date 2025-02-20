import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../../app/hooks"
import { green, red } from "@mui/material/colors"
import { updateToken } from "../../reducers/UserSlice"
import UpdateIcon from '@mui/icons-material/Create';
import CreateIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { OpenCreateDialogWindowContext } from "./update-game/GamesList"

export interface ButtonAdminListItemProps {
    eleName?: string,
    path?: string
}

export function UpdateButtonAdminListItem({path, eleName}: ButtonAdminListItemProps) {
    const navigate = useNavigate()
    return <Button onClick={() => navigate(path + "/" + eleName)}>
        <UpdateIcon />
    </Button>
}

export interface DeleteButtonAdminListItemProps extends ButtonAdminListItemProps {
    deleteEntityFetch: () => Promise<void>
}
export function CreateButtonAdminListItem() {
    return <>
        <OpenCreateDialogWindowContext.Consumer>
            {setOpen => (
                <Button sx={{color: green[800], margin: 1}} onClick={() => setOpen(true)}>
                    <CreateIcon />
                </Button>
            )}
        </OpenCreateDialogWindowContext.Consumer>
    </> 
}

export function DeleteButtonAdminListItem({deleteEntityFetch}: DeleteButtonAdminListItemProps) {
    async function onDelete()  {
        await deleteEntityFetch()
    }

    return <>
        <Button sx={{color: red[900]}} onClick={onDelete}>
            <DeleteIcon />
        </Button>
    </>
}