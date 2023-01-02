import React, { useState } from "react";

const Sidebar = () => {
  const [dashboards, setdashboards] = useState([
    { name: "Inbox", number: "5" },
    { name: "Files", number: "3" },
    { name: "Boards", number: "4" },
    { name: "Updates", number: "17" },
    { name: "Analytics", number: "2" },
    { name: "Projects", number: "34" },
    { name: "Settings", number: "2" },
  ]);

  const [projects, setprojects] = useState([
    { name: "Calendar", number: "5" },
    { name: "Routing", number: "6" },
    { name: "Support", number: "2" },
    { name: "Resources", number: "10" },
    { name: "Information", number: "2" },
    { name: "Status", number: "1" },
  ]);
  return (
    <div className="w-1/5 h-full">
      {/**dashboard text */}
      <div>
        <h2 className="my-4 text-lg font-bold">Dashboard</h2>
        <div className="w-full h-[1px] bg-myGrey" />
      </div>
      {/**dispatch officer info */}
      <div className="my-4 text-sm gap-3 items-center flex">
        <img
          className="w-8 h-8 rounded-full"
          src="https://southsound911.org/wp-content/uploads/2022/04/53SouthSound911Employees-scaled-e1650639334929-1024x809.jpeg"
        />
        <div>
          <h5 className="font-bold">Horan Greenburg</h5>
          <h5 className="text-myGrey">Dispatch Officer</h5>
        </div>
      </div>
      {/**dashboards */}
      <div className="w-full h-[1px] bg-myGrey" />
      <div className="py-4">
        <h5 className="text-myGrey text-xs font-bold mb-2">DASHBOARDS</h5>
        {/**all dashboards */}
        {dashboards.map((dashboard) => (
          <div className="flex p-2 items-center text-sm justify-between ">
            <h5 className="font-bold">{dashboard.name}</h5>
            <h5 className="bg-[#F63B3B] font-bold text-[#E40808] rounded-full flex items-center justify-center content-center w-6 h-6 bg-opacity-30 ">
              {dashboard.number}
            </h5>
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-myGrey" />
      {/**Projects */}
      <div>
        <div className="py-4">
          <h5 className="text-gray-500 text-sm font-bold mb-2">Projects</h5>
          {/**all dashboards */}
          {projects.map((projects) => (
            <div className="flex p-2 items-center text-sm justify-between ">
              <h5 className="font-bold">{projects.name}</h5>
              <h5 className="bg-[#F63B3B] font-bold text-[#E40808] rounded-full flex items-center justify-center content-center w-6 h-6 bg-opacity-30 ">
                {projects.number}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
