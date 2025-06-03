import "../../styles/landingpage.css"
import { Navbar } from "../../components/ui/navbar";
import { FcGoogle } from "react-icons/fc";
import { Background } from "../../components/ui/background";
import { Auth } from "../../api/auth";

function PageLeft () {
    
    async function handleAuth () {
        await Auth()
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
                <span>Sign in with Google</span>
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
