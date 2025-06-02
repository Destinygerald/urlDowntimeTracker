import { useParams, useNavigate } from "react-router-dom"
import "../../styles/dashboard.css"
import { useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { fetchDowntimes } from "../../api/fetchdata"
import { parseDateTime, parseTime } from "../../utils/parsers"
import { Loader } from "../ui/loader"

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

export function Details () {
    
    const [ downtimes, setDowntimes ] = useState<any[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const { id } = useParams()
    const navigate = useNavigate()

    function goback () {
        navigate("/dashboard")
    }

    async function fetchAllDowntimes () {
        const result =  await fetchDowntimes(id as string)
        
        if(result.status == 200) {
            setDowntimes([...result.data])
        }

        setLoading(false)
    }


    useEffect(() => {
        setLoading(true)
        fetchAllDowntimes()
    }, [])

    return (
        <div className="dashboard-details">
            <div className="dashboard-details-header">
               <div>
                    <span onClick={goback}> <IoIosArrowBack /> </span>
                    <span> https://programming-lab-frontend.onrender.com </span>
                </div>
                
                <div className="dashboard-details-buttons">
                   <button>Pause</button>
                   <button>Delete</button>
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