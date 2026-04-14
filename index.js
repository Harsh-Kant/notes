const express = require("express")
const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cors());

const notes = []

app.post("/notes", (req, res)=>{
    const note = req.body.note;
    notes.push(note)
    res.json({
        message:"Done"
    })
})

app.get("/notes", (req, res)=>{
    res.json({
        notes
    })
})

app.get("/", (req, res)=>{
    res.sendFile("E:/harkirat_course/week_9/frontend/index.html")
})

app.listen(3000)