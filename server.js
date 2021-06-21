// imports
import express from "express";
import cors from "cors";
import Pusher from "pusher";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9003;
// middlewares


// db config


// api routes
app.get('/', (req, res) => res.status(200).send("Backend is working on 🚀"));

// listen

app.listen(port, () => console.log(`The app is listening on ${port}`));