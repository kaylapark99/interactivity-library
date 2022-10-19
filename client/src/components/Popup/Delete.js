import "./Delete.css";

function Delete(props){
    return (
        <div className="delete-popup">
            <h3>Are you sure you want to permenantly delete {props.title} from the interactivity library?</h3>
            <button type="button" onClick={function(){props.onPopupDeleteHandler(props.id)}}>Delete</button>
            <button type="button" onClick={props.onCancelDeleteHandler}>Cancel</button>
        </div>
    )

}

export default Delete;