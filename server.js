// imports
import express from "express";
import cors from "cors";
import Pusher from "pusher";
import mongoose from "mongoose";
import mongoData from "./mongoData.js";

// app config
const app = express();
const port = process.env.PORT || 9003;

const pusher = new Pusher({
    appId: "1222860",
    key: "eb7cd7f1e1f39229a9e3",
    secret: "914d793ac06f313ce531",
    cluster: "eu",
    useTLS: true
});

// middlewares

app.use(express.json());
app.use(cors());

// db config

const mongoURI = 'mongodb+srv://admin:f9bdztDnqB1AojlZ@cluster0.mfuw3.mongodb.net/backend-discord?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log("DB is working on");
})


// api routes
app.get('/', (req, res) => res.status(200).send("Backend is working on 🚀"));

app.post('/new/channel', (req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/get/channelList', (req, res) => {
    mongoData.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            let channels = [];

            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName,
                }
                channels.push(channelInfo);
            })

            res.status(200).send(channels);
        }
    })
})

app.post('/new/message', (req, res) => {
    const id = req.query.id;
    const newMessage = req.body;

    // updates the db
    mongoData.update(
        // this is the conversation, where I want to add the conversation
        {_id: req.query.id},
        // and we inject the message here
        {$push: {conversation: req.body } },
        (err, data) => {
            if(err) {
                console.log("error saving the message");
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        }
    )
})

app.get('/get/data', (req, res) => {
    const id = req.query.id;

    mongoData.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get("/get/conversation", (req, res) => {
    const id = req.query.id;
    mongoData.find({ _id: id }, (err, data) => {
        if (err) {
            // if error then we send internal server error
            res.status(500).send(err);
        } else {
            // send data that we just added in the DB
            res.status(200).send(data);
        }
    });
});


// listen

app.listen(port, () => console.log(`The app is listening on ${port}`));

// f9bdztDnqB1AojlZ