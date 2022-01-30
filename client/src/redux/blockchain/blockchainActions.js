// constants
import Web3 from "web3";
import SeekerToken from "../../contracts/SeekerToken.json";
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
        // console.log("networkId", networkId);

        const seekerTokeNetworkdata = await SeekerToken.networks[networkId];

        if (seekerTokeNetworkdata) {
          const seekerToken = new web3.eth.Contract(
            SeekerToken.abi,
            seekerTokeNetworkdata.address
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              seekerToken: seekerToken,
              web3: web3,
            })
          );
          // console.log("ADD UPDATE ACCOUNT LISTENER");
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
