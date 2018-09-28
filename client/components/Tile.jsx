import React from "react";

function Tile(props) {
  return (
    <div key={props.day} className={`tile ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Tile;
