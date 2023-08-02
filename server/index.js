const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const cors = require("cors");
const { v4: uuid } = require("uuid");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cors())

app.get("/tasks", (req, res) => {
  const filePath = path.join(__dirname,"public", "tasks.json");
  const tasksData = JSON.parse(fs.readFileSync(filePath));
  res.json(tasksData);
});

app.post("/tasks", (req, res) => {
  const filePath = path.join(__dirname, "public", "tasks.json");
  const tasksData = JSON.parse(fs.readFileSync(filePath));

  const newTask = req.body.task;
  newTask.id = uuid();
  tasksData.unshift(newTask);

  fs.writeFileSync(filePath, JSON.stringify(tasksData));
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const filePath = path.join(__dirname, "public", "tasks.json");
  const tasksData = JSON.parse(fs.readFileSync(filePath));

  const TaskId = req.params.id;
  const updatedTask = req.body.task;

  const index = tasksData.findIndex((t) => t.id === TaskId);
  if (index !== -1) {
    tasksData[index] = { ...tasksData[index], ...updatedTask };
    fs.writeFileSync(filePath, JSON.stringify(tasksData));
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: "Task not found" });
  }  
});

app.delete("/tasks/:id", (req, res) => {
  const filePath = path.join(__dirname, "public", "tasks.json");
  const tasksData = JSON.parse(fs.readFileSync(filePath));

    const TaskId = req.params.id;
    
    const index = tasksData.findIndex((t) => t.id === TaskId);
    if (index !== -1) {
        const deletedTask = tasksData.splice(index, 1)[0];
        fs.writeFileSync(filePath, JSON.stringify(tasksData));
      res.json(deletedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
