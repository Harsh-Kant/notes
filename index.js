const express = require("express")
const cors = require("cors");
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(cors());

const notes = []
const users = [{
    username: "harsh",
    password: "1234"
},{
    username:"kant",
    password:"4321"
}];

app.post("/signup", (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const userExists = users.find(user=>user.username===username);
    if(userExists){
        return res.status(403).json({
            message: "User with this username already exists"
        })
    }
    users.push({
        username: username, password: password
    })
    res.json({
        message: "You have signed in!"
    })
})

app.post("/signin", (req, res)=>{
    console.log(req.body);
    const username = req.body.username
    const password = req.body.password
    const userExists = users.find(user => user.username===username && user.password === password)
    if(!userExists){
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return
    }

    const token = jwt.sign({
        username: username
    }, "harsh1234")
    res.json({
        token: token
    })
})

app.post("/notes", (req, res)=>{
    const token = req.headers.token;
    if(!token){
        res.status(403).json({
            message: "You are not loggen in!"
        })
        return;
    }
    const decoded = jwt.verify(token, "harsh1234");
    const username = decoded.username;

    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }

    const note = req.body.note;
    notes.push({note, username});
    res.json({
        message:"Done"
    })
})

app.get("/notes", (req, res)=>{
    const token = req.headers.token;
    if(!token){
        res.status(403).json({
            message: "You are not loggen in!"
        })
        return;
    }
    const decoded = jwt.verify(token, "harsh1234");
    const username = decoded.username;

    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }

    const userNotes = notes.filter(note=>note.username===username);

    res.json({
        notes: userNotes
    })
})

app.get("/", (req, res)=>{
    res.sendFile("E:/harkirat_course/week_9/frontend/index.html")
})

app.get("/signup", (req, res)=>{
    res.sendFile("E:/harkirat_course/week_9/frontend/signup.html")
})

app.get("/signin", (req, res)=>{
    res.sendFile("E:/harkirat_course/week_9/frontend/signin.html")
})

app.listen(3000)