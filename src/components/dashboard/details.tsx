import { useParams, useNavigate } from "react-router-dom"
import "../../styles/dashboard.css"
import { useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { deleteSiteFromWatch, fetchDowntimes, toggleWatch, urlInfo } from "../../api/fetchdata"
import { parseDateTime, parseTime } from "../../utils/parsers"
import { Loader } from "../ui/loader"
import { useAppDispatch } from "../../redux/hooks"
import { addToQueue } from "../../redux/message-queue"
import { generateId } from "../../utils/random-id-ge"
import type { t_updateUrlActions } from "../../pages/dashboard/page"

type T_Downtime = {
    from: number,
    to: number,
    check_rate: string
}

function DowntimeCard ({ from, to, check_rate }: T_Downtime) {
    return (
        <div className="downtime-card">
            <span className="downtime-card-indicator">
                <span />
            </span>

            <div className="downtime-card-content">
                <div>
                    <span>Went down on {parseDateTime(from)}</span>
                    <span> {parseTime(from)} </span>
                </div>

                <div>
                    Check Rate - {check_rate}
                </div>

            </div>
        </div>
    )
}

type t_details = {
    updateUrl: (action: t_updateUrlActions, data: any) => void
}

export function Details ({ updateUrl }: t_details) {
    
    const [ downtimes, setDowntimes ] = useState<any[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ toggleLoading, setToggleLoading ] = useState<boolean>(false)
    const [ deleteLoading, setDeleteLoading ] = useState<boolean>(false)
    const [ urlData, setUrlData ] = useState<any>({})
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    function goback () {
        navigate("/dashboard")
    }

    function updateUrlPaused () {
        setUrlData({...urlData, pause: !urlData.pause })
    }

    async function fetchAllDowntimes () {
        const result =  await fetchDowntimes(id as string)
        
        if(result.status == "success") {
            setDowntimes([...result.data])
            setLoading(false)
            return;
        }

        setLoading(false)
    }

    async function getUrlData () {
        const result = await urlInfo(id as string)

        if(result.status == "success") {
            setUrlData(result.data._doc)
            return;
        }
        navigate("/dashboard")
        return
    }

    async function toggleUrlWatchState () {
        const id = generateId()
        
        setToggleLoading(true)

        const res = await toggleWatch(urlData?._id as string)

        if(res.status == "success") {
            // success message
            dispatch(addToQueue({
                id,        
                status: "success",
                message: `Cron ${urlData?.pause ? "resumed": "paused"} Successfully`
            }))

            updateUrl("Update", {...urlData, pause: !urlData.pause })
            updateUrlPaused()
            setToggleLoading(false)
            
            return;
        }
        
        dispatch(addToQueue({
            id,        
            status: "failed",
            message: `Failed to ${urlData?.pause ? "resume": "pause"} cron, Try again`
        }))
        setToggleLoading(false)
    }

    async function removeUrlWatcher () {
        const id = generateId()
        
        setDeleteLoading(true)

        const res = await deleteSiteFromWatch(urlData?._id as string)

        if(res.status == "success") {
            // success message
            dispatch(addToQueue({
                id,        
                status: "success",
                message: "Successfully deleted url from watchlist"
            }))
            
            setDeleteLoading(false);
            updateUrl("Delete", urlData)
            return;
        }
        
        dispatch(addToQueue({
            id,        
            status: "failed",
            message: "Failed to delete url, Try again"
        }))
        setDeleteLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        getUrlData();
        fetchAllDowntimes()
    }, [])


    return (
        <div className="dashboard-details">
            <div className="dashboard-details-header">
               <div>
                    <span onClick={goback}> <IoIosArrowBack /> </span>
                    <span> {urlData?.website ||  "---"} </span>
                </div>
                
                <div className="dashboard-details-buttons">
                   <button className="api-call-button"
                        onClick={toggleUrlWatchState}
                        disabled={ toggleLoading || deleteLoading }
                   >
                        {
                            !toggleLoading
                            ?
                            urlData?.pause ? "Resume" : "Pause"
                            :
                            <div className="button-loader" />
                        }
                    </button>

                   <button className="api-call-button"
                        onClick={removeUrlWatcher}
                        disabled={ toggleLoading || deleteLoading }
                   >
                    {
                        !deleteLoading
                        ?
                        "Delete"
                        :
                        <div className="button-loader" />
                    }
                   </button>
                </div>
            </div>

            <div className="dashboard-details-content">
                <span>Downtimes</span>

                <div className="downtimes-container">
                    {
                        loading
                        ?
                        <div className="no-downtimes"> <Loader /> </div>
                        :
                        !downtimes[0]
                        ?
                        <div className="no-downtimes"> No Downtime Recorded </div>
                        :
                        <div className="downtimes-list">
                        {
                            downtimes.map((downtime, index) => (
                                <DowntimeCard 
                                    key={index}
                                    from={downtime.from} 
                                    to={downtime.to} 
                                    check_rate={downtime.check_rate} />
                            ))
                        }
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}