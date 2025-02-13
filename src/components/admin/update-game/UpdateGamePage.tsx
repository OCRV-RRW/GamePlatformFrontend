import { useCallback, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { Game } from "../../../app/game_type"
import { fetch_get_game } from "../../../api/getGameAPI"
import { QUERY_STRING_GAME } from "../../../constants/QueriesString"
import { useAppDispatch } from "../../../app/hooks"
import { updateToken } from "../../../reducers/UserSlice"
import Header from "../header/Header"
import { useForm, Controller } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Skill } from "../../../app/skill_type"
import { fetch_get_skills } from "../../../api/getSkillsAPI"
import Chip from "@mui/material/Chip"
import { Button, OutlinedInput, TextField } from "@mui/material"
import { UpdateGameForm } from "../../../app/api_forms_interfaces"
import { fetch_update_game } from "../../../api/admin/updateGameAPI"
import { JsonEditor } from 'json-edit-react'
import '../../../index.css'
import Loader from "../../loader/Loader"
import GameStarter from "../../game/Game"
import RefreshTokenTimer from "../../refresh_token_timer/RefreshTokenTimer"

type UpdateGameFormFields = {
    config: string,
    description: string,
    friendly_name: string,
    skill_names: Array<string>,
    debug_source: string,
    release_source: string
}

export default function UpdateGamePage() {
    const dispatch = useAppDispatch()
    const { name } = useParams()
    const [gameData, setGameData] = useState<Game>()
    const [skills, setSkills] = useState<Skill[]>()
    const [isSetValues, setIsSetValues] = useState<boolean>(false)

    const { register, handleSubmit, formState: {errors}, reset, control, getValues, setValue } = useForm<UpdateGameFormFields>(
        {
            mode: 'onChange',
            defaultValues: {config: "", description: "", friendly_name: "", skill_names: [], release_source: "", debug_source: ""}
        }
    )


    const fetchData = useCallback(() => {
        if (!name) return
        fetch_get_game(QUERY_STRING_GAME + name)
        .then((fetch_data) => {
            dispatch(updateToken({access_token: fetch_data.access_token}))
            return fetch_data.response.json()
        })
        .then((json) => {
            setGameData(json.data.games[0] as Game)
        })

        fetch_get_skills()
            .then((fetch_data) => {
                dispatch(updateToken({access_token: fetch_data.access_token}))
                return fetch_data.response.json()
            })
            .then((json) => {
                setSkills(json.data.skills as Array<Skill>)
            })
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        if (!gameData) return
        setValue('config', gameData.config)
        setValue('description', gameData.description)
        setValue('friendly_name', gameData.friendly_name)
        setValue('debug_source', gameData.debug_source)
        setValue('release_source', gameData.release_source) 
        setValue('skill_names', gameData.skills.map((skill => skill.friendly_name))!)
        setIsSetValues(true)
    }, [gameData])

    const onUpdateGame = (form_data: UpdateGameFormFields) => {
        let updateGameFormData: UpdateGameForm = {
            config: form_data.config,
            description: form_data.description,
            friendly_name: form_data.friendly_name,
            skills: skills ? skills?.filter((skill) => 
                form_data.skill_names.includes(skill.friendly_name)
            ).map((skill) => skill.name) : [],
            debug_source: form_data.debug_source,
            release_source: form_data.release_source
        }
        console.log(updateGameFormData)
        fetch_update_game(updateGameFormData, name ?? "").then(() => {
            window.location.reload()
        }) 
    }

    return(<>
        <Header />
        {!gameData && <Loader />}
        {gameData && 
        <>
         <form onSubmit={handleSubmit((data) => onUpdateGame(data))}>
            <div style={{margin: 10}}>
                <TextField id="description" {...register('description')} placeholder="описание..." label="Описание игры" />
            </div>
            <div style={{margin: 10}}>
                <TextField id="friendly_name" {...register('friendly_name')} placeholder="название..."  label="Название игры" />
            </div>
            <div style={{margin: 10}}>
                <TextField id="source" {...register('debug_source')} placeholder="источник..." label="Источник игры (Debug URL)" />
            </div>
            <div style={{margin: 10}}>
                <TextField id="source" {...register('release_source')} placeholder="источник..." label="Источник игры (Release URL)" />
            </div>
                <Box>
                    <FormControl sx={{width: 500}}>
                        <InputLabel id="demo-multiple-chip-label">Скиллы</InputLabel>
                        <Controller render={
                            ({ field: { onChange, value}}) => (
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    value={value}
                                    multiple
                                    onChange={onChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Скиллы"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                            {selected.map((skill_name, index) => (
                                                <Chip key={index} label={skill_name} />
                                            ))}
                                        </Box>
                                    )}>
                                    {skills?.map((skill, index) => (
                                            <MenuItem key={index} value={skill.friendly_name}>{skill.friendly_name}</MenuItem>
                                        ))}
                                </Select>    
                            )
                        }
                        control={control}
                        name="skill_names" />
                    </FormControl>
                </Box>
                <div style={{margin: 10}}>
                <TextField style={{visibility: 'hidden'}} id="config" {...register('config')} placeholder="конфиг..." label="Конфиг" />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{fontSize: 20, padding: 20}}>Редактрировать конфиг</label>
                    {isSetValues &&
                        <JsonEditor
                        data={getValues('config') ? JSON.parse(getValues('config')) : {}}
                        onUpdate={({ newData }) => {setValue('config', JSON.stringify(newData))}} 
                    />
                    }
                </div>
            </div>
            <Button style={{margin: 10}} type='submit' variant='outlined'>Обновить</Button>
         </form>
         <RefreshTokenTimer>
            <div style={{
                height: 800
            }}>
                <GameStarter source={gameData!.debug_source} name={gameData!.name} />
            </div>  
         </RefreshTokenTimer>
        </>
        }
    </>)
}