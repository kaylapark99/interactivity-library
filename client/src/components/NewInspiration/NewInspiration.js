import React, {useState} from 'react';
import "./NewInspiration.css"
import InspirationForm from "./InspirationForm";

function NewInspiration(props) {
    function saveInspirationDataHandler(enteredInspirationData) {
        const inspirationData = {
            ...enteredInspirationData,
            id:Math.random().toString()
        };
        props.onAddInspiration(inspirationData);
        setIsEditing(false);
    }

    const [isEditing, setIsEditing] = useState(false);

    function startEditingHandler() {
        setIsEditing(true);
    }

    function stopEditingHandler() {
        setIsEditing(false);
    }

    return (
        <div className="new-inspiration">
            {!isEditing && <button onClick={startEditingHandler} id="add-inspiration-button">+</button>}
            {isEditing && <div className="new-inspiration__form">
                <InspirationForm onSaveInspirationData={saveInspirationDataHandler} onCancel={stopEditingHandler} inspirationTags={props.inspirationTags} projectTags={props.projectTags}/>
            </div>}
        </div>
    );
}

export default NewInspiration;