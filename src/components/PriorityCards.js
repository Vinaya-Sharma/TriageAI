import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdCall } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

const PriorityCards = ({ priority }) => {
  const webSocketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [showMap, setshowMap] = useState(false);
  const [selectedCard, setSelectedCard] = useState("efnwhfwhn1");
  const [priorityCard, setpriorityCard] = useState([
    {
      name: "Jack Moscow",
      status: "open",
      number: "747-271-3827",
      emergency: "Crime in progress",
      priority: 1,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `efnjefnjfnwjnfj`,
    },
    {
      name: "Sophia Gin",
      status: "open",
      number: "647-341-5698",
      emergency: "Active Shooting",
      priority: 1,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `vghvghvgh`,
    },
    {
      name: "Carl Witaker",
      status: "open",
      number: "447-191-8009",
      emergency: "Fight",
      priority: 2,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `juhuihiojij`,
    },
  ]);

  useEffect(() => {
    setpriorityCard(priorityCard);
  }, [priorityCard]);

  useEffect(() => {
    setpriorityCard((prev) => prev);
  }, [priorityCard, setpriorityCard]);

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
  // useEffect(() => {
  //   webSocketRef.current = new WebSocket("ws://localhost:8080");
  //   webSocketRef.current.onmessage = (msg) => {
  //     const data = JSON.parse(msg.data);
  //     console.log(`id updated ${newId}`);
  //     if (data.event === "interim-transcription") {
  //       thisTranscript = data.text;
  //     } else if (data.event === "call-ended") {
  //       console.log("open to new card");
  //       if (priorityCard.length > 0) {
  //         handleSubmit(thisTranscript);
  //       } else {
  //         console.log("not found");
  //       }
  //     }
  //   };
  // }, []);

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

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  function updateCard(newValues, text) {
    console.log("2", text);
    console.log("updating");
    let cards = [...priorityCard];

    let duplicate = cards.findIndex((card) => card.transcript == text);
    if (duplicate == -1) {
      cards.push({
        name: newValues[0],
        number: newValues[1],
        emergency: newValues[2],
        location: newValues[3],
        id: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100),
        status: "open",
        transcript: text,
        priority: 0,
      });
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
        setResponse(JSON.parse(data.message));
        console.log(data.message);
        updateCard(JSON.parse(data.message), text);
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

  const updateLabel = (e) => {
    let theCards = [];

    priorityCard.forEach((card) => {
      if (card.id == selectedCard) {
        theCards.push({
          ...card,
          priority: parseInt(e.target.value),
        });
      } else {
        theCards.push(card);
      }
    });

    console.log(theCards);
    setpriorityCard(theCards);
  };

  useEffect(() => {
    setpriorityCard((prev) => prev);
    console.log("tryung");
  }, [
    handleSubmit,
    handleVoiceToText,
    priorityCard,
    updateCard,
    setpriorityCard,
    updateLabel,
  ]);

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

      {priorityCard.map((card) => {
        if (
          priority == card.priority ||
          (priority == "Incomming" && card.priority == 0)
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
              <div className="flex gap-2 items-center">
                <h3 className="font-bold text-sm py-2">{card.name}</h3>
                <MdCall onClick={handleVoiceToText} className="w-4 h-4" />
              </div>
              <div className="text-xs">
                {/**first section */}
                <div className="flex text-myGrey gap-5">
                  <h3 className=" text-sm">Priority</h3>
                  <select
                    value={priority == "Incomming" ? undefined : card.priority}
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
                    {response[1]}
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
                {/**second section */}
                <div className=" items-center py-2 text-myGrey gap-5">
                  <h3 className="font-bold text-sm">Transcript:</h3>
                  <h3 className=" text-sm">{card.transcript}</h3>
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
            <div
              key={card.id}
              onClick={() => {
                setSelectedCard(card.id);
              }}
              className="mb-4 text-xs p-4 bg-white min-w-[400px] max-w-[900px] w-full border-[1px] border-myGrey rounded-lg min-w-88 min-h-64 "
            >
              <h3 className="font-bold py-2 min-w-[400px]  text-sm ">
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
