import React, { useEffect, useState } from "react";
import PriorityCards from "./PriorityCards";

const Content = () => {
  const [automated, setautomated] = useState(true);
  const [priorityCard, setpriorityCard] = useState([
    {
      name: "Jack Moscow",
      status: "open",
      number: "747-271-3827",
      emergency: "Crime in progress",
      priority: 0,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `efnjefnjfnwjnfj`,
    },
    {
      name: "Jack Moscow",
      status: "open",
      number: "747-271-3827",
      emergency: "Crime in progress",
      priority: 0,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `jewhdwhfnrwjgejbg`,
    },
    {
      name: "Jack Moscow",
      status: "open",
      number: "747-271-3827",
      emergency: "Crime in progress",
      priority: 1,
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `efnjewhdwhfnfewjfnjw`,
    },
    {
      name: "Jack Moscow",
      status: "open",
      priority: 1,
      number: "747-271-3827",
      emergency: "Crime in progress",
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `efnwhfwhn3jbfw`,
    },
    {
      name: "Jack Moscow",
      status: "open",
      priority: 2,
      number: "747-271-3827",
      emergency: "Crime in progress",
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `efnjehwfhwwjqjfhbwf`,
    },
    {
      name: "Jack Moscow",
      status: "open",
      priority: 3,
      number: "747-271-3827",
      emergency: "Crime in progress",
      transcript:
        "Lauren Ipsum is a placeholder text that is often used to fill in the content of a design or layout in order to focus on its visual elements. It is named after the character Lauren from the popular children's book Where the Wild Things Are. Lauren Ipsum is a variation on the classic Lorem Ipsum placeholder text, which has been used by printers and designers for centuries to fill in the content of a layout. Unlike Lorem Ipsum, which is a garbled version of Latin text, Lauren Ipsum is made up of completely invented words and phrases that are intended to be nonsensical and meaningless. Despite its nonsensical nature, Lauren Ipsum can be useful in a variety of contexts. It is often used by designers and developers to fill in the content of a layout in order to focus on its visual elements, such as typography, layout, and color. It is also used by writers and editors as a way to generate filler content that can be used to fill in gaps in a document or article.",
      location: "379 Backster Street Brampton ON",
      id: `jfejewjfbwhb`,
    },
  ]);

  useEffect(() => {
    setpriorityCard((prev) => prev);
  }, [priorityCard]);

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
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="Incomming"
        />
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="1"
        />
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="2"
        />
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="3"
        />
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="4"
        />
        <PriorityCards
          priorityCard={priorityCard}
          setpriorityCard={setpriorityCard}
          priority="5"
        />
      </div>
    </div>
  );
};

export default Content;
