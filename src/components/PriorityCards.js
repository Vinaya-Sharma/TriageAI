import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdCall } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import io from "socket.io-client";
import fetch from "node-fetch";
// require("dotenv").config();

const PriorityCards = ({
  priority,
  priorityCard,
  setpriorityCard,
  updateLabel,
  selectedCard,
  setSelectedCard,
}) => {
  const webSocketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [showMap, setshowMap] = useState(false);
  const [selectedCaller, setSelectedCaller] = useState(0);

  let theTranscript = "";
  let newId = "wqfwkgeghe45321";
  let open = false;
  let newEmergency = {
    name: "undefined",
    number: "",
    emergency: "",
    location: "",
    id: null,
    status: "open",
    transcript: "",
    priority: 0,
  };
  let newIndex;
  let thisTranscript = "";

  // setting up webserver connection
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  // setting up hugging face api
  // let api_token = process.env.HFToken;
  let api_token = "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";
  let API_URL =
    "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

  async function query(data) {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${api_token}` },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }

  // handling an emergency call
  socket.on("call progress event", async function (call) {
    console.log(call);
    let thecards = [...priorityCard];
    let newCard = {
      inProgress: call.inProgress,
      name: call.name,
      number: call.number,
      emergency: call.emergency,
      location: call.location,
      id: call.id,
      status: "open",
      transcript: call.transcript,
      priority: 0,
    };

    //once call is complete - check if there is a similar emergency already reported
    if (!newCard.inProgress && !newCard.simUpdate) {
      //run the api call to the SBERT model
      const data = await query({
        inputs: {
          source_sentence: newCard.transcript,
          sentences: priorityCard.map((card) => card[0].transcript),
        },
      });

      let max = Math.max(...data);
      let emerIndex = data.indexOf(max);

      newCard = {
        ...newCard,
        similarity: data,
        simUpdate: true,
      };

      if (max > 0.75) {
        thecards[emerIndex].push(newCard);
      } else {
        let duplicate = thecards.findIndex((card) => card[1].id == call.id);
        if (duplicate == -1) {
          thecards.push([newCard]);
        } else {
          thecards[duplicate][1] = newCard;
        }
      }

      setpriorityCard(thecards);

      console.log(
        "the data returned from api + updated card:",
        data,
        priorityCard
      );
      console.log("the new call, ", newCard);
    }
  });

  const MyMap = () => {
    return (
      <MapContainer
        center={[43.6534817, -79.38393473]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  };

  // setting up javascript speech recongnition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  function updateCard(newValues, text) {
    console.log("2", text);
    console.log("updating");
    let cards = [...priorityCard];

    let duplicate = cards.findIndex((card) => card[0].transcript == text);
    if (duplicate == -1) {
      cards.push([
        {
          name: newValues.name,
          number: newValues.phone,
          emergency: newValues.description,
          location: newValues.location,
          id: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100),
          status: "open",
          transcript: text,
          priority: 0,
        },
      ]);
      newId = "ebfqhwb327379";
      open = false;
      newEmergency = {
        name: "undefined",
        number: "",
        emergency: "",
        location: "",
        id: null,
        status: "open",
        transcript: "",
        priority: 0,
      };
    } else {
      console.log("same text");
    }
    setpriorityCard(cards);
    console.log(cards);
  }

  async function handleSubmit(text) {
    fetch("http://localhost:3001/extractDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("1", text);
        try {
          const newdata = JSON.parse(data.message);
          console.log(newdata);
          setResponse(newdata);
          console.log(newdata);
          updateCard(newdata, text);
        } catch (error) {
          console.error(error);
        }
      });
  }

  const handleVoiceToText = (e) => {
    e.preventDefault();
    recognition.start();
  };

  recognition.onresult = function (event) {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    setMessage(text);
    console.log(text);
    theTranscript = text;
    handleSubmit(text);
  };

  useEffect(() => {
    setpriorityCard((prev) => prev);
  }, [
    handleSubmit,
    handleVoiceToText,
    priorityCard,
    updateCard,
    setpriorityCard,
    updateLabel,
  ]);

  function addNewLines(text) {
    let result = [];
    result = text.split("\n");
    console.log(result);
    return result;
  }

  return (
    <div>
      <h3
        onClick={handleVoiceToText}
        className={`${
          priority == "Incomming" && "underline underline-offset-2 font-bold"
        } mb-8 min-w-[200px]  text-sm`}
      >
        {priority == "Incomming"
          ? "Assign Priority - Incomming"
          : `Level ${priority} Priority `}
      </h3>

      {priorityCard.map((cardGround) => {
        let card = cardGround[selectedCaller];
        if (
          priority == card?.priority ||
          (priority == "Incomming" && card?.priority == 0)
        ) {
          return card.id == selectedCard ? (
            <div
              key={card.id}
              className="relative mb-4 text-xs p-4 bg-white min-w-[600px] max-w-[900px] w-full border-[1px] border-myGrey rounded-lg min-w-88 min-h-64 "
            >
              <AiFillCloseCircle
                onClick={() => {
                  setSelectedCard(false);
                }}
                className="text-lg absolute top-2 right-2"
              />
              <div className="flex  gap-2 items-center">
                <select
                  onChange={(e) => {
                    let theIndex = cardGround.findIndex(
                      (person) => person.name == e.target.value
                    );
                    console.log("name selected", theIndex);
                    setSelectedCaller(theIndex);
                  }}
                  className="font-bold text-[15px] outline-none py-2"
                >
                  {cardGround.map((calls) => (
                    <option value={calls.name}>{calls.name}</option>
                  ))}
                </select>
                <MdCall onClick={handleVoiceToText} className="w-4 h-4" />
              </div>
              <div className="ml-1 text-xs">
                {/**first section */}
                <div className="flex text-myGrey gap-5">
                  <h3 className=" text-sm">Priority</h3>
                  <select
                    value={card.priority}
                    placeholder="select priority level"
                    onChange={updateLabel}
                    className="w-auto flex items-center justify-center rounded-full font-bold text-purple-500 bg-purple-100 py-1 px-2  "
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div className="flex items-center py-2 text-myGrey gap-5">
                  <h3 className=" text-sm">Number</h3>
                  <h3 className="w-auto flex items-center justify-center rounded-full font-bold text-orange-500 bg-orange-100 py-1 px-2  ">
                    {card.number}
                  </h3>
                  <h3 className=" text-sm">Status</h3>
                  <h3 className="w-auto flex items-center justify-center rounded-full font-bold text-pink-500 bg-pink-100  py-1 px-2 ">
                    {card.status}
                  </h3>
                  <h3 className=" text-sm">Emergency</h3>
                  <h3 className="w-auto flex items-center self-center text-center justify-center rounded-full font-bold text-green-500 bg-green-100  py-1 px-2 ">
                    {card.emergency}
                  </h3>
                </div>
                {/* )} */}
                {/**second section */}
                <div className=" items-center py-2 text-myGrey gap-5">
                  <h3 className="font-bold underline text-sm">Transcript:</h3>
                  <h3 className=" text-sm">
                    {addNewLines(card.transcript).map((item) => {
                      if (item.includes("Dispatcher: ")) {
                        let todisplay = item.split("Dispatcher: ");
                        return (
                          <h3>
                            <span className="font-bold">Dispatcher: </span>
                            {todisplay}
                          </h3>
                        );
                      } else if (item.includes("Caller: ")) {
                        let todisplay = item.split("Caller: ");
                        return (
                          <h3>
                            <span className="font-bold">Caller: </span>
                            {todisplay}
                          </h3>
                        );
                      }
                    })}
                  </h3>
                </div>
                {/**third section */}
                <div className="flex py-1 items-center text-myGrey gap-5">
                  <h3 className=" text-sm">Location</h3>
                  <h3 className="w-auto flex items-center text-center self-center justify-center rounded-full font-bold text-blue-500 bg-blue-100  py-1 px-2 ">
                    {card.location}
                  </h3>
                  <h3
                    className="hover:text-blue-600 cursor-pointer underline"
                    onClick={() => setshowMap(true)}
                  >
                    Get Location
                  </h3>
                </div>
                {/**map */}
                <div className="w-64 h-64">{MyMap()}</div>
                <h3 className="w-48 mt-2 border-[1px] border-red-500 cursor-pointer flex items-center text-center self-center justify-center rounded-full font-bold text-red-500 bg-red-100 text-sm  py-1 px-2 ">
                  Schedule Dispatch
                </h3>
              </div>
            </div>
          ) : (
            //Closed card
            <div
              key={card.id}
              onClick={() => {
                setSelectedCard(card.id);
              }}
              className="mb-4 relative text-xs p-4 bg-white min-w-[400px] max-w-[900px] w-full border-[1px] border-myGrey rounded-lg min-w-88 min-h-64 "
            >
              {cardGround.length > 1 && (
                <div className="rounded-full w-6 h-6 border-1 items-center flex justify-center font-bold border-purple-500 bg-purple-200 absolute top-2 right-2">
                  {cardGround.length}
                </div>
              )}
              <h3 className="font-bold py-2 min-w-[400px] text-sm ">
                {card.name}
              </h3>
              <div className="text-xs">
                {/**first section */}
                <div className="flex text-myGrey items-center mt-2 gap-5">
                  <h3 className=" text-sm">Number</h3>
                  <h3 className="w-auto flex items-center justify-center rounded-full font-bold text-orange-500 bg-orange-100 py-1 px-2  ">
                    {card.number}
                  </h3>
                </div>

                {/**second section */}
                <div className="flex items-center py-2 text-myGrey gap-5">
                  <h3 className=" text-sm">Status</h3>
                  <h3 className="w-auto flex items-center justify-center rounded-full font-bold text-pink-500 bg-pink-100  py-1 px-2 ">
                    {card.status}
                  </h3>
                  <h3 className=" text-sm">Emergency</h3>
                  <h3 className="w-auto flex items-center self-center text-center justify-center rounded-full font-bold text-green-500 bg-green-100  py-1 px-2 ">
                    {card.emergency}
                  </h3>
                </div>

                {/**third section */}
                <div className="flex items-center text-myGrey gap-5">
                  <h3 className=" text-sm">Location</h3>
                  <h3 className="w-auto flex items-center text-center self-center justify-center rounded-full font-bold text-blue-500 bg-blue-100  py-1 px-2 ">
                    {card.location}
                  </h3>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PriorityCards;
