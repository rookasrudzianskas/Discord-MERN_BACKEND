// imports
import express from "express";
import cors from "cors";
import Pusher from "pusher";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9003;
// middlewares

app.use(express.json());
app.use(cors());

// db config

const mongoURI = 'mongodb+srv://admin:f9bdztDnqB1AojlZ@cluster0.mfuw3.mongodb.net/backend-discord?retryWrites=true&w=majority'
// api routes
app.get('/', (req, res) => res.status(200).send("Backend is working on 🚀"));

// listen

app.listen(port, () => console.log(`The app is listening on ${port}`));

// f9bdztDnqB1AojlZ