import React from "react";

const Bookbox = (props) => {
  return (
    <div>
      {console.log("🏉 props", props, props.props)}
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
          <button> View</button>
          hello
        </div>
        <h4>{props.title}</h4>
        <p>
          {/* {props.authors.map((author) => (
            <span
              // key={props.industryIdentifiers[0].identifier}
              key={`${props}-child`}
            >{`${author}, `}</span>
          ))} */}
        </p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Bookbox;

//volumeInfo : authors(arr), description, imageLinks,infoLink , title
