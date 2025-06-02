import "../../styles/landingpage.css"
import { Navbar } from "../../components/ui/navbar";
import { FcGoogle } from "react-icons/fc";
import { Background } from "../../components/ui/background";
import { useNavigate } from "react-router-dom";
import { Auth, type t_response } from "../../api/auth";
import { generateId } from "../../utils/random-id-ge";
import { addToQueue } from "../../redux/message-queue";
import { useAppDispatch } from "../../redux/hooks";

function PageLeft () {
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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
        <div className="landing-page-main-left">
            <div>Simplify Your <span className="colored-text">URL Management</span> with <span className="colored-text">URLPing<span className="blink">| </span> </span> </div>
            <div>
                Track, analyse and optimize your links with ease. Keep track and get notified of your URL downtimes.
                URLPing is a powerful url monitoring tool that is Designed to track and monitor downtimes on your URL and Notify your of such moment of inactivity on  your URL.
            </div>

            <button className="signin-button" onClick={handleAuth}>
                <span><FcGoogle /></span>
                <span>Sign up with Google</span>
            </button>
        </div> 
    )
}


function PageRight () {
    return (
        <div className="landing-page-main-right">
            <div className="arc" />

            <div className="display-instance-1">
                <div />

                <div className="display-instance-1-cnt">
                    <span />

                    <span>Up</span>
                </div>
            </div>


            <div className="display-instance-2">
                <div />

                <div className="display-instance-2-cnt">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </div>

            <div className="display-instance-3">
                <div />
            </div>

        </div>
    )
}

export default function Page () {
    return (
        <div className="landing-page">
            <Background />
            <Navbar />

            <div className='landing-page-main'>
                <PageLeft />
                <PageRight />
            </div>

            <div className="landing-page-bottom">
                Currently, We keep an eye on over 2,000 URLs for over 1,200 Users
            </div>
        </div>
    )
}
