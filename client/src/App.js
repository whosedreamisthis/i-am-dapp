import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import "./styles/globalStyles.css";
//import _color from "./assets/images/bg/_color.png";
import SeekerRenderer, { getSVG } from "./components/seekerRenderer";

import "./styles/card.css";
import WhoAmI from "./components/whoAmI";
function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  function createRandomNum() {
    return Math.floor(Math.random() * 10 ** 16);
  }
  const startMintingProcess = () => {
    const randDNA = createRandomNum();
    const dataURI = getSVG(randDNA);
    //getImageData();
    mintNFT(blockchain.account, nextSeekerName(), dataURI);
  };

  const getImageData = () => {
    var captureEl = document.querySelector("#capture");
    var b64 = "data:image/svg+xml;base64," + window.btoa(captureEl.outerHTML);

    // 3. convert svg to base64
    console.log(b64);
  };
  const mintNFT = (_account, _name, uri) => {
    setLoading(true);
    blockchain.seekerToken.methods
      .mint(uri)
      .send({
        from: _account,
        gasPrice: "20000000",
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (blockchain.account != "" && blockchain.seekerToken != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.seekerToken, dispatch]);

  function isAtMaxLevel(level) {
    return level >= 10;
  }

  function isOwner(seeker) {
    const filteredSeekers = data.allOwnerSeekers.filter((seekerData) => {
      return seekerData.id === seeker.id;
    });
    console.log(
      "does include? ",
      data.allOwnerSeekers,
      seeker,
      filteredSeekers.length == 1
    );
    return filteredSeekers.length == 1;
  }

  function nextSeekerName() {
    let paddedNumber = `${data.allSeekers.length} `;
    paddedNumber = paddedNumber.padStart(5, "0");
    return `Seeker #${paddedNumber}`;
  }

  function capture() {
    var captureEl = document.querySelector("#capture");
    captureEl.style.fontFeatureSettings = '"liga" 0';
    var options = {
      quality: 0.95,
    };
  }

  return (
    <>
      <WhoAmI />
      <div className="screen">
        {blockchain.account == "" || blockchain.account == null ? (
          <div className="container column" style={{ height: "100%" }}>
            <div className="spacerMedium" />

            <button
              className="connect"
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              Connect
            </button>
          </div>
        ) : (
          <div className="container column ">
            <div className="spacerMedium" />
            <div className="mint">
              <button
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  startMintingProcess();
                }}
              >
                Mint
              </button>
            </div>
            <div className="spacerSmall" />
            <div className="container row nft-list">
              {data.allSeekers.map((item) => {
                return (
                  <div className="nft-container">
                    <SeekerRenderer
                      seeker={item}
                      isOwner={isOwner}
                      loading={loading}
                      blockchain={blockchain}
                      isAtMaxLevel={isAtMaxLevel}
                    />
                    <div className="spacerSmall" />
                  </div>
                );
              })}
            </div>
            {/* <div className="mint">
              <button
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  mintNFT(blockchain.account, nextSeekerName());
                }}
              >
                Mint
              </button>
            </div>
            */}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
