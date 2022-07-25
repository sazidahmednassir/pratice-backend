const express = require('express');
const router= express.Router();
const db = require('../db')

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
  
  router.route('/').get(students).post(createStudent);
  
  router.route('/:id').get(getOneStudent).put(updatestudent).delete(deleteStudent);
  
  module.exports = router;