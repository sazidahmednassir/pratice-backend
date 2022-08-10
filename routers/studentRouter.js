const express = require('express');
const router= express.Router();
const {Student}=require('../models/students')





const students= (req, res) => {
   
   
  }
  
  const createStudent= (req, res) => {
    const student = req.body;
   
  }
  
  const getOneStudent =  (req, res)=>{
    const id = parseInt(req.params.id)
   
  
  }
  
  const updatestudent = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
   
   
  }
  
  router.route('/').get(students).post(createStudent);
  
  router.route('/:id').get(getOneStudent).put(updatestudent);
  
  module.exports = router;