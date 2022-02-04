import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import "./styles/globalStyles.css";
//import _color from "./assets/images/bg/_color.png";
import SeekerRenderer, {
  createRandomSeeker,
} from "./components/seekerRenderer";

import "./styles/card.css";
import WhoAmI from "./components/whoAmI";
function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [NFTs, setNFTs] = useState([]);
  function createRandomNum() {
    return Math.floor(Math.random() * 10 ** 16);
  }
  const startMintingProcess = () => {
    const name = nextSeekerName();
    const description =
      "Whether black, white, or any color in between, I am limitless.";
    const dataURI = createRandomSeeker();
    const metadata = { name: name, description: description, image: dataURI };
    //getImageData();
    const encodedMetadata =
      "data:application/json;base64," + window.btoa(JSON.stringify(metadata));
    mintNFT(blockchain.account, dataURI);
  };

  const getImageData = () => {
    var captureEl = document.querySelector("#capture");
    var b64 = "data:image/svg+xml;base64," + window.btoa(captureEl.outerHTML);

    // 3. convert svg to base64
  };
  const mintNFT = (_account, uri) => {
    setLoading(true);
    blockchain.seekerToken.methods
      .mint(uri)
      .send({
        from: _account,
        gasPrice: "20000000",
        gas: 6700000,
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

  const fetchMetadataForNFTs = () => {
    setNFTs([]);
    data.allSeekers.forEach((nft) => {
      fetch(nft.uri)
        .then((response) => response.json())
        .then((metaData) => {
          setNFTs((prevState) => [
            ...prevState,
            { id: nft.id, metaData: metaData },
          ]);
        })
        .catch((err) => {});
    });
  };

  useEffect(() => {
    fetchMetadataForNFTs();
  }, [data.allSeekers]);

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

    return filteredSeekers.length == 1;
  }

  function nextSeekerName() {
    let paddedNumber = `${data.allSeekers.length}`;
    paddedNumber = paddedNumber.padStart(4, "0");
    return `Seeker #${paddedNumber}`;
  }

  function capture() {
    var captureEl = document.querySelector("#capture");
    captureEl.style.fontFeatureSettings = '"liga" 0';
    var options = {
      quality: 0.95,
    };
  }

  // console.log("data", data);
  // console.log("blockchain", blockchain);
  return (
    <>
      <WhoAmI />
      <div className="screen">
        {blockchain.account == "" || blockchain.account == null ? (
          <div className="container column connect">
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <button
              className="connect"
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              Connect
            </button>
            <div className="spacerLarge" />
            <div className="spacerLarge" />
            <div className="spacerLarge" />

            <p className="connectMessage">
              Ensure metamask is installed, then connect to the rinkeby testnet.
            </p>
          </div>
        ) : (
          <div className="container column">
            <div className="container column header">
              <div className="mint">
                <div className="loader" hidden={loading ? false : true} />
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
              <div className="thesis">
                Whether black, white, or any color in between, I am limitless.
              </div>
              <div className="spacerSmall" />

              <div className="line"></div>
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
