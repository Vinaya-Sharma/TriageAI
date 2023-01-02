import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import MidHeader from "../components/MidHeader";

const Main = () => {
  return (
    <div className="w-4/5 h-full ">
      <Header />
      <MidHeader />
      <div className="w-full h-[1px] bg-myGrey" />
      <Content />
    </div>
  );
};

export default Main;
