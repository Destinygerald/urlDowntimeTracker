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


export interface I_Dashboard {
    id: string;
    url: string;
    date_added: number;
    check_duration: string;
    status: string;
    paused: boolean;
}

function DashboardItem ({ id, url, date_added, check_duration, status, paused }: I_Dashboard) {
    const navigate = useNavigate();

    function handleNavigate () {
        navigate(id)
    }

    async function togglePause (e: React.PointerEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()

        // if (paused) return;
        await toggleWatch(id)
    }

    return (
        <div className="dashboard-table-item" onClick={handleNavigate}>
            <span>{url}</span>
            <span>{parseDateTime(date_added)}</span>
            <span>{check_duration}</span>
            <span>
                <span className={status.toLowerCase() == 'running' ? "status-up" : "status-down"}>
                    {status}
                </span>
            </span>

            <span>
                <button
                    onClick={togglePause}
                    className={paused ? "resume-button" : "pause-button"}
                >
                    { paused ? "Resume" : "Pause" }
                </button>
            </span>
        </div>
    )
}

type t_dashboardMain = {
    loading: boolean;
    urls: I_Dashboard[];
    setUrls: (arg: any) => void;
    updateUrl: (action: t_updateUrlActions, data:any) => void;
}

export function DashboardMain ({ loading, urls, setUrls, updateUrl }: t_dashboardMain) {
    
    const newUrlPopupOpen = useAppSelector(state => state.addUrlPopup.value.open) 
    const dispatch = useAppDispatch()

    function addUrlPopup () {
        dispatch(openPopup())
    }

    function _updateUrls () {
        // update the url when the toggle button is clicked        
    }

    return (
        <main className="dashboard-main">
            <div className="dashboard-main-top">
                <div>
                    <span>Welcome John👋</span>
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
                                <DashboardItem key={i} id={data.id} url={data.url} date_added={data.date_added} check_duration={data.check_duration} status={data.status} paused={data.paused}  />
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