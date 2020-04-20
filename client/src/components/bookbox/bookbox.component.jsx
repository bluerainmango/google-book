import React from "react";
import Button from "@material-ui/core/Button";

const Bookbox = (props) => {
  return (
    <div>
      {console.log("🏉 props", props)}
      {/* <img style={{ src: props.imageLinks.thumbnail }}></img> */}
      <img
        src={
          props.imageLinks
            ? props.imageLinks.thumbnail
            : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
        }
      ></img>
      <div>
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
        <h4>{props.title}</h4>

        {props.authors && (
          <p>
            {`Written By `}
            {props.authors.map((author, i, arr) => (
              <span key={`${props.infoLink}-${i}`}>
                {i !== arr.length - 1 ? `${author}, ` : `${author}`}
              </span>
            ))}
          </p>
        )}

        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Bookbox;

//volumeInfo : authors(arr), description, imageLinks,infoLink , title
