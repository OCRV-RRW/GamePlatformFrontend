import { CreateGameForm } from "../../app/api_forms_interfaces"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { OpenCreateDialogWindowContext } from "./update-game/GamesList"
import { useAppDispatch } from "../../app/hooks"
import { updateToken } from "../../reducers/UserSlice"

export interface AddGameEntityDialogProps {
    createGameEntityFetch: (form: CreateGameForm) => Promise<void>
    isOpen: boolean
}

export function AddGameEntityDialog({createGameEntityFetch: createGameEntityFetch, isOpen}: AddGameEntityDialogProps) {
    const dispatch = useAppDispatch()

    return <>
        <OpenCreateDialogWindowContext.Consumer>
            {setOpen => (
                <Dialog open={isOpen}
                    slotProps={{
                        paper: {
                            component: 'form',
                            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault()
                                const form_data = new FormData(event.currentTarget)
                                const form_json = Object.fromEntries((form_data as any).entries())
                                const created_entity_name = form_json.name
                                const created_entity_friendly_name = form_json.friendly_name
                                const created_entity_description = form_json.description
                                const created_entity_debug_source = form_json.debug_source
                                const created_entity_release_source = form_json.release_source

                                createGameEntityFetch({
                                    'config': '',
                                    'debug_source': created_entity_debug_source,
                                    'description': created_entity_description,
                                    'friendly_name': created_entity_friendly_name,
                                    'name': created_entity_name,
                                    'release_source': created_entity_release_source,
                                    'skills': []
                                }).then(() => setOpen(false))    
                            }
                        }
                    }}>
                    <DialogTitle>Создание игры</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="ID"
                            type='text'
                            fullWidth
                            variant='outlined'/>
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="friendly_name"
                            name="friendly_name"
                            label="название игры"
                            type='text'
                            fullWidth
                            variant='outlined' />
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="описание"
                            type='text'
                            fullWidth
                            variant='outlined' />
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="release_source"
                            name="release_source"
                            label="url на источник релиз-версии"
                            type='text'
                            fullWidth
                            variant='outlined' />
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="debug_source"
                            name="debug_source"
                            label="url на источник дебаг-версии"
                            type='text'
                            fullWidth
                            variant='outlined' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Отменить</Button>
                        <Button type='submit'>Создать</Button>
                    </DialogActions>
                </Dialog>
            )}
        </OpenCreateDialogWindowContext.Consumer>
    </>
}