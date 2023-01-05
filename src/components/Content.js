import React, { useEffect, useState } from "react";
import PriorityCards from "./PriorityCards";

const Content = () => {
  const [automated, setautomated] = useState(true);

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
        <PriorityCards priority="Incomming" />
        <PriorityCards priority="1" />
        <PriorityCards priority="2" />
        <PriorityCards priority="3" />
        <PriorityCards priority="4" />
        <PriorityCards priority="5" />
      </div>
    </div>
  );
};

export default Content;
