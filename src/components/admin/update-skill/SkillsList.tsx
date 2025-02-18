import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { fetch_get_skills } from "../../../api/getSkillsAPI"
import { updateToken } from "../../../reducers/UserSlice"
import { Skill } from "../../../app/skill_type"
import Loader from "../../loader/Loader"
import styles from '../../../css_modules/style.module.css'
import { grey } from "@mui/material/colors"
import { AdminListItem } from "../AdminListItem"
import { AdminList } from "../AdminList"
import { OpenCreateDialogWindowContext } from "../update-game/GamesList"
import { AddSkillEntityDialog } from "../AddSkillEntityDialog"
import { CreateSkillForm } from "../../../app/api_forms_interfaces"
import { fetch_create_skill } from "../../../api/admin/сreateSkillAPI"
import { fetch_delete_skill } from "../../../api/admin/deleteSkillAPI"

export default function SkillsList() {
    const dispatch = useAppDispatch()
    const [skills, setSkills] = useState<Array<Skill>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [createDialogWindowOpen, setCreateDialogWindowOpen] = useState<boolean>(false)

    const fetch_skills = () => {
        setLoading(true)
        fetch_get_skills()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json()
            })
            .then((json) => {
                let skills : Array<Skill> = json.data.skills as Array<Skill>
                setSkills(skills)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetch_skills()
    }, [])

    return (
        <>
            <h1 style={{color: grey[500]}}>Список скиллов</h1>
            {loading && <Loader />}
            <OpenCreateDialogWindowContext.Provider value={(isOpen) => setCreateDialogWindowOpen(isOpen)}>
                {!loading && 
                <div className={styles.scrollableContainer}>
                    <AdminList>
                        {skills?.map((s) => 
                            <AdminListItem 
                                key={s.name} 
                                title={s.friendly_name} 
                                eleName={s.name} 
                                delete_fetch={() => fetch_delete_skill(s.name).then((data) => {
                                    fetch_skills()
                                    return {access_token: data.access_token, response: data.response}
                                })}/>)}
                    </AdminList>
                </div>}
                <AddSkillEntityDialog 
                    isOpen={createDialogWindowOpen}
                    createGameEntityFetch={(form: CreateSkillForm) => fetch_create_skill(form).then((data) => {
                        fetch_skills()
                        return {access_token: data.access_token, response: data.response}
                })}/>
            </OpenCreateDialogWindowContext.Provider>
        </>
    )
}