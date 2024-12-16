import { createContext, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectCurrentPage, set_page } from "../../reducers/PageSlice"
import SelectPath from "./SelectPage";

export interface PageProps {
    path: string
}

export const PathContext = createContext("");

export default function Path({path}: PageProps) {
    const dispath = useAppDispatch()
    const current_page = useAppSelector(selectCurrentPage)
    const started = useRef(false)

    useEffect(() => {
        if (started.current) {
            dispath(set_page(path))
        }

        return () => {
            started.current = true
        }
    }, [path])

    return (
        <>
            <PathContext.Provider value={current_page}>
                <SelectPath />
            </PathContext.Provider>
        </>
    )
}