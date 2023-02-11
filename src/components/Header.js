import React, { useState } from "react";

const Header = () => {
  const [tasks, settasks] = useState([
    "Dashboard",
    "My Tasks",
    "Schedule",
    "Reporting",
    "Goals",
  ]);

  return (
    <div className="w-full p-2  ">
      <div className="mb-4 pt-1 flex gap-5 ">
        <div className="w-60 h-8 rounded-lg bg-white p-1 flex items-center gap-4">
          <input
            placeholder="Search Emergencies"
            className="outline-none text-sm font-semibold text-myGrey "
          ></input>
        </div>
        <div className="flex gap-5 w-full items-center">
          {tasks.map((task) => (
            <div key={task}>
              <h4>
                <h5
                  className={`${
                    task != "Dashboard" && "text-myGrey"
                  } text-sm font-bold`}
                >
                  {task}
                </h5>
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-myGrey" />
    </div>
  );
};

export default Header;
