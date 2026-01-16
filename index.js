const express = require("express")

const app = express()

app.use(express.json());
let tasks = []

app.get("/", (req, res) => {
  res.send("Task Manager API is running.............");
});

app.get('/api/tasks', (req,res)=>{
    res.json({
        success: true,
        data: tasks
    })
})

app.post('/api/tasks', (req,res) => {
    const title = req.body

    if (!title) {
        return res.status(400).json({
            success: true,
            data: "title is required"
        })
    }

    const  newTask = {
        id: Date.now(),
        title,
        completed: false,
    }

    tasks.push(newTask)

    res.status(200).json({
        success: true,
        data: tasks
    })
})







app.listen(5000, () => {
    console.log(" app is runnig on port 5000")
})