// constants
import Web3 from "web3";
import PixelToken from "../../contracts/PixelToken.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());

    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);

      try {
        web3.eth.requestAccounts().then(console.log);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (!accounts || !accounts[0]) {
          throw "connect wallet.";
        }
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("networkId", networkId);

        const pixelTokeNetworkdata = await PixelToken.networks[networkId];
        console.log(PixelToken.networks);

        if (pixelTokeNetworkdata) {
          const pixelToken = new web3.eth.Contract(
            PixelToken.abi,
            "0x4d3e617fC5E6ee8873c5406E49860BF679cCbe33"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              pixelToken: pixelToken,
              web3: web3,
            })
          );
          console.log(pixelToken);
          console.log("ADD UPDATE ACCOUNT LISTENER");
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            console.log("accountsChanged ", accounts[0]);
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    console.log("updateAccount", account);
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
