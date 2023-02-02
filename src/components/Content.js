import React, { useEffect, useState } from "react";
import PriorityCards from "./PriorityCards";
import { liveData, automatedData } from "../data/data";

const Content = () => {
  const [automated, setautomated] = useState(true);
  const [selectedCard, setSelectedCard] = useState("efnwhfwhn1");
  const [data, setData] = useState(liveData);
  const [priorityCard, setpriorityCard] = useState(automatedData);
  let labels = ["Incomming", "1", "2", "3", "4", "5"];

  const updateLabel = (e) => {
    let theCards = [];

    automated
      ? priorityCard.forEach((card) => {
          if (card.id == selectedCard) {
            theCards.push({
              ...card,
              priority: parseInt(e.target.value),
            });
          } else {
            theCards.push(card);
          }
        })
      : data.forEach((card) => {
          if (card.id == selectedCard) {
            theCards.push({
              ...card,
              priority: parseInt(e.target.value),
            });
          } else {
            theCards.push(card);
          }
        });
    automated ? setpriorityCard(theCards) : setData(theCards);
  };

  return (
    <div className="py-8">
      {/**top bar */}
      <div>
        <div className="flex">
          <div
            onClick={() => setautomated(true)}
            className={`w-36 bg-white text-red-600 border-gray-300 border-[1px]  items-center justify-center flex h-10 rounded-l-lg ${
              automated && `text-white bg-red-600`
            }`}
          >
            <h3>Automated</h3>
          </div>
          <div
            onClick={() => setautomated(false)}
            className={`w-36 items-center justify-center border-gray-300 border-[1px]  flex h-10 rounded-r-lg ${
              !automated && `text-white bg-red-600`
            } bg-white text-red-600`}
          >
            <h3>Live Attended</h3>
          </div>
        </div>
      </div>

      {/**emergencies */}
      <div className="py-8 flex gap-5 w-full overflow-x-scroll ">
        {automated
          ? labels.map((label) => (
              <PriorityCards
                priority={label}
                priorityCard={priorityCard}
                setpriorityCard={setpriorityCard}
                updateLabel={updateLabel}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            ))
          : labels.map((label) => (
              <PriorityCards
                priority={label}
                priorityCard={data}
                setpriorityCard={setData}
                updateLabel={updateLabel}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            ))}
      </div>
    </div>
  );
};

export default Content;
