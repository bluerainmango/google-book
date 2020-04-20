import React from "react";
import Button from "@material-ui/core/Button";

import "./bookbox.style.scss";

const Bookbox = (props) => {
  return (
    <div className="bookbox">
      {console.log("🏉 props", props)}
      {/* <img style={{ src: props.imageLinks.thumbnail }}></img> */}
      <img
        style={{ width: "128px" }}
        src={
          props.imageLinks
            ? props.imageLinks.thumbnail
            : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
        }
      ></img>
      <div className="bookbox-text">
        <div className="bookbox-top">
          <p className="bookbox-title">
            <span className="bookbox-title--main">{props.title}</span>
            {props.authors && (
              <span>
                {`Written By `}
                {props.authors.map((author, i, arr) => (
                  <span key={`${props.infoLink}-${i}`}>
                    {i !== arr.length - 1 ? `${author}, ` : `${author}`}
                  </span>
                ))}
              </span>
            )}
          </p>
          <div className="bookbox-button">
            <Button
              variant="outlined"
              color="primary"
              href={props.infoLink}
              target="_blank"
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href={props.infoLink}
              target="_blank"
            >
              Save
            </Button>
          </div>
        </div>

        <p className="bookbox-desc">{props.description}</p>
      </div>
    </div>
  );
};

export default Bookbox;

//volumeInfo : authors(arr), description, imageLinks,infoLink , title
