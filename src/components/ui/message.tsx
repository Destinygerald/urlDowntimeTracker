import "../../styles/ui.css"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { removeFromQueue, type t_message } from "../../redux/message-queue"
import { useEffect } from "react"

export function Message ({ status, message, id }: t_message) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(removeFromQueue(id))
        }, 1200)
    }, [])

    return (
        <div className="message-item" data-status={status}>
            <span>{message}</span>

            <div className="message-loader" />
        </div>   
    )
}

export function MessageQueue () {

    const messages = useAppSelector(state => state.messageQueue.value)

    return (
        <div className="message-queue">
            {
                messages.map((message, index) => (
                    <Message key={index} id={message?.id || ""} status={message?.status || ''} message={message?.message || ''} />
                ))
            }
        </div>
    )
}