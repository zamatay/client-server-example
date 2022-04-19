const express = require('express')
const cors = require('cors')
const {EventEmitter} = require('events')

const PORT = 5000
const app = express();
const emitter = new EventEmitter();


app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res)=>{
    emitter.once('newMessage', (message)=>{
        console.log(message);
        res.json(message)
    })
})

app.post('/new-messages', (req, res)=>{
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200);
})

app.listen(PORT, ()=>{
    console.log(`server start on port ${PORT}`);
})