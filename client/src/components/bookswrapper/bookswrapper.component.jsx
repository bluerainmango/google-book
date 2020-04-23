import React from "react";

const Bookswrapper = (props) => {
  // console.log("🎱props:", props);
  return (
    <div>
      {props.accessory}
      {props.children}
    </div>
  );
};

export default Bookswrapper;
