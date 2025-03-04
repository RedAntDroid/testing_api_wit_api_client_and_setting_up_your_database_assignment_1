// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const express = require('express');
const bodyParser = require('body-parser') 
const cors = require('cors')
const fs = require('fs')

const app = express();
const port = 3010;
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('static'));

app.post('/students/above-threshold', (req, res) => {
  const {threshold} = req.body;

  if(typeof threshold !== "number" || threshold<0){
    return res.status(400).json({Error:"In valid thersold value. It must be a positive integer"})
  }

  // fs.readFile("data.json","utf8",(err,data)=>{
    // if(err){
    //   console.log("error on reading file:" ,err)
    //   return res.status(500).json({error:"Internal server error"})
    // }
    const studentsData = require('./data.json')
    const filteredStudents = studentsData
    .filter(student => student.total > threshold)
    .map(student => ({ name: student.name, total: student.total }));

    res.json({
      count: filteredStudents.length,
      students: filteredStudents
    })
  })
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});