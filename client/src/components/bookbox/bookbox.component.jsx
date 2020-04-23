import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

import "./bookbox.style.scss";

const Bookbox = (props) => {
  //* Save button event handler
  const handleSaveOnClick = async (e) => {
    const data = e.target.closest("button").getAttribute("data");
    const {
      title,
      authors,
      description,
      imageLinks: { thumbnail },
      infoLink,
    } = JSON.parse(data);

    // console.log("🍮 data:", filteredData);
    const result = await axios.post("/api/books", {
      title,
      authors,
      description,
      image: thumbnail,
      link: infoLink,
    });

    // console.log(result);
  };

  //* Delete button event handler
  const handleDeleteOnClick = async (e) => {
    const id = e.target.closest("button").getAttribute("id");
    // console.log("🍭", id);
    const result = await axios.delete(`/api/books/${id}`);

    // console.log(result);
    window.location.reload();
  };

  return (
    <div className="bookbox">
      {/* {console.log("🏉 props", props)} */}
      <img
        style={{ width: "128px" }}
        src={
          props.imageLinks
            ? props.imageLinks.thumbnail
            : props.image
            ? props.image
            : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
        }
        alt={`book-cover-${props.title}`}
      ></img>
      <div className="bookbox-text">
        <div className="bookbox-top">
          <p className="bookbox-title">
            <span className="bookbox-title--main">{props.title}</span>
            {props.authors && (
              <span className="bookbox-authors">
                {`Written By `}
                {props.authors.map((author, i, arr) => (
                  <span
                    key={`${props.infoLink ? props.infoLink : props.link}-${i}`}
                  >
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
              href={props.infoLink ? props.infoLink : props.link}
              target="_blank"
            >
              View
            </Button>
            {props.isSearch ? (
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                onClick={handleSaveOnClick}
                data={JSON.stringify(props)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                onClick={handleDeleteOnClick}
                id={props._id}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        <p className="bookbox-desc">{props.description}</p>
      </div>
    </div>
  );
};

export default Bookbox;

//volumeInfo : authors(arr), description, imageLinks,infoLink , title
