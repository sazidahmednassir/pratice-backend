const express = require('express');

const app = express();
const db = require('./db')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/get', (req, res) => {
  res.send('another response');
});
app.get('/student', (req, res) => {
  res.send(JSON.stringify(['SAZID', 'FARIA']));
});

app.get('/students', (req, res) => {
  db.getDbStudents()
  .then(students=>{
    res.send(students);
  })
 
});


app.post('/students', (req, res) => {
  const student = req.body;
  db.getDbStudents()
      .then(students => {
          students.push(student);
          db.insertDbStudent(students)
              .then(student => {
                  res.send(student);
              });
      });
});

app.get('/students/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  db.getDbStudents()
  .then(students =>{
    const student= students.find(s=>s.id === id)
    if(!student) res.status(404).send("no student found");
    else res.send(student)
  })

})


const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
