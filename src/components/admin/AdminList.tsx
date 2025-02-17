import { List, Pagination } from "@mui/material"
import { CreateButtonAdminListItem } from "./ButtonsAdminList";

interface AdminListProps { 
    children: JSX.Element[] | JSX.Element | undefined
    createEntityFetch?: () => Promise<{
        access_token: string;
        response: Response;
    }>
}

export function AdminList({children, createEntityFetch} : AdminListProps) {
    return <>
        <List sx={{width: '100%'}}>
            {children}
        </List>
        {createEntityFetch && <CreateButtonAdminListItem createEntityFetch={createEntityFetch}/>}
        <Pagination count={1} variant="outlined" shape="rounded" />
    </>
}