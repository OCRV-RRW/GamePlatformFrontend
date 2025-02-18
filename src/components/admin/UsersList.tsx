import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetch_get_users } from "../../api/admin/getUsersAPI";
import { updateToken } from "../../reducers/UserSlice";
import { User } from "../../app/user_type";
import { grey } from "@mui/material/colors";
import Loader from "../loader/Loader";
import styles from '../../../src/css_modules/style.module.css'
import { AdminList } from "./AdminList";
import { AdminListItem } from "./AdminListItem";
import { fetch_delete_user } from "../../api/admin/deleteUserAPI";

export default function UsersList() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<Array<User>>()
    
    const fetch_users = () => {
        setLoading(true)
        fetch_get_users()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json()
            })
            .then((json) => {
                let users_data : Array<User> = json.data.users as Array<User>
                setUsers(users_data)
                setLoading(false)
        })
    }

    useEffect(() => {
        fetch_users()
    }, [])

    return (
        <>
            <h1 style={{color: grey[500]}}>Список пользователей системы</h1>
            {loading && <Loader />}
            {!loading && 
                <div className={styles.scrollableContainer}>
                    <AdminList listWithCreate={false}>
                        {users?.map((user) => 
                          <AdminListItem
                             key={(user as any).user.id}
                             title={(user as any).user.name!}
                             eleName={(user as any).user.id!}
                             delete_fetch={() => fetch_delete_user((user as any).user.id).then((data) => {
                                fetch_users()
                                return {access_token: data.access_token, response: data.response}
                             })}
                         />
                        )}
                    </AdminList>
                </div>}
        </>
    )
}