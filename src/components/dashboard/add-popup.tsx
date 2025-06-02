import "../../styles/dashboard.css"
import { useState } from "react"
import { BiCaretDown, BiCaretUp } from "react-icons/bi"
import { BsX } from "react-icons/bs"
import { closePopup } from "../../redux/add-url-popup"
import { useAppDispatch } from "../../redux/hooks"
import { addToQueue } from "../../redux/message-queue"
import { generateId } from "../../utils/random-id-ge"

type T_Dropdown = {
    changeDuration: (arg: string) => void;
    duration: string;
}


function DropdownItem ({ frequency, changeDuration }: Pick<T_Dropdown, "changeDuration"> & {frequency: string}) {
    function handleClick () {
        changeDuration(frequency)
    }

    return (
        <div className="add-url-dropdown-list-item" onClick={handleClick}>
            { frequency }
        </div>
    )
}

function Dropdown ({ changeDuration, duration }: T_Dropdown) {

    const [ focused, setFocused ] = useState<boolean>(false)

    function toggleFocus () {
        setFocused(!focused)
    }

    return (
        <div className="add-url-dropdown-container" onClick={toggleFocus}>
            <div className="add-url-dropdown">
                <span>{ duration || "Duration to check the URL" }</span>
                <span>{ focused ? <BiCaretUp /> : <BiCaretDown />}</span>
            </div>

            {
                focused
                ?
                <div className="add-url-dropdown-list">
                    <DropdownItem changeDuration={changeDuration} frequency="Every 30 Mins" />
                    <DropdownItem changeDuration={changeDuration} frequency="Hourly" />
                    <DropdownItem changeDuration={changeDuration} frequency="Every 6 Hours" />
                    <DropdownItem changeDuration={changeDuration} frequency="Daily" />
                    <DropdownItem changeDuration={changeDuration} frequency="Weekly" />
                </div>
                :
                <></>
            }
        </div>
    )
}

export function AddUrlPopup () {
    const [ newUrl, setNewUrl ] = useState({
        url: "",
        duration: "",
    })

    const dispatch = useAppDispatch()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUrl({ ...newUrl, [e.target.name]: e.target.value  })
    }

    function changeDuration (arg:string) {
        setNewUrl({ ...newUrl, duration: arg })
    }

    function popupClose () {
        dispatch(closePopup())
    }

    function handleSubmit () {
        const id = generateId()

        if (!newUrl.url || !newUrl.duration) {
            dispatch(addToQueue({
                id,        
                status: "failed",
                message: "url and duration required"
            }))

            return;
        }
    }
    
    return (
        <div className="add-url-popup">
            <span> Watch new URL </span>

            <div className="add-url-popup-form">
                <input type="url" name="url" value={newUrl.url} placeholder="https://www.your-url.com or www.your-url.com" onChange={handleChange} />
                <Dropdown changeDuration={changeDuration} duration={newUrl.duration} />
            </div>

            <button onClick={handleSubmit}>Add Url</button>

            <span className="popup-exit" onClick={popupClose}> <BsX /> </span>
        </div>
    )
}