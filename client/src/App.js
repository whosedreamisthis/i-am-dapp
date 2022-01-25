import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
//import * as s from "./styles/globalStyles";
//import _color from "./assets/images/bg/_color.png";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.table(blockchain);

  const mintNFT = (_account, _name) => {
    setLoading(true);
    blockchain.pixelToken.methods
      .createRandomLip(_name)
      .send({
        from: _account,
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

  const levelUpLip = (_account, _id) => {
    // setLoading(true);
    // blockchain.pixelToken.methods
    //   .levelUp(_id)
    //   .send({
    //     from: _account,
    //   })
    //   .once("error", (err) => {
    //     setLoading(false);
    //     console.log(err);
    //   })
    //   .then((receipt) => {
    //     setLoading(false);
    //     console.log(receipt);
    //     dispatch(fetchData(blockchain.account));
    //   });
  };

  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);

  // useEffect(() => {
  //   if (blockchain.account != "" && blockchain.pixelToken != null) {
  //     dispatch(fetchData(blockchain.account));
  //   }
  // }, [blockchain.pixelToken]);

  return <div></div>;
}

export default App;
