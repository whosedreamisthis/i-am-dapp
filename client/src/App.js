import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import "./styles/globalStyles.css";
//import _color from "./assets/images/bg/_color.png";
import PixelRenderer from "./components/pixelRenderer";

import "./styles/card.css";
function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.table(blockchain);

  const mintNFT = (_account, _name) => {
    setLoading(true);
    blockchain.pixelToken.methods
      .createRandomPixel(_name)
      .send({
        from: _account,
        gasPrice: "20000000",
        value: blockchain.web3.utils.toWei("1", "ether"),
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

  const levelUpPixel = (_account, _id) => {
    setLoading(true);
    blockchain.pixelToken.methods
      .levelUp(_id)
      .send({
        from: _account,
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
    if (blockchain.account != "" && blockchain.pixelToken != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.pixelToken]);

  return (
    <div className="screen">
      {blockchain.account == "" || blockchain.account == null ? (
        <div className="container column" style={{ height: "100%" }}>
          <div className="spacerMedium" />
          <p className="textTitle">Connect to the Game</p>
          <div className="spacerMedium" />

          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            Connect
          </button>
        </div>
      ) : (
        <div className="container column">
          <div className="spacerMedium" />
          <p className="textTitle">Welcome to the game</p>
          <div className="spacerSmall" />
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Unknown");
            }}
          >
            Mint
          </button>
          <div className="spacerSmall" />
          <div className="container row">
            {data.allOwnerPixels.map((item) => {
              return (
                <div className="nft-container">
                  <PixelRenderer pixel={item} />
                  <div className="spacerSmall" />
                  <button
                    disabled={loading ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      levelUpPixel(blockchain.account, item.id);
                    }}
                  >
                    Level Up
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
