import { useNavigate } from "react-router-dom"
import "../../styles/ui.css"
import { FcGoogle } from "react-icons/fc"
import { Auth, type t_response } from "../../api/auth";
import { useAppDispatch } from "../../redux/hooks";
import { addToQueue } from "../../redux/message-queue";
import { generateId } from "../../utils/random-id-ge";


export function Navbar () {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function handleAuth () {
        const res: t_response | void = await Auth()
        const id = generateId()

        if (!res || res?.status != "success") {
            // add message to message queue
            dispatch(addToQueue({
                id,
                status: "failed",
                message: "Authentication Failed"
            }))
            return;
        }

        dispatch(addToQueue({
            id,
            status: "success",
            message: "Successfully Logged in"
        }))
        
        navigate("/dashboard")
    }

    return (
        <div className="navbar">
            <div className="navbar-logo">UrlPing</div>

            <button className="signin-button" onClick={handleAuth}>
                <span> <FcGoogle /> </span>
                <span> Sign in with Google </span>
            </button>
        </div>
    )
}