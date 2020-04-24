import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./bookbox.style.scss";

const Bookbox = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  //* Alert handlers
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //* Save button event handler
  const handleSaveOnClick = async (e) => {
    const data = e.target.closest("button").getAttribute("data");
    const {
      title,
      authors,
      description,
      imageLinks: { thumbnail },
      infoLink,
      gbID,
    } = JSON.parse(data);

    // console.log("🍮 data:", JSON.parse(data), gbID);

    //* Save a book to DB
    try {
      const result = await axios.post("/api/books", {
        title,
        authors,
        description,
        image: thumbnail,
        link: infoLink,
        gbID,
      });

      // console.log("🐭 create a book result: ", result);

      //* Set a popup message for user feedback
      if (result.data.status === "success") {
        setMessage("📚 The book is saved!");
        setOpen(true);
      }
    } catch (err) {
      // console.log("🐭 create a book result(err):", err.response.data);

      if (err.response.data.code === "duplicated Book") {
        setMessage(err.response.data.message);
        setOpen(true);
      }
    }
  };

  //* Delete button event handler
  const handleDeleteOnClick = async (e) => {
    const id = e.target.closest("button").getAttribute("id");
    // console.log("🍭", id);
    await axios.delete(`/api/books/${id}`);

    //* Reload whole page
    // window.location.reload();

    //* Refresh data without reloading whole page
    // console.log("🐹reloadToggler:", props.reloadToggler);
    props.setReloadToggler(!props.reloadToggler);
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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Bookbox;

//volumeInfo : authors(arr), description, imageLinks,infoLink , title
