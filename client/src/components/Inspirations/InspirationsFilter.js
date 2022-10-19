import "./InspirationsFilter.css";

function InspirationsFilter(props) {
  function inspirationTagChangeHandler(event) {
    props.onInspirationChange(event.target.value);
  }

  function projectTagChangeHandler(event) {
    props.onProjectChange(event.target.value);
  }

  var inspirationOptions = []
  for(var tag in props.inspirationTags) {
    var tagName = props.inspirationTags[tag];
    inspirationOptions.push(<option key={tagName} value={tagName}>{tagName}</option>)
  }
  var projectOptions = []
  for(var projectTag in props.projectTags) {
    var projectTagName = props.projectTags[projectTag];
    projectOptions.push(<option key={projectTagName} value={projectTagName}>{projectTagName}</option>)
  }

  return (
    <div>
      <div className='inspiration-filter'>
        <div className='inspiration-filter__control'>
          <label>Filter by Interactivity Tag</label>
          <select value={props.inspirationSelected} onChange={inspirationTagChangeHandler}>
            {inspirationOptions}
          </select>
        </div>
      </div>
      <div className='inspiration-filter'>
        <div className='inspiration-filter__control'>
          <label>Filter by Project Tag</label>
          <select value={props.projectSelected} onChange={projectTagChangeHandler}>
            {projectOptions}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InspirationsFilter;