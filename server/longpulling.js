const express = require('express')
const cors = require('cors')
//const events = require('events')
const EventEmitter = require('./EventEmitter')

const PORT = 5000
const app = express();
const emitter = new EventEmitter();
app.use(cors())
app.use(express.json())

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    }).catch(function() {});
}

app.get('/get-messages', (req, res)=>{
    console.log('/get-messages');
    const handler = (message)=>{
        res.status(200);
        res.json(message)
        res.end();
    }
    emitter.register(handler)
})

app.post('/new-messages', async (req, res)=>{
    const message = req.body;
    emitter.fire(message)
    res.status(200);
    res.end();
})

app.listen(PORT, ()=>{
    console.log(`server start on port ${PORT}`);
})