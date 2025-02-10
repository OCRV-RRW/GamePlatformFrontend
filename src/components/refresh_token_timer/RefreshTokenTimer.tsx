import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectExpiredIn, send_refresh_token } from "../../reducers/UserSlice"
import { JsxChild, JsxElement, NodeArray } from "typescript"

interface RefreshTokenTimerProps {
    children: React.ReactNode
}
export default function RefreshTokenTimer({ children }: RefreshTokenTimerProps) {
    const dispatch = useAppDispatch()
    const expired_in = useAppSelector(selectExpiredIn)
    const intervalId = useRef<number>()
    const isFirstRender = useRef<boolean>(true)

    const refresh_token = () => {
        dispatch(send_refresh_token())
    }

    useEffect(() => {
        console.log(expired_in)
        if (expired_in === "") {
            refresh_token()
        }
    }, [refresh_token])

    useEffect(() => {
        if (expired_in === "" || expired_in === undefined) return
        if (Number(new Date(expired_in).getTime() - new Date().getTime()) <= 0) {
            if (!isFirstRender.current) return
            console.log("jkjkjk")
            refresh_token()
            return
        }
        
        console.log(Number(new Date(expired_in).getTime() - new Date().getTime()) * 0.7)
        let interval_refresh_token = Number(new Date(expired_in).getTime() - new Date().getTime()) * 0.7
        intervalId.current = window.setInterval(refresh_token, interval_refresh_token)

        return () => {
            isFirstRender.current = false
            window.clearInterval(intervalId.current)
        }
    }, [expired_in, refresh_token])

    return (<>
        {children}
    </>)
}
