const express = require('express');
const student = require('./routers/studentRouter')
const morgan= require('morgan')
const mongoose= require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/my-student-2', {
  useNewUrlParser: true
 
})
.then(()=>console.log('connected on database'))
.catch(err=>console.error(`Mongodb connection fail ${err}` ))


app.use(express.json());

app.use(express.static('public'))
app.use(morgan('dev'))

app.use((req,res, next)=>{
  console.log('hello i am middleware')
 next()
})

app.use('/students', student)


app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/get', (req, res) => {
  res.send('another response');
});
app.get('/student', (req, res) => {
  res.send(JSON.stringify(['SAZID', 'FARIA']));
});



const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
