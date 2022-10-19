import React, {useState} from 'react';
import "./InspirationForm.css";
import Axios from 'axios';

function InspirationForm(props) {
    const [inspirationTitle, setInspirationTitle] = useState('');
    function inspirationTitleChangeHandler(event) {
        setInspirationTitle(event.target.value); 
    }

    const [inspirationLink, setInspirationLink] = useState('');
    function inspirationLinkChangeHandler(event) {
        setInspirationLink(event.target.value); 
    }


    const [inspirationComments, setInspirationComments] = useState('');
    function inspirationCommentsChangeHandler(event) {
        setInspirationComments(event.target.value); 
    }

    const [inspirationImage, setInspirationImage] = useState('');
    function inspirationImageChangeHandler(event) {
        setInspirationImage(event.target.value); 
    }


    var initialInspirationTags = {'all':'1'}
    var inspirationTagCheckboxes = []
    for(var inspirationKey in props.inspirationTags) {
        var keyName = props.inspirationTags[inspirationKey ];
        if(keyName !== 'all') {
            initialInspirationTags[keyName] = '0';
            var keyId = "inspiration" + inspirationKey.toString;
            inspirationTagCheckboxes.push(<label key={keyName} htmlFor={keyId}><input type="checkbox" id={keyId} name={keyName} onChange={inspirationTagsChangeHandler}/>{keyName}</label>);
        }
    }

    const [inspirationTags, setInspirationTags] = useState(initialInspirationTags);

    function inspirationTagsChangeHandler(event) {
        var value = '0';
        if(event.target.checked) {
            value = '1';
        }
        setInspirationTags({...inspirationTags, [event.target.name]: value}); 
    }

    const [inspirationOther, setInspirationOther] = useState('');
    function inspirationOtherChangeHandler(event) {
        setInspirationOther(event.target.value);
    }

    var initialProjectTags = {'all':'1'}
    var projectTagCheckboxes = []
    for(var projectKey in props.projectTags) {
        var projectKeyName = props.projectTags[projectKey];
        if(projectKeyName !== 'all') { 
            initialProjectTags[projectKeyName] = '0';
            var projectKeyId = "project" + projectKey.toString;
            projectTagCheckboxes.push(<label key={projectKeyName} htmlFor={projectKeyId}><input type="checkbox" id={projectKeyId} name={projectKeyName} onChange={projectTagsChangeHandler}/>{projectKeyName}</label>);
        }   
    }

    const [projectTags, setProjectTags] = useState(initialProjectTags);

    function projectTagsChangeHandler(event) {
        var value = '0';
        if(event.target.checked) {
            value = '1';
        }
        setProjectTags({...projectTags, [event.target.name]: value}); 
    }

    const [projectOther, setProjectOther] = useState('');
    function projectOtherChangeHandler(event) {
        setProjectOther(event.target.value);
    }

    function submitPost(){
        Axios.post("http://localhost:3001/api/insert", 
            {inspirationTitle: inspirationTitle, 
            inspirationComments: inspirationComments, 
            inspirationLink: inspirationLink,
            inspirationImage: inspirationImage,
            inspirationTags: inspirationTags,
            projectTags: projectTags}
        ).then(()=>{
            alert("success");
            return 
        });
    }

    function submitHandler(event) {
        var submit = true;
        if(inspirationTags.other === '1') {
            if(inspirationOther !== '') {
                inspirationTags[inspirationOther] = '1';
                setInspirationTags({inspirationTags}); 
                submit = true;
            }
            else {
                event.preventDefault();
                alert("please fill out the interactivity other textbox");
                submit = false;
            }
        }
        delete inspirationTags['other'];
        if(projectTags.other === '1') {
            if(projectOther !== '') {
                projectTags[projectOther] = '1';
                setProjectTags({projectTags});
                submit = true;
            }
            else {
                event.preventDefault();
                alert("please fill out the project other textbox");
                submit = false;
            }
        }
        delete projectTags['other'];
        if(submit) {
            submitPost();
        }   
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
        
    return (
        <form onSubmit={submitHandler}>
            <div className="new-inspiration__controls">
                <div className="new-inspiration__control">
                    <input type="text" className="new-inspiration__control_input" placeholder="Title of Inspiration Site" value={inspirationTitle} onChange={inspirationTitleChangeHandler} required/>
                </div>
                <div className="new-inspiration__control">
                    <input type="url" className="new-inspiration__control_input" placeholder="Site URL" value={inspirationLink} onChange={inspirationLinkChangeHandler} required/>
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
                        <input type="checkbox" id="interactivity-other" name="other" value={'1'}  onChange={inspirationTagsChangeHandler}/>other: 
                        <input id='interactivity-other-text' className="other-text"  type='text' onChange={inspirationOtherChangeHandler}/></label>
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
                        <input type="checkbox" id="project-other" name="other" value={'1'} onChange={projectTagsChangeHandler}/>other: 
                        <input id='project-other-text' className="other-text" type='text' onChange={projectOtherChangeHandler}/></label>
                    </div>
                </div>
                <div className="new-inspiration__control">
                    <input type="url" className="new-inspiration__control_input" placeholder="Interactivity Image URL" value={inspirationImage} onChange={inspirationImageChangeHandler}/>
                    <p id="image-input-description">**Drop interactivity image screenshot into this <a href="https://drive.google.com/drive/folders/1H2d_VEpd5R7mrZC9AOPzNYqzuNu8opzr" rel="noreferrer" target="_blank">Google Drive Folder</a></p>
                </div>
                <div className="new-inspiration__control">
                    <textarea className="new-inspiration__control_input" rows="4" cols="50" placeholder="Why is this inspiration cool?" value={inspirationComments} onChange={inspirationCommentsChangeHandler} required></textarea>
                </div>
            </div>
            <div className="new-inspiration__actions">
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Inspiration</button>
            </div>
        </form>
    );
}

export default InspirationForm;