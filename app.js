const express = require('express');
const student = require('./routers/studentRouter')

const app = express();


app.use(express.json());

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
