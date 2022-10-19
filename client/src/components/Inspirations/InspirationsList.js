import "./InspirationsList.css";
import InspirationItem from "./InspirationItem";

function InspirationsList(props) {
    if(props.items.length === 0) {
        return <h2 className="inspiration-list__fallback">No Inspiration.</h2>
    }
    return <div className="inspiration-list">
        {props.items.slice(0).reverse().map(inspiration => (
            <InspirationItem 
            key={inspiration.id}
            id={inspiration.id}
            title={inspiration.inspirationTitle} 
            link={inspiration.inspirationLink}
            comment={inspiration.inspirationComments}
            image={inspiration.inspirationImage}
            inspirationTags={inspiration.inspirationTags}
            projectTags={inspiration.projectTags}
            inspirationTagsAll={props.inspirationTags} 
            projectTagsAll={props.projectTags}
            />
        ))}
    </div>
}

export default InspirationsList;