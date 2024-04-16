import express from "express"

import cors from "cors"
import mongoose from "mongoose"
import { Note } from "./note.js"

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDb"))
  .catch((err) => console.log(err))

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find()
    res.status(200).json({ message: "Fetched notes successfully", data: notes })
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error })
  }
})

app.post("/api/notes/add", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    })
    const savedNote = await newNote.save()
    res
      .status(200)
      .json({ message: "Note created successfully", data: savedNote })
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error })
  }
})

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 | Page not found")
})

app.listen(4000, () => {
  console.log("listening to port 4000")
})
