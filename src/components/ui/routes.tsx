import '../../App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/landing-page/page.tsx"
import Dashboard from "../../pages/dashboard/page.tsx"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { useLayoutEffect } from "react";
import { toggleTheme } from "../../redux/theme.ts";
import { MessageQueue } from './message.tsx';

export function AppRoutes () {

    const theme = useAppSelector(state => state.theme.value)
    const messages = useAppSelector(state => state.messageQueue.value)
    const dispatch = useAppDispatch()
    
    useLayoutEffect(() => {
        if (!window.matchMedia) return;

        const isDark = window.matchMedia("prefers-color-scheme: dark").matches
        if (isDark && theme == "dark") {
            dispatch(toggleTheme())
        }

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