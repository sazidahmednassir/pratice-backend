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

const students= (req, res) => {
  db.getDbStudents()
  .then(students=>{
    res.send(students);
  })
 
}

const createStudent= (req, res) => {
  const student = req.body;
  db.getDbStudents()
      .then(students => {
          students.push(student);
          db.insertDbStudent(students)
              .then(student => {
                  res.send(student);
              });
      });
}

const getOneStudent =  (req, res)=>{
  const id = parseInt(req.params.id)
  db.getDbStudents()
  .then(students =>{
    const student= students.find(s=>s.id === id)
    if(!student) res.status(404).send("no student found");
    else res.send(student)
  })

}

const updatestudent = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  db.getDbStudents()
      .then(students => {
          const student = students.find(s => s.id === id);
          if (!student) res.status(404).send("No student found with this id!");
          else {
              const i = students.findIndex(s => s.id === id);
              students[i] = updatedData;
              db.insertDbStudent(students)
                  .then(msg => res.send(updatedData));
          }
      });
}

const deleteStudent= (req, res) => {
  const id = parseInt(req.params.id)
  db.getDbStudents()
  .then(students =>{
    const student= students.find(s=>s.id === id)
    if(!student) res.status(404).send("no student found");
    const updatedstudents= students.filter(s=> s.id !== id)
    db.insertDbStudent(updatedstudents)
    .then(msg=>res.send(student))
  })
 
}

app.get('/students', students);


app.post('/students', createStudent);

app.get('/students/:id', getOneStudent)

app.put('/students/:id', updatestudent);


app.delete('/students/:id', deleteStudent)
const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
