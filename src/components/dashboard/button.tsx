import "../../styles/ui.css"

type t_button = {
    loading: boolean;
    clickHandler: () => void;
    label: string;

}

export function Button ({ loading, clickHandler, label }: t_button) {
    return (
        <button 
            className="api-call-button"
            disabled={loading}
            onClick={clickHandler}
        >
            { 
                loading
                ?
                <div className="button-loader"/>
                :
                label
            }
        </button>
    )
}