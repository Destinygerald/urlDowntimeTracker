import "../../styles/dashboard.css"
import { HiMiniMoon } from "react-icons/hi2"
import { RiSunFill } from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { toggleTheme } from "../../redux/theme"

function UserId () {
    return (
        <div className="topbar-userid">
            <div>JD</div>
            <div>johndoe@gmail.com</div>
        </div>
    )
}

function ThemeIcon () {

    const theme = useAppSelector(state => state.theme.value)
    const dispatch = useAppDispatch()
    
    function handleToggle () {
        dispatch(toggleTheme())
    }

    return (
        <span className="toggle-theme" onClick={handleToggle}>
            {
                theme == "dark"
                ?
                <RiSunFill />
                :
                <HiMiniMoon />
            }
        </span>
    )
}

export function Topbar () {
    return (
        <div className="topbar">
            <span className="navbar-logo">URLPing</span>
            
            <div className="topbar-buttons">
                <ThemeIcon />
                <UserId />
            </div>
        </div>
    )
}