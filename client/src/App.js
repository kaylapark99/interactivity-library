import React, {useState, useEffect} from 'react';
import Inspirations from "./components/Inspirations/Inspirations"; 
import NewInspiration from "./components/NewInspiration/NewInspiration";
import Axios from 'axios';

function App() {
  const [inspirations, setInspirations] = useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((res)=>{
        setInspirations(res.data);
    });
  },[]);
  
  function addInspirationHandler(inspirationData) {
    setInspirations((prevInspirations) => {
      return [...prevInspirations, inspirationData];
    });
  }

  var inspirationTags = []
  var projectTags = [];
  function tags() {
    for(var x in inspirations) {
      var inspirationKeys = Object.keys(JSON.parse(inspirations[x].inspirationTags));
      var projectKeys = Object.keys(JSON.parse(inspirations[x].projectTags));
      inspirationTags = [...new Set([...inspirationTags, ...inspirationKeys])];
      projectTags = [...new Set([...projectTags, ...projectKeys])];
    }
  }

  tags();

  return (
    <div id="inspiration-lib">
      <NewInspiration onAddInspiration={addInspirationHandler} inspirationTags={inspirationTags} projectTags={projectTags}/>
      <Inspirations items={inspirations} inspirationTags={inspirationTags} projectTags={projectTags}/>
    </div>
  );
}
 
export default App;
