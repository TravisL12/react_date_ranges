import React from "react";
import { Link } from "react-router-dom";

function Tile(props) {
  const size = props.size
    ? { width: `${props.size}px`, height: `${props.size}px` }
    : {};
  const body = (
    <div
      key={props.day}
      className={`tile ${props.className || ""}`}
      style={size}
    >
      {props.children}
    </div>
  );

  return props.link ? <Link to={props.link}>{body}</Link> : body;
}

export default Tile;
