import '../../App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/landing-page/page.tsx"
import Dashboard from "../../pages/dashboard/page.tsx"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { useLayoutEffect } from "react";
import { setTheme, toggleTheme } from "../../redux/theme.ts";
import { MessageQueue } from './message.tsx';

export function AppRoutes () {

    const theme = useAppSelector(state => state.theme.value)
    const messages = useAppSelector(state => state.messageQueue.value)
    const dispatch = useAppDispatch()
    
    useLayoutEffect(() => {
        if (!window.matchMedia) return;

        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        
        const _theme: "light" | "dark" = window.localStorage.getItem("theme") as "light" | "dark"


      
        if (isDark && (!_theme || _theme as string == "null")) {
            dispatch(setTheme("dark"))
            window.localStorage.setItem("theme", "dark")
            return;
        }

        dispatch(setTheme(_theme))
        window.localStorage.setItem("theme", _theme)


    }, [])

    return (
        <div 
            className='app-inner'
            data-theme={theme}
        >   
            <Routes>
                <Route path='/' Component={LandingPage} />
                <Route path='/dashboard/*' Component={Dashboard} />
            </Routes>

            {
                messages[0]
                ?
                <MessageQueue />
                :
                <></>
            }
        </div>
    )
}