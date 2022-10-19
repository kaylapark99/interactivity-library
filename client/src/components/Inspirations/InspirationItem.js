import React, {useState} from 'react';
import Card from "../UI/Card"
import Delete from "../Popup/Delete";
import Edit from "../Popup/Edit";
import "./InspirationItem.css";
import trash from "../../assets/trash_icon.png";
import edit from "../../assets/edit_icon.png";
import Axios from 'axios';

function InspirationItem(props) {
    var inspirationTags = [];
    var projectTags=[];
    const parsedInspirationTags = JSON.parse(props.inspirationTags);
    const parsedProjectTags = JSON.parse(props.projectTags);
    for(var inspirationKey in parsedInspirationTags) {
        if(parsedInspirationTags[inspirationKey] === '1' && inspirationKey!=="all") {
            inspirationTags.push(<p className="tags inspiration-tags" key={inspirationKey}>{inspirationKey}</p>);
        }
    }
    for(var projectKey in parsedProjectTags) {
        if(parsedProjectTags[projectKey] === '1' && projectKey!=="all"){
            projectTags.push(<p className="tags project-tags" key={projectKey}>{projectKey}</p>)
        }
    }

    var img = props.image.match( /d\/([A-Za-z0-9-_]+)/ );
    console.log(img);
    var imageURL = "http://drive.google.com/uc?export=view&id=" + img[1];
    console.log(imageURL);

    inspirationTags.reverse();

    const [toDelete, setToDelete] = useState(false);

    function deleteHandler() {
        setToDelete(true);
    }

    function cancelDeleteHandler() {
        setToDelete(false);
    }

    function popupDeleteHandler(id) {
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
        window.location.reload();
    }

    const [toEdit, setToEdit] = useState(false);
    
    function editHandler() {
        setToEdit(true);
    }

    function cancelEditHandler() {
        setToEdit(false);
    }


    return (
        <Card className="inspiration-item">
            <div className="inspiration-item__description">
                {inspirationTags}
                {projectTags}
                <img src={trash} alt="trash icon" className="icon" onClick={deleteHandler}/>
                <img src={edit} alt="edit icon" className="icon" id="edit-icon" onClick={editHandler}/>
                <h2>{props.title}</h2>
                <img src={imageURL} alt="" className="inspiration-image"></img>
                <p className="inspiration-item__comment">{props.comment}</p>
                <button><a href={props.link} target="_blank" rel="noreferrer">VIEW INSPIRATION</a></button>
                {toDelete &&
                    <div>   
                        <div className='background-popup'></div>
                        <Delete id={props.id} title={props.title} onPopupDeleteHandler={popupDeleteHandler} onCancelDeleteHandler={cancelDeleteHandler}/>
                    </div>
                }
                {toEdit && <Edit onCancelEditHandler={cancelEditHandler} id={props.id} title={props.title} link={props.link} comment={props.comment} inspirationTags={props.inspirationTags} projectTags={props.projectTags} inspirationTagsAll={props.inspirationTagsAll} projectTagsAll={props.projectTagsAll}/>}
            </div> 
        </Card>  
    )
}

export default InspirationItem;