import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdCall } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

const PriorityCards = ({ priority, priorityCard, setpriorityCard }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [showMap, setshowMap] = useState(false);
  const [selectedCard, setSelectedCard] = useState("efnwhfwhn1");

  // const getCoordinatesFromLocation = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?q=Toronto&format=json`
  //     );
  //     const { lat, lon } = response.data[0];
  //     console.log(lat, lon);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  let theTranscript = "";
  function updateCard(newValues, text) {
    console.log("2", theTranscript);
    console.log("updating");
    let cards = [];
    for (let index = 0; index < priorityCard.length; index++) {
      const card = priorityCard[index];
      if (card["id"] == selectedCard) {
        let newCard = {
          name: newValues[0],
          number: newValues[1],
          emergency: newValues[2],
          location: newValues[3],
          id: selectedCard,
          status: "open",
          transcript: theTranscript,
          priority: priority == "Incomming" ? 0 : priority,
        };
        cards.push(newCard);
      } else {
        cards.push(card);
      }
    }
    setpriorityCard(cards);
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
        console.log("1", theTranscript);
        setResponse(JSON.parse(data.message));
        updateCard(JSON.parse(data.message, text));
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

  return (
    <div>
      <h3
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
                    onChange={(e) => {
                      const index = priorityCard.findIndex(
                        (card) => card.id === selectedCard
                      );

                      setpriorityCard([
                        ...priorityCard.slice(0, index),
                        {
                          ...card,
                          priority: parseInt(e.target.value),
                        },
                        ...priorityCard.slice(index + 1),
                      ]);
                      console.log(priorityCard);
                    }}
                    className="w-auto flex items-center justify-center rounded-full font-bold text-purple-500 bg-purple-100 py-1 px-2  "
                  >
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
