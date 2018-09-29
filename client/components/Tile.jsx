import React from "react";
import { Link } from "react-router-dom";

function Tile(props) {
  const body = (
    <div key={props.day} className={`tile ${props.className || ""}`}>
      {props.children}
    </div>
  );

  return props.link ? <Link to={props.link}>{body}</Link> : body;
}

export default Tile;
