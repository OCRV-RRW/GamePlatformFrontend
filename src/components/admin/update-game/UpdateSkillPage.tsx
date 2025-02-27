import { useParams } from "react-router"
import { useAppDispatch } from "../../../app/hooks"
import { useCallback, useEffect, useState } from "react"
import { Skill } from "../../../app/skill_type"
import { useForm } from "react-hook-form"
import { fetch_update_skill } from "../../../api/admin/updateSkillAPI"
import { fetch_get_skill } from "../../../api/admin/getSkillAPI"
import { QUERY_STRING_SKILL } from "../../../constants/QueriesString"
import { updateToken } from "../../../reducers/UserSlice"
import { FORBIDDEN, NOT_FOUND } from "../../../constants/ResponseCodes"
import { set_status } from "../../../reducers/PageSlice"
import AdminHeader from "../header/AdminHeader"
import Loader from "../../loader/Loader"
import { UpdateSkillForm } from "../../../app/api_forms_interfaces"
import { Button, TextField } from "@mui/material"
import { ADMIN_PANEL_PATH } from "../../../constants/BrowserPathes"

type UpdateSkillFormFields = {
    description: string,
    friendly_name: string
}

export default function UpdateSkillPage() {
    const dispatch = useAppDispatch()
    const { name } = useParams()
    const [skillData, setSkillData] = useState<Skill>()

    const { register, handleSubmit, getValues, setValue } = useForm<UpdateSkillFormFields>(
        {
            mode: 'onChange',
            defaultValues: {description: "", friendly_name: ""}
        }
    )

    const fetchSkill = useCallback(() => {
        if (!name) return
        fetch_get_skill(QUERY_STRING_SKILL + name)
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json()
                    .then((json) => {
                        setSkillData(json.data.skills[0] as Skill)
                    })
            }, (reason) => {
                if (reason === FORBIDDEN.toString()) {
                    dispatch(updateToken({access_token: ""}))
                    return
                }
                if (reason === NOT_FOUND.toString()) return
                dispatch(set_status(reason))
            })
    }, [])

    const onUpdateSkill = (data: UpdateSkillFormFields) => {
        fetch_update_skill({...data} as UpdateSkillForm, name ?? "")
            .then(() => {
                window.location.reload()
            }, (reason) => {
                if (reason === FORBIDDEN.toString()) {
                    dispatch(updateToken({access_token: ""}))
                    return
                }
                dispatch(set_status(reason))
            })
    }

    useEffect(() => {
        fetchSkill()
    }, [fetchSkill])

    useEffect(() => {
        if (!skillData) return
        console.log(skillData)
        setValue('description', skillData.description)
        setValue('friendly_name', skillData.friendly_name)
    }, [skillData])

    return (
        <>
            <AdminHeader pathToPage={ADMIN_PANEL_PATH}/>
            {!skillData 
               ? <Loader /> 
               : <>
                <form onSubmit={handleSubmit((data) => onUpdateSkill(data))}>
                    <div style={{margin: 10}}>
                        <TextField id="description" {...register('description')} placeholder="описание..." label="Описание навыка" />
                    </div>
                    <div style={{margin: 10}}>
                        <TextField id="friendly_name" {...register('friendly_name')} placeholder="название..." label="Название навыка" />
                    </div>
                    <Button style={{margin: 10}} type='submit' variant='outlined'>Обновить</Button>
                </form>
               </>}
        </>
    )
}