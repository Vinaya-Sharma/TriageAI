//importing libraries
const cors = require("cors");
const express = require("express");
const session = require("express-session");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const twilio = require("twilio");
const bodyParser = require("body-parser");

//initializing app + defining port
const app = express();
const port = 3001;

//connecting middlewear
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "dispatchBot",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

const server = app.listen(port, () => {
  console.log(`AI friend app listening on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// configuring open ai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// defining the global variables that will be utilized in various routes
let convo;
let count;
let hangUp;
let redo;
let emergency;
let callerName;
let location;
let number;
let id;

// transcribe endpoints handles twilio calls (initializes call, and calls /respond enpoint for responce)
app.post("/transcribe", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  if (!req.session.init) {
    twiml.say(
      { voice: "Polly.Joanna-Neural" },
      "9 1 1, what is your emergency?"
    );

    convo += "Dispatcher: 911, what is your emergency?";
    id = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
    req.session.init = true;
    hangUp = false;
    redo = [0, 0, 0];
    count = 1;
    convo = "";
    emergency = "undefined";
    callerName = "undefined";
    location = "undefined";
    number = "undefined";
  }

  // Listen for user input and pass it to the /respond endpoint
  twiml.gather({
    enhanced: "false",
    speechTimeout: "auto",
    speechModel: "phone_call",
    input: "speech",
    action: `/respond`,
  });

  //  Returning the TwiML response
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

// respond endpoint handles responce generation and call termination
app.post("/respond", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const voiceInput = req.body.SpeechResult;
  convo += `\nCaller: ${voiceInput}\nDispatcher: `;

  let aiResponse = await generateAIResponse(req);
  twiml.say({ voice: "Polly.Joanna-Neural" }, aiResponse);

  if (hangUp) {
    twiml.hangup();
    emergency = req.session.emergency;
    callerName = req.session.name;
    location = req.session.location;
    number = req.session.number;
    console.log("post hangup 2");

    req.session.emergency = null;
    req.session.name = null;
    req.session.location = null;
    req.session.number = null;
    req.session.init = null;
  }

  io.emit("call progress event", {
    inProgress: hangUp ? false : true,
    emergency: emergency,
    name: callerName,
    location: location,
    number: number,
    transcript: convo,
    id: id,
  });

  twiml.redirect({ method: "POST" }, `/transcribe`);
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

// generateAIResponce generates the next dispatcher line
async function generateAIResponse(req) {
  console.log(convo);
  if (!req.session.emergency) {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `pretend you are a 911 dispatch officer, here is an emergency: ${convo} 
            extract the nature of this emergency in less than 5 key words: `,
      temperature: 0.9,
      max_tokens: 2048,
    });

    const emergencyresp = response.data.choices[0].text.trim();
    req.session.emergency = emergencyresp;
    emergency = emergencyresp;

    const botResponce = "Okay, stay calm. Can you tell me your location?";
    convo += botResponce;
    return botResponce;
  }

  if (!req.session.location) {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `pretend you are a 911 dispatch officer, here is a message: ${convo.toLowerCase()} 
            extract the location and format this as an address or location. return "undefined" if the caller does not give a location, or the location/address if one is provided. location: `,
      temperature: 0.9,
      max_tokens: 2048,
    });

    const locationresp = response.data.choices[0].text.trim();
    console.log(locationresp);

    if (locationresp == "undefined" && redo[0] < 1) {
      console.log("no location given");
      const botResponce =
        "Okay, stay calm. tell me your location or where you remember being last?";
      convo += botResponce;
      redo[0] += 1;
      return botResponce;
    }

    req.session.location = locationresp;
    location = locationresp;

    const botResponce = "Okay, can I get your full name";
    convo += botResponce;
    return botResponce;
  }
  if (!req.session.name) {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `pretend you are a 911 dispatch officer, here is a message: ${convo.toLowerCase()} 
            extract the callers name or return "undefined" if the caller does not give one. name: `,
      temperature: 0.9,
      max_tokens: 2048,
    });

    const nameresp = response.data.choices[0].text.trim();

    if (nameresp == "undefined" && redo[1] < 1) {
      console.log("no name given");
      const botResponce =
        "I need you to remain calm, we will get help to you as soon as possible. Can I get your name again?";
      convo += botResponce;
      redo[1] += 1;
      return botResponce;
    }

    req.session.name = nameresp;
    callerName = nameresp;

    const botResponce =
      "and whats your phone number just in case we are disconnected";
    convo += botResponce;
    return botResponce;
  }
  if (!req.session.number) {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `pretend you are a 911 dispatch officer, here is a message: ${convo.toLowerCase()} 
            extract the callers phone number or return "undefined" if one is not provided. extract your answer straight from the message,
             if no number is provided just return "undefined". phone number: `,
      temperature: 0.9,
      max_tokens: 2048,
    });

    const numberresp = response.data.choices[0].text.trim();

    if (numberresp == "undefined" && redo[2] < 1) {
      console.log("no number given");
      const botResponce =
        "Don't worry I will get help to you as soon as possible, but I need a phone number?";
      convo += botResponce;
      redo[2] += 1;
      return botResponce;
    }

    req.session.number = numberresp;
    number = numberresp;
  }

  req.session.prompt = `you are an automated ai dispatch officer talking to a human. 
    Here is the past conversation -> ${convo}. 
    Your job is to create a report for this emergency and then a 911 dispatcher will get in touch with the caller.
    Extact more key details and provide help.
    Remember you are playing the role of a dispatch officer.
    Help the caller by giving them more information and tell them what they can do right now.
    Write the next dispatcher line.
        `;

  if (count == 2) {
    req.session.prompt += `
            Ask more detailed questions and provide the caller help in this situation. do not repeat past lines. 
            Dispatcher:\n`;
  } else if (count == 3 || count > 3) {
    req.session.prompt += `
            End the call now being saying "Dont worry, help is on the way. I'm going to end the call to coordinate dispatch efforts" and tell them "but you should hear back from 9-1-1 officers" really soon. 
            Dispatcher:\n`;
    hangUp = true;
  } else {
    req.session.prompt +=
      "Specifically get any more details that you think a dispatcher would need in this situation and tell the caller what they can do right now to stay safe until help arrives, dont repeat anything already mentioned. Dispatcher: \n";
  }

  let botResponce = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.session.prompt,
    temperature: 0.9,
    max_tokens: 2048,
  });

  if (botResponce.data.choices[0].text == "") {
    return "Thank you for providing all of this information. I will have a 9-1-1 dispatch officer get in contact with you as soon as possibl.";
  } else {
    console.log("adding response");
    let toreturn = botResponce.data.choices[0].text;
    convo += toreturn.trim();
    count += 1;
    return toreturn;
  }
}
