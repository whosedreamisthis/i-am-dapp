// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allSeekers = await store
        .getState()
        .blockchain.seekerToken.methods.getAllSeekers()
        .call();
      let allOwnerSeekers = await store
        .getState()
        .blockchain.seekerToken.methods.getOwnerSeekers()
        .call();

      dispatch(
        fetchDataSuccess({
          allSeekers,
          allOwnerSeekers,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
