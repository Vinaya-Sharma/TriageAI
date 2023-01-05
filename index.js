const Openai = require("openai");
require("dotenv").config();
const { Configuration, OpenAIApi } = Openai;
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const WebSocket = require("ws");

const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-qWLt4qao4xoLbDzljb8gA9m1",
  apiKey: process.env.OPENAIKEY,
});
const openai = new OpenAIApi(configuration);
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(cors());

//Include Google Speech to Text
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();
let toReturn;

//Configure Transcription Request
const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "en-GB",
  },
  interimResults: true, // If you want interim results, set this to true
};

wss.on("connection", function connection(ws) {
  console.log("New Connection Initiated");

  let recognizeStream = null;

  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected.`);
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        // Create Stream to the Google Speech to Text API
        recognizeStream = client
          .streamingRecognize(request)
          .on("error", console.error)
          .on("data", (data) => {
            console.log(data.results[0].alternatives[0].transcript);
            toReturn = data.results[0].alternatives[0].transcript;
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    event: "interim-transcription",
                    text: data.results[0].alternatives[0].transcript,
                  })
                );
              }
            });
          });
        break;
      case "media":
        // Write Media Packets to the recognize stream
        recognizeStream.write(msg.media.payload);
        break;
      case "stop":
        console.log(`Call Has Ended`);
        recognizeStream.destroy();
        ws.send("event: done");
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                event: "call-ended",
              })
            );
          }
        });
        break;
    }
  });
});

app.post("/", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
    <Response>
      <Start>
        <Stream url="wss://${req.headers.host}/"/>
      </Start>
      <Say>Thank you for calling 911. All operators are currently busy. I am an automated chatbot designed to assist with emergencies. Can you please provide your name, phone number, location, and the nature of the emergency?</Say>
      <Pause length="60" />
    </Response>
  `);
});

app.use(express.static("public"));

app.get("/", (req, res) => res.send(toReturn));
server.listen(8080);

app.post("/extractDetails", async (req, res) => {
  const { message } = req.body;
  console.log("backend message: ", message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `im going to write a made up emergency situation. extract the name of the person calling, the number they are calling from, what their emergency is and where they are located from the text.
    Text: ${message}. Provide response as a JSON object with keys of name, phone(format this as a phone number), description(choose from Medical Emergency, Car Accident, Water Safety Concern, House Fire, Building Fire, Being Followed, Shooting, Heart Attack, Serious Medical Emergency, Allergies), and location
    here is an example {
    "name": "Sophia",
    "phone": "592-663-5946",
    "description": "Being Followed",
    "location": "Salt Lake Beach, Toronto"
  }
    Array Answer:`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);

  if (response.data) {
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].text,
      });
    }
  } else {
    res.json({
      message: "no response",
    });
  }
});

app.listen(port, () => {
  console.log("listening at", port);
});
