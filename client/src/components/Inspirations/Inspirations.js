import React, {useState} from 'react';
import Card from "../UI/Card";
import InspirationsFilter from "./InspirationsFilter";
import InspirationsList from './InspirationsList';
import "./Inspirations.css";

function Inspirations(props) {
    const [inspirationTag, setInspirationTag] = useState('all');
    function inspirationChangeHandler(selectedTag) {
         setInspirationTag(selectedTag);
    }
    const [projectTag, setProjectTag] = useState('all');
    function projectChangeHandler(selectedTag) {
        setProjectTag(selectedTag);
    }
    var filteredInspiration = props.items.filter(inspiration => {
        var jsonInspirationTags = JSON.parse(inspiration.inspirationTags);
        var jsonProjectTags = JSON.parse(inspiration.projectTags);
        var tag;
        for(var key in jsonInspirationTags) {
            if(jsonInspirationTags[key]==="1" && key===inspirationTag) {
                for(var projectKey in jsonProjectTags) {
                    if(jsonProjectTags[projectKey]==="1" && projectKey===projectTag) {
                        tag = projectKey;
                    }
                }
            }
        }
        return tag;
    });

    return (
        <div>
            <Card className="expenses">
                <InspirationsFilter inspirationSelected={inspirationTag} projectSelected={projectTag} onInspirationChange={inspirationChangeHandler} onProjectChange={projectChangeHandler} inspirationTags={props.inspirationTags} projectTags={props.projectTags}/>
                <InspirationsList items={filteredInspiration} inspirationTags={props.inspirationTags} projectTags={props.projectTags}/>
            </Card>
        </div>
    )
}

export default Inspirations;