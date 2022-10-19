import React, {useState} from 'react';
import "./Edit.css";
import Axios from 'axios';

function Edit(props){
    const [editInspirationTitle, setEditInspirationTitle] = useState(props.title);
    function editInspirationTitleChangeHandler(event) {
        setEditInspirationTitle(event.target.value); 
    }

    const [editInspirationLink, setEditInspirationLink] = useState(props.link);
    function editInspirationLinkChangeHandler(event) {
        setEditInspirationLink(event.target.value); 
    }

    const [editInspirationComments, setEditInspirationComments] = useState(props.comment);
    function editInspirationCommentsChangeHandler(event) {
        setEditInspirationComments(event.target.value); 
    }

    const [editInspirationImage, setEditInspirationImage] = useState('');
    function editInspirationImageChangeHandler(event) {
        setEditInspirationImage(event.target.value); 
    }

    var initialInspirationTags = {'all':'1'}
    var inspirationTagCheckboxes = []
    var inspirationTags = JSON.parse(props.inspirationTags);
;    for(var inspirationKey in props.inspirationTagsAll) {
        var keyName = props.inspirationTagsAll[inspirationKey];
        if(keyName !== 'all') {
            var keyId = "inspiration" + inspirationKey.toString;
            if(inspirationTags[keyName] === '1') {
                initialInspirationTags[keyName] = '1';
                inspirationTagCheckboxes.push(<label key={keyName} htmlFor={keyId}><input type="checkbox" id={keyId} value={'1'} name={keyName} onChange={editInspirationTagsChangeHandler} checked/>{keyName}</label>);
            }
            else {
                initialInspirationTags[keyName] = '0';
                inspirationTagCheckboxes.push(<label key={keyName} htmlFor={keyId}><input type="checkbox" id={keyId} value={'1'} name={keyName} onChange={editInspirationTagsChangeHandler}/>{keyName}</label>);
            }
        }
    }

    const [editInspirationTags, setEditInspirationTags] = useState(initialInspirationTags);

    function editInspirationTagsChangeHandler(event) {
        var value = '0';
        if(event.target.checked) {
            value = '1';
        }
        setEditInspirationTags({...editInspirationTags, [event.target.name]: value}); 
    }

    const [editInspirationOther, setEditInspirationOther] = useState('');
    function editInspirationOtherChangeHandler(event) {
        setEditInspirationOther(event.target.value);
    }

    var initialProjectTags = {'all':'1'}
    var projectTagCheckboxes = []
    var projectTags = JSON.parse(props.projectTags);
    for(var projectKey in props.projectTagsAll) {
        var projectKeyName = props.projectTagsAll[projectKey];
        if(projectKeyName !== 'all') { 
            var projectKeyId = "project" + projectKey.toString;
            if(projectTags[projectKeyName] === '1') {
                initialProjectTags[projectKeyName] = '1';
                projectTagCheckboxes.push(<label key={projectKeyName} htmlFor={projectKeyId}><input type="checkbox" value={'1'} id={projectKeyId} name={projectKeyName} onChange={editProjectTagsChangeHandler} checked/>{projectKeyName}</label>);
            }
            else {
                initialProjectTags[projectKeyName] = '0';
                projectTagCheckboxes.push(<label key={projectKeyName} htmlFor={projectKeyId}><input type="checkbox" value={'1'} id={projectKeyId} name={projectKeyName} onChange={editProjectTagsChangeHandler}/>{projectKeyName}</label>);
            }
        
        }   
    }

    const [editProjectTags, setEditProjectTags] = useState(initialProjectTags);

    function editProjectTagsChangeHandler(event) {
        var value = '0'; 
        if(event.target.checked) {
            value = '1';
        }
        setEditProjectTags({...editProjectTags, [event.target.name]: value}); 
    }

    const [editProjectOther, setEditProjectOther] = useState('');
    function editProjectOtherChangeHandler(event) {
        setEditProjectOther(event.target.value);
    }

    var expandedTags = {"inspiration":false, "projects":false};

    function showCheckboxes(tagName) {
        var checkboxId = "checkboxes-"+tagName;
        var checkboxes = document.getElementById(checkboxId);
            if (!expandedTags[tagName]) {
                checkboxes.style.display = "block";
                expandedTags[tagName] = true;
            } else {
                checkboxes.style.display = "none";
                expandedTags[tagName] = false;
            }
    }

    function saveHandler(event){
        var submit = true;
        if(editInspirationTags.other === '1') {
            if(editInspirationOther !== '') {
                editInspirationTags[editInspirationOther] = '1';
                setEditInspirationTags({editInspirationTags}); 
                submit = true;
            }
            else {
                event.preventDefault();
                alert("please fill out the interactivity other textbox");
                submit = false;
            }
        }
        delete editInspirationTags['other'];
        if(editProjectTags.other === '1') {
            if(editProjectOther !== '') {
                editProjectTags[editProjectOther] = '1';
                setEditProjectTags({editProjectTags});
                submit = true;
            }
            else {
                event.preventDefault();
                alert("please fill out the project other textbox");
                submit = false;
            }
        }
        delete editProjectTags['other'];
        if(submit) {
            Axios.put("http://localhost:3001/api/update", {
                inspirationTitle: editInspirationTitle, 
                inspirationComments: editInspirationComments, 
                inspirationLink: editInspirationLink,
                inspirationTags: editInspirationTags,
                projectTags: editProjectTags,
                inspirationImage: editInspirationImage,
                id: props.id
            });
            window.location.reload();
        }   
    }

    return (
        <div className="edit-popup-container">
            <div className="edit-popup">
                <h1>Edit Inspiration</h1>
                <form onSubmit={saveHandler}>
                    <div className="new-inspiration__controls">
                        <div className="new-inspiration__control">
                            <input type="text" className="new-inspiration__control_input" placeholder={props.title} value={editInspirationTitle} onChange={editInspirationTitleChangeHandler} required/>
                        </div>
                        <div className="new-inspiration__control">
                            <input type="url" className="new-inspiration__control_input" placeholder={props.link} value={editInspirationLink} onChange={editInspirationLinkChangeHandler} required/>
                        </div>
                        <div className="multiselect new-inspiration__control">
                            <div className="selectBox" onClick={()=>showCheckboxes("inspiration")}>
                            <select className="new-inspiration__control_input">
                                <option>Add Interactivity Tags</option>
                            </select>
                            <div className="overSelect"></div>
                            </div>
                            <div id="checkboxes-inspiration" className="checkboxes">
                            {inspirationTagCheckboxes}
                            <label htmlFor="other">
                                <input type="checkbox" id="interactivity-other" name="other" value={'1'}  onChange={editInspirationTagsChangeHandler}/>other: 
                                <input id='interactivity-other-text' className="other-text"  type='text' onChange={editInspirationOtherChangeHandler}/></label>
                            </div>
                        </div>
                            <div className="multiselect new-inspiration__control">
                        <div className="selectBox" onClick={()=>showCheckboxes("projects")}>
                        <select className="new-inspiration__control_input">
                            <option>Add Project Tags</option>
                        </select>
                        <div className="overSelect"></div>
                        </div>
                        <div id="checkboxes-projects" className="checkboxes">
                        {projectTagCheckboxes}
                        <label htmlFor="other">
                            <input type="checkbox" id="project-other" name="other" value={'1'} onChange={editProjectTagsChangeHandler}/>other: 
                            <input id='project-other-text' className="other-text" type='text' onChange={editProjectOtherChangeHandler}/></label>
                        </div>
                    </div>
                    <div className="new-inspiration__control">
                        <input type="url" className="new-inspiration__control_input" placeholder="Interactivity Image URL" value={editInspirationImage} onChange={editInspirationImageChangeHandler}/>
                        <p id="image-input-description" className='edit-image-input-description'>**Drop interactivity image screenshot into this <a href="https://drive.google.com/drive/folders/1H2d_VEpd5R7mrZC9AOPzNYqzuNu8opzr" rel="noreferrer" target="_blank">Google Drive Folder</a></p>
                    </div>
                    <div className="new-inspiration__control">
                        <textarea className="new-inspiration__control_input" rows="4" cols="50" placeholder={props.comment} value={editInspirationComments} onChange={editInspirationCommentsChangeHandler} required></textarea>
                    </div>
                    </div>
                    <div className="new-inspiration__actions">
                        <button className="edit-popup__button" type="button" onClick={props.onCancelEditHandler}>Cancel</button>
                        <button className="edit-popup__button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Edit;

/*<div className="new-inspiration__control">
    <input type="file" id="myFile" name="filename" accept="image/*"/>
</div>*/