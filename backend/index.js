//imports our modules and reads in the env variables
const express = require("express"),
    app = express(),
    port = process.env.PORT || 3001,
    cors = require('cors');

const bodyParser = require('body-parser');
const fs = require("fs").promises;

//sets up the express appl/server and returns a message once running
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

//when this route/URL is GET requested it says this message
app.get("/", (req, res) => {
    res.send({message: "Connected to backend server!"});
});

//calls the addItem function once this route is POSTed to
app.post("/add/item", addItem)

async function addItem (request, response) {
    try{
        //overall will be converting JS objecy (task item) into a JSON string
        //does this by taking the request body and putting in the form of an object called newTask
        const id = request.body.jsonObject.id
        const task = request.body.jsonObject.task
        const curDate = request.body.jsonObject.currentDate
        const dueDate = request.body.jsonObject.dueDate
        const newTask = {
            ID: id,
            Task: task,
            Current_date: curDate,
            Due_date: dueDate
        }
//read text => creates new js object, parses text into js object format (makes update)
//=> turns back to string adds back to json file
    
//uses async function in order to read the db file, change its contents in js object
        const data = await fs.readFile("database.json");
    //puts text into js object format
        const json = JSON.parse(data);
    //takes takes this object and adds it to the json list 
        json.push(newTask);
    //adds the new json object list converts it to stringn format to add back to the file
        await fs.writeFile("database.json", JSON.stringify(json))
        console.log('Successfully wrote to file')
        response.sendStatus(200)
    }catch(err){
        console.log("error: ", err)
        response.sendStatus(500)
    }
}
