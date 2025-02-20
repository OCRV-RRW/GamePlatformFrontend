import { useEffect, useState } from "react"
import { fetch_verify_email } from "../../api/verifyEmailAPI"
import { useParams } from "react-router"

export default function VerifyEmail() {
    const { id } = useParams();
    const [verifyMessage, setVerifyMessage] = useState<string>("")

    useEffect(() => {
        fetch_verify_email(id ?? "")
            .then(() => {
                    setVerifyMessage("Почта подтверждена")
                },
                (reason) => {
                    setVerifyMessage("Ошибка подтверждения почты. Попробуйте снова")
                }
            )
    }, [id])

    return (
        <>
            <h1>{verifyMessage === "" ? "Ожидайте..." : verifyMessage}</h1>
        </>
    )
}