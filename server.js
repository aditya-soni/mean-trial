const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const http = require('http');
const _ = require('lodash');

const {Todo}=require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req,res,next)=>{
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
 
     // Pass to next layer of middleware
     next();
})

app.get('/',(req,res)=>{
    res.send('index page')
});

app.post('/todos',(req,res)=>{
    var newTodo = new Todo({
        text : req.body.text
    });

    newTodo.save().then(
        (doc)=>{res.send(doc)},
        err => {res.send(err)}
    );
});

app.get('/todos',(req,res)=>{
    Todo.find().then(
        todos=>{res.send({todos})},
        (err)=> {console.log('Something went wrong', err)}
    )
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.send('ID IS NOT VALID')
    }
    
    Todo.findById(id).then(
        todo =>{
            if(!todo){
                return res.send('No todo found');
            }
            res.send(todo);
        },
        err=> res.send(err)
    )
});

// app.set('port',port)

app.listen(port,()=>{
    console.log(`Server is up and running on ${port}`)
});

// http.createServer(app);
