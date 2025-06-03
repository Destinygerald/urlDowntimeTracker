import { Route, Routes } from "react-router-dom"
import { DashboardMain, type I_Dashboard } from "../../components/dashboard/main"
import { Topbar } from "../../components/dashboard/topbar"
import "../../styles/dashboard.css"
import { Details } from "../../components/dashboard/details"
import { useEffect, useState } from "react"
import { getUrls } from "../../api/fetchdata"
import { Profile } from "../../api/auth"
import { useAppDispatch } from "../../redux/hooks"
import { setUserinfo } from "../../redux/userinfo"


export type t_updateUrlActions = "Update" | "Delete" | "Add";

export default function Page () {
    
    const [ urls, setUrls ] = useState<I_Dashboard[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    async function getData () {
        const res = await getUrls()

        if (res && res.statusCode == 200) {
            setUrls(res.data)
        }

        setLoading(false)
    }

    async function getProfile () {
        const res:any = await Profile();

        if (res && res?.statusCode == 200) {
            dispatch(setUserinfo({
                name: res.data.displayName,
                email: res.data.emails[0].value
            }))
        }

        return;
    }

    function updateUrl (action: t_updateUrlActions, data:any) {
        switch (action) {
            case "Add":
                const newUrls_add = [...urls]
                newUrls_add.unshift(data);
                setUrls([...newUrls_add]);
                break;
            case "Delete":
                const newUrls_delete= urls.filter(url => url.id != data.id)
                setUrls([...newUrls_delete])
                break;
            case "Update":
                const newUrls_update = urls.map(url => {
                    if (url.id == data.id) {
                        url = data
                    }
                    return url;
                })
                setUrls([...newUrls_update])
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        setLoading(true)
        getProfile()
        getData()
    }, [])

    return (
        <div className="dashboard">
            <Topbar />
            
            <Routes>
                <Route path="/" element={<DashboardMain loading={loading} urls={urls} setUrls={setUrls} updateUrl={updateUrl} />} />
                <Route path="/:id" element={<Details updateUrl={updateUrl} />} />
                <Route path="*" element={<DashboardMain loading={loading} urls={urls} setUrls={setUrls} updateUrl={updateUrl} />} />
            </Routes>
        </div>
    )
}