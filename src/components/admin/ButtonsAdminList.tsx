import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../../app/hooks"
import { green, red } from "@mui/material/colors"
import { updateToken } from "../../reducers/UserSlice"
import UpdateIcon from '@mui/icons-material/Create';
import CreateIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';

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

export interface CreateButtonAdminListItemProps extends ButtonAdminListItemProps {
    createEntityFetch: () => Promise<{access_token: string, response: Response}>
}

export interface DeleteButtonAdminListItemProps extends ButtonAdminListItemProps {
    deleteEntityFetch: () => Promise<{access_token: string, response: Response}>
}
export function CreateButtonAdminListItem({createEntityFetch}: CreateButtonAdminListItemProps) {
    const dispatch = useAppDispatch()

    const onCreate = () => {
        createEntityFetch().then((data) => {
            dispatch(updateToken({access_token: data.access_token}))})
    }

    return <Button sx={{color: green[800], margin: 1}} onClick={onCreate}>
        <CreateIcon />
    </Button>
}

export function DeleteButtonAdminListItem({deleteEntityFetch}: DeleteButtonAdminListItemProps) {
    const dispatch = useAppDispatch()

    const onDelete = () => {
        deleteEntityFetch().then((data) => {
            dispatch(updateToken({access_token: data.access_token}))
        })
    }

    return <Button sx={{color: red[900]}} onClick={onDelete}>
        <DeleteIcon />
    </Button>
}