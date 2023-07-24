import React, { useState } from "react";
import FormData from "form-data";
import Axios from "axios";

const FileUpload = ({ State }) => {
  let [File, setFile] = useState(null);
  let [FileURL, setFileURL] = useState(null);

  let Upload = async () => {
    try {
      let FrmData = new FormData();
      FrmData.append("file", File);
      const Res = await Axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: FrmData,
        headers: {
          pinata_api_key: `${import.meta.env.VITE_API_KEY}`,
          pinata_secret_api_key: `${import.meta.env.VITE_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const FileHash = `ipfs://${Res.data.IpfsHash}`;
      State?.Account &&
        State?.Contract &&
        (await State.Contract.Upload(State.Account, FileHash));

      setFile(null);
      setFileURL(null);
      alert("File Uploaded Successfully");
    } catch (err) {
      alert("Error in Uploading File to Pinata");
    }
  };
  return (
    <div className="w-[60%] h-[100%] flex justify-center items-center mx-auto flex-col gap-2">
      <section className="flex w-[100%] text-white gap-2 h-[70%]">
        <div
          onClick={() => document.querySelector(".input-field").click()}
          className="cursor-pointer w-[50%] bg-red-500 p-2 flex justify-center items-center shadow-2xl rounded-lg flex-col gap-5"
        >
          <img className="hover:scale-110 hover:transition-all" src="./Icon.png" height={60} width={60} />
          <input
            type="file"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFile(files[0]);
              if (files) {
                setFileURL(URL.createObjectURL(files[0]));
              }
            }}
          />
          <small>Select File</small>
        </div>
        <div className="w-[50%] bg-red-500 p-2 rounded-lg shadow-2xl">
          {File && (
            <div className="flex flex-col gap-5 items-start h-[100%] p-5">
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Name </span>
                <span>{File?.name}</span>
              </p>
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Size </span>
                <span>{File?.size}</span>
              </p>
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Type </span>
                <span>{File?.type}</span>
              </p>

              <img
                src={FileURL}
                alt=""
                height={170}
                width={170}
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </section>
      <section className="w-[100%] bg-[#2ecc71] text-white rounded-lg">
        <button className="w-[100%] p-2" onClick={Upload}>
          Upload File
        </button>
      </section>
    </div>
  );
};

export default FileUpload;
