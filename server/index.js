const express = require('express');  
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.envPORT || 3001;
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'password',
    database:'CRUDDatabase'
});

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res)=>{
    const sqlSelect = "SELECT * FROM interactivity_library";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    });
});

app.post("/api/insert", (req,res)=>{
    const inspirationTitle = req.body.inspirationTitle;
    const inspirationComments = req.body.inspirationComments;
    const inspirationLink = req.body.inspirationLink;
    const inspirationImage = req.body.inspirationImage;
    const inspirationTags = JSON.stringify(req.body.inspirationTags);
    const projectTags = JSON.stringify(req.body.projectTags);
    const sqlInsert = "INSERT INTO interactivity_library (inspirationTitle, inspirationComments, inspirationLink,inspirationImage, inspirationTags, projectTags) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[inspirationTitle, inspirationComments, inspirationLink, inspirationImage, inspirationTags, projectTags], (err, result)=>{
        if(err) console.log(err); 
    }); 
});

app.delete("/api/delete/:id", (req,res)=> {
    const id = req.params.id;  
    const sqlDelete = "DELETE FROM interactivity_library WHERE id = ?";
    db.query(sqlDelete, id, (err,result)=>{
        if(err) console.log(err); 
    }); 
});

app.put("/api/update", (req,res)=> {
    const inspirationTitle = req.body.inspirationTitle;
    const inspirationComments = req.body.inspirationComments;
    const inspirationLink = req.body.inspirationLink;
    const inspirationTags = JSON.stringify(req.body.inspirationTags);
    const projectTags = JSON.stringify(req.body.projectTags);
    const id = req.body.id;  
    const sqlUpdate = "UPDATE interactivity_library SET inspirationTitle=?, inspirationComments=?, inspirationLink=?, inspirationTags=?, projectTags=? WHERE id=?";
    db.query(sqlUpdate, [inspirationTitle, inspirationComments, inspirationLink, inspirationTags, projectTags, id], (err,result)=>{
        if(err) console.log(err); 
    }); 
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static('../client/build'));
    app.get('*', (req,res) => {
        req.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
}
 
app.listen(port, () => {
    console.log("running on port ", port);
})