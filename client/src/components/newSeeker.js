import React from "react";
import "../styles/card.css";
import "../styles/globalStyles.css";

const NewSeeker = ({ seeker = null, size = 200 }) => {
  if (!seeker) {
    return null;
  }

  try {
    //console.log(seeker.uri);
    return (
      <div className="card columns">
        <img className="imageContainer" src={seeker.image} />
        <p className="card-data">
          <span className="item-value">{`Seeker #${seeker.name}`}</span>
        </p>
      </div>
    );
  } catch (err) {
    console.log(err);
  }

  return <h1>hello</h1>;
};

export default NewSeeker;
