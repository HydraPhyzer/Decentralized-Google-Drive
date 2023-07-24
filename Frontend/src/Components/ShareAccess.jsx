import React, { useEffect, useState } from "react";

const ShareAccess = ({ State }) => {
  let [Accessors, setAccessors] = useState([]);
  let [Text, setText] = useState("");

  let GetListOfAccessors = async () => {
    try {
      let List = await State.Contract.ShareAccess();
      setAccessors(List);
    } catch (err) {
      alert("Error in Fetching Accessors");
    }
  };
  let Allow = async () => {
    try {
      Text && (await State.Contract.Allow(Text));
      await GetListOfAccessors();
    } catch (Err) {
      alert("Error in Allowing Access");
    }
  };
  let DisAllow = async () => {
    try {
      Text && (await State.Contract.DisAllow(Text));
      await GetListOfAccessors();
    } catch (Err) {
      alert("Error in DisAllowing Access");
    }
  };
  useEffect(() => {
    GetListOfAccessors();
  }, [State.Account && State.Contract,Allow,DisAllow]);

  return (
    <div>
      <div className="w-[70%] h-[100%] flex justify-center items-center mx-auto flex-col gap-2">
        <section className="flex w-[100%] text-white gap-2 h-[70%]">
          <div className="cursor-pointer w-[60%] bg-red-500 p-2 flex justify-center items-center shadow-2xl rounded-lg flex-col gap-5">
            <input
              type="text"
              className="w-[100%] outline-none p-2 rounded-md text-black"
              onChange={(E) => {
                setText(E.target.value);
              }}
            />
            <section className="flex gap-5 w-[100%]">
              <button
                className="w-[100%] bg-[#2ecc71] text-white rounded-lg p-2"
                onClick={Allow}
              >
                Share
              </button>
              <button
                className="w-[100%] bg-red-400 text-white rounded-lg p-2"
                onClick={DisAllow}
              >
                Revoke
              </button>
            </section>
          </div>
          <div className="w-[90%] bg-red-500 p-2 rounded-lg shadow-2xl Scroll">
            {Accessors.length > 0 ? (
              Accessors.map((Accessor, index) => {
                return (
                  <div className="m-2 flex justify-between" key={index}>
                    <p>{Accessor?.User}</p>
                    <p>
                      {Accessor?.Allow == true ? (
                        <span className="text-green-300">True</span>
                      ) : (
                        <span className="text-black">False</span>
                      )}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="m-2 ">No Accessors</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShareAccess;
