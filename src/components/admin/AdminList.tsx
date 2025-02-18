import { List, Pagination } from "@mui/material"
import { CreateButtonAdminListItem } from "./ButtonsAdminList";

interface AdminListProps { 
    children: JSX.Element[] | JSX.Element | undefined
}

export function AdminList({children} : AdminListProps) {
    return <>
        <List sx={{width: '100%'}}>
            {children}
        </List>
        <CreateButtonAdminListItem/>
        <Pagination count={1} variant="outlined" shape="rounded" />
    </>
}