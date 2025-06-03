import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openPopup } from "../../redux/add-url-popup";
import { AddUrlPopup } from "./add-popup";
import "../../styles/dashboard.css"
import { parseDateTime } from "../../utils/parsers";
import { useNavigate } from "react-router-dom";
import type React from "react";
import { Loader } from "../ui/loader";
import { toggleWatch } from "../../api/fetchdata";
import type { t_updateUrlActions } from "../../pages/dashboard/page";
import { useState } from "react";
import { generateId } from "../../utils/random-id-ge";
import { addToQueue } from "../../redux/message-queue";


export interface I_Dashboard {
    _id: string;
    website: string;
    date_added: number;
    cron_duration: string;
    running: string;
    pause: boolean;
}

function DashboardItem ({ _id, website, date_added, cron_duration, running, pause, updateUrl }: I_Dashboard & { updateUrl: (action: t_updateUrlActions, data:any) => void }) {
    
    const [ loading, setLoading ] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    function handleNavigate () {
        navigate(_id)
    }

    async function togglePause (e: React.PointerEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        
        const id = generateId()
        setLoading(true)

        // if (pause) return;
        const res = await toggleWatch(_id)


        if(res.status == "success") {
            // success message
            dispatch(addToQueue({
                id,        
                status: "success",
                message: `Cron ${pause ? "resumed": "paused"} Successfully`
            }))

            updateUrl("Update", {
                _id, website, date_added, cron_duration, running, pause: !pause
            })

            setLoading(false)
            return;
        }

        dispatch(addToQueue({
            id,        
            status: "failed",
            message: `Failed to ${pause ? "resume": "pause"} cron, Try again`
        }))
        setLoading(false)   
    }

    return (
        <div className="dashboard-table-item" onClick={handleNavigate}>
            <span>{website}</span>
            <span>{parseDateTime(date_added)}</span>
            <span>{cron_duration}</span>
            <span>
                <span className={running ? "status-up" : "status-down"}>
                    {running && !pause ? "Running" : running && pause ? "Paused" : "Down"}
                </span>
            </span>

            <span>
                <button
                    disabled={loading}
                    onClick={togglePause}
                    className={pause ? "resume-button" : "pause-button"}
                >
                    {
                        loading
                        ?
                        <div className="button-loader" />
                        :
                        <>{ pause ? "Resume" : "Pause" }</>
                    }
                </button>
            </span>
        </div>
    )
}

type t_dashboardMain = {
    loading: boolean;
    urls: I_Dashboard[];
    updateUrl: (action: t_updateUrlActions, data:any) => void;
}

export function DashboardMain ({ loading, urls,  updateUrl }: t_dashboardMain) {
    
    const newUrlPopupOpen = useAppSelector(state => state.addUrlPopup.value.open) 
    const userInfo = useAppSelector(state => state.userinfo.value)
    const dispatch = useAppDispatch()

    function addUrlPopup () {
        dispatch(openPopup())
    }


    return (
        <main className="dashboard-main">
            <div className="dashboard-main-top">
                <div>
                    <span>Welcome {userInfo.name || '---'}👋</span>
                    <span>Good to see you!</span>
                </div>

                <button className="new-url-button" onClick={addUrlPopup}>
                    <span>+</span>
                    <span>Add new URL</span>
                </button>
            </div>

            <div className="dashboard-table">
                <div className="dashboard-table-header">
                    <span>Url</span>
                    <span>Date Added</span>
                    <span>Check Duration</span>
                    <span>Status</span>
                    <span></span>
                </div>

                <div className="dashboard-table-carousel">
                    {
                        loading
                        ?
                        <div className="no-downtimes"> <Loader /> </div>
                        :
                        urls[0]
                        ?
                        <div className="dashboard-table-content">
                        {
                           urls.map((data, i) => (
                                <DashboardItem key={i} _id={data._id} website={data.website} date_added={data.date_added} cron_duration={data.cron_duration} running={data.running} pause={data.pause} updateUrl={updateUrl} />
                            ))
                        }
                        </div>
                        :
                        <div className="no-downtimes"> No Downtime Recorded </div>

                    }
                </div>
            </div>

            {
                newUrlPopupOpen
                ?
                <AddUrlPopup updateUrl={updateUrl} />
                :
                ""   
            }

        </main>
    )
}