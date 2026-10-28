require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;
const todo = require('./route/todoroute')




// Middleware
app.set('views', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())


app.use('/todos', todo)

app.listen(process.env.PORT , ()=> {
  console.log(`server is running on port https://localhost:${process.env.PORT}`)
})

