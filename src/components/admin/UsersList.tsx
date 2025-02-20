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
import { set_status } from "../../reducers/PageSlice";
import { FORBIDDEN } from "../../constants/ResponseCodes";

export default function UsersList() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<Array<User>>()
    
    const fetch_users = () => {
        setLoading(true)
        fetch_get_users()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json().then((json) => {
                    let users_data : Array<User> = json.data.users as Array<User>
                    setUsers(users_data)
                    setLoading(false)
                })
            }, 
            (reason) => {
                setLoading(false)
                if (reason === FORBIDDEN) {
                    dispatch(updateToken({access_token: ""}))
                    return
                }
                dispatch(set_status(reason))
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
                             key={user.id}
                             title={user.name!}
                             eleName={user.id!}
                             delete_fetch={() => 
                                fetch_delete_user(user.id!).then((data) => {
                                    fetch_users()
                                    dispatch(updateToken({access_token: data.access_token}))
                                }, (reason) => {
                                    if (reason === FORBIDDEN) {
                                        dispatch(updateToken({access_token: ""}))
                                        return
                                    }
                                    dispatch(set_status(reason))
                                })}
                            />
                        )}
                    </AdminList>
                </div>}
        </>
    )
}