import React, { useEffect, useState } from "react";
import YourAsset from "./Components/YourAsset";
import GetAsset from "./Components/GetAsset";
import ShareAccess from "./Components/ShareAccess";
import FileUpload from "./Components/FileUpload";
import { ethers } from "ethers";
import Drive from "./artifacts/contracts/Drive.sol/Drive.json";

const App = () => {
  let [State, setState] = useState({
    Provider: null,
    Contract: null,
    Account: null,
  });
  let [Under, setUnder] = useState(1);

  let [CurrentMenu, setCurrentMenu] = React.useState();

  let LoadProvuder = async () => {
    const MyProvider = new ethers.providers.Web3Provider(window.ethereum);
    if (MyProvider) {
      await MyProvider.send("eth_requestAccounts", []);
      const Signer = MyProvider.getSigner();

      setState({
        ...State,
        Provider: MyProvider,
        Account: await Signer.getAddress(),
        Contract: new ethers.Contract(
          "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          Drive.abi,
          Signer
        ),
      });
    } else {
      alert("Please Install Metamask");
    }
  };

  let ChangeMenu = (Name) => {
    switch (Name) {
      case "Upload File":
        setCurrentMenu(<FileUpload State={State} />);
        break;
      case "Your Asset":
        setCurrentMenu(<YourAsset State={State} />);
        break;
      case "Get Asset":
        setCurrentMenu(<GetAsset State={State} />);
        break;
      case "Share Access":
        setCurrentMenu(<ShareAccess State={State} />);
        break;
      default:
        setCurrentMenu(<FileUpload State={State} />);
    }
  };
  useEffect(() => {
    window.ethereum.on("accountsChanged", LoadProvuder);
    LoadProvuder();
  }, []);

  useEffect(() => {
    ChangeMenu();
  }, [State.Provider && State.Account]);
  return (
    <div className="flex flex-col m-2 gap-2 justify-stretch h-[96vh]">
      <div className="shadow-md flex-[0.05] flex justify-between bg-[#34495e] text-white p-2 rounded-sm items-center">
        <h2 className="text-base font-medium">
          Decenteralized Google Drive 🌸
        </h2>
        <p className="bg-[#5683b1] p-2 rounded-sm">
          {" "}
          <span className="font-bold">Account: </span>
          {State.Account && State.Account}
        </p>
      </div>
      <div className="flex-1 bg-[#34495e] p-2 shadow-md rounded-sm relative gap-2 flex flex-col">
        <section className="w-100 flex justify-evenly gap-2 text-white font-semibold">
          <button
            className={`bg-[#2ecc71] flex-1 p-2 rounded-sm ${
              Under == 1 ? "border-b-2 border-white" : ""
            }`}
            onClick={() => {
              ChangeMenu("Upload File");
              setUnder(1);
            }}
          >
            Upload File
          </button>
          <button
            className={`bg-[#3498db] flex-1 p-2 rounded-sm ${
              Under == 2 ? "border-b-2 border-white" : ""
            }`}
            onClick={() => {
              ChangeMenu("Your Asset");
              setUnder(2);
            }}
          >
            Your Asset
          </button>
          <button
            className={`bg-[#9b59b6] flex-1 p-2 rounded-sm ${
              Under == 3 ? "border-b-2 border-white" : ""
            }`}
            onClick={() => {
              ChangeMenu("Get Asset");
              setUnder(3);
            }}
          >
            Get Asset
          </button>
          <button
            className={`bg-[#1abc9c] flex-1 p-2 rounded-sm ${
              Under == 4 ? "border-b-2 border-white" : ""
            }`}
            onClick={() => {
              ChangeMenu("Share Access");
              setUnder(4);
            }}
          >
            Share Access
          </button>
        </section>
        <div className="h-[90%] border-2 border-dashed p-2 rounded-sm">
          {CurrentMenu}
        </div>
      </div>
    </div>
  );
};

export default App;
