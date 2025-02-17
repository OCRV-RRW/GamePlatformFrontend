import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { fetch_get_skills } from "../../../api/getSkillsAPI"
import { updateToken } from "../../../reducers/UserSlice"
import { Skill } from "../../../app/skill_type"
import Loader from "../../loader/Loader"
import styles from '../../../css_modules/style.module.css'
import { grey } from "@mui/material/colors"
import { UPDATE_SKILL_PATH } from "../../../constants/BrowserPathes"
import { AdminListItem } from "../AdminListItem"
import { AdminList } from "../AdminList"

export default function SkillsList() {
    const dispatch = useAppDispatch()
    const [skills, setSkills] = useState<Array<Skill>>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
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
    }, [])

    return (
        <>
            <h1 style={{color: grey[500]}}>Список скиллов</h1>
            {loading && <Loader />}
            {!loading && <div className={styles.scrollableContainer}>
                <AdminList>
                    {skills?.map((s) => 
                        <AdminListItem key={s.name} title={s.friendly_name} eleName={s.name} update_path={UPDATE_SKILL_PATH}/>)}
                </AdminList>
            </div>}
        </>
    )
}