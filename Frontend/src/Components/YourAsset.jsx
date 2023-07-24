import React, { useEffect, useState } from "react";

const YourAsset = ({ State }) => {
  let [Files, setFiles] = useState([]);
  useEffect(() => {
    const LoadFiles = async () => {
      const File = await State.Contract.Display(State.Account);
      setFiles(File);
    };
    LoadFiles();
  }, [State.Account, State.Contract]);

  return (
    <div className="Scroll h-[100%]">
      {Files &&
        Files.map((File, index) => {
          return (
            <div
              key={index}
              className="flex justify-between w-[100%] border-b-2 border-b-white p-2 text-white"
            >
              <a
              className="text-blue-300"
                href={`https://gateway.pinata.cloud/ipfs/${File.substring(7)}`}
                target="_blank"
              >
                {`https://gateway.pinata.cloud/ipfs/${File.substring(7)}`}
              </a>
              <img
                src={`https://gateway.pinata.cloud/ipfs/${File.substring(7)}`}
                height={100}
                width={100}
                alt=""
              />
            </div>
          );
        })}
    </div>
  );
};

export default YourAsset;
