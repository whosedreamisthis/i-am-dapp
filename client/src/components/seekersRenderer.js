import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeekerRenderer from "./seekerRenderer";
const SeekersRenderer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [uriMeta, setUriMeta] = useState("");
  const [intervalId, setintervalId] = useState(-1);

  useEffect(() => {
    if (
      data == null ||
      data.allSeekers == null ||
      data.allSeekers.length == 0
    ) {
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }
    const newInterval = setInterval(() => {
      const rand = Math.floor(Math.random() * data.allSeekers.length);
      setUriMeta(
        JSON.parse(window.atob(data.allSeekers[rand].uri.split(",")[1]))
      );
    }, 5000);
    setintervalId(newInterval);

    return function cleanup() {
      clearInterval(newInterval);
    };
  }, [data]);
  try {
    //console.log(seeker.uri);

    return uriMeta == "" ? (
      <div></div>
    ) : (
      <div
        className="nft"
        hidden={
          !data || !data.allSeekers || data.allSeekers.length == 0
            ? true
            : false
        }
      >
        <div className="card columns">
          <img className="imageContainer" src={uriMeta.image} />
          <p className="card-data">
            <span className="item-value">{uriMeta.name}</span>
          </p>
        </div>
      </div>
    );
  } catch (err) {
    return <h1>err</h1>;
  }
};

export default SeekersRenderer;
