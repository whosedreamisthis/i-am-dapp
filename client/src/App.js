import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles.js";
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
    <s.Screen>
      {blockchain.account == "" || blockchain.account == null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Game</s.TextTitle>
          <s.SpacerMedium />

          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            Connect
          </button>
        </s.Container>
      ) : (
        <s.Container ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Unknown");
            }}
          >
            Mint
          </button>
          <s.SpacerSmall />
          <s.Container
            jc={"space-between"}
            fd={"row"}
            style={{ flexWrap: "wrap", padding: "20px" }}
          >
            {data.allPixels.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <s.Container
                    jc={"space-between"}
                    fd={"column"}
                    style={{ flexWrap: "wrap", padding: "20px" }}
                  >
                    <PixelRenderer pixel={item} />
                    <s.TextDescription>ID: {item.id}</s.TextDescription>
                    <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                    <s.TextDescription>NAME: {item.name}</s.TextDescription>
                    <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                    <s.SpacerSmall />
                    <s.StyledButton
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        levelUpPixel(blockchain.account, item.id);
                      }}
                    >
                      Level Up
                    </s.StyledButton>
                  </s.Container>
                </div>
              );
            })}
          </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
