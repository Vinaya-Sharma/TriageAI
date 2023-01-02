import React from "react";

const MidHeader = () => {
  return (
    <div className="w-full justify-between flex">
      <div className=" md:flex px-2 py-4">
        <h2 className="text-xl mr-10 w-96 font-bold ">Incoming Emergencies</h2>
        <div className="h-7 text-sm items-center flex w-full justify-between text-myGrey font-bold">
          <h3 className="text-red-600">Emergencies</h3>
          <h3>Scheduling</h3>
          <h3>Progress</h3>
          <h3>Forms</h3>
          <h3>More</h3>
        </div>
      </div>
      <div className="lg:opacity-100 opacity-0 w-full ml-4 relative">
        <img
          className="absolute top-3 left-6 w-8 h-8 object-cover rounded-full"
          src="https://www.canberratimes.com.au/images/transform/v1/crop/frm/silverstone-ct-migration/75ccaf32-220f-42c5-8a8e-80ee26fb25ad/r0_0_4256_2832_w1200_h678_fmax.jpg"
        />
        <img
          className="absolute top-3 left-12 w-8 h-8 object-cover rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE-6u_IQ_vtTjrG3l9uEHqF4KzVArOjIWPWA0SM8-ZuunuXjwTyaD5uIjxqsuytj8Ufj8&usqp=CAU"
        />
        <img
          className="absolute top-3 left-[4.5rem] w-8 h-8 object-cover rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0S2kZGgmAnbD4F-MAiXaYqnsuuHfip4qiMrSH5-fL-OdI_jy9JEpJX7P4MBDFMIEoQTc&usqp=CAU"
        />
        <img
          className="absolute top-3 left-24 w-8  h-8 object-cover rounded-full"
          src="https://www.canberratimes.com.au/images/transform/v1/crop/frm/130009714/17727cf1-8dd5-45a1-90a0-e67e074c54c5.jpg/r361_370_3453_2268_w1200_h678_fmax.jpg"
        />
      </div>
    </div>
  );
};

export default MidHeader;
