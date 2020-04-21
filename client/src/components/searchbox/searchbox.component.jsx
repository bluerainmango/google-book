import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import "./searchbox.style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    "max-width": "79.7%",
    margin: "20px auto",
    background: "linear-gradient(90deg, #3a47d5 0%, #00d2ff 100%) !important",
    // transform: "translateY(50%)",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "350px",
  },
  iconButton: {
    padding: "10px",
    "margin-right": "auto",
    // color: "#fff",
    // justifyContent: "flex-start",
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  //* Set search query to parent comp(contentBox) only when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onChange(e.currentTarget.elements[0].value);

    console.log(
      "🏓inside handle submit value",
      e.currentTarget.elements[0].value
    );
  };

  console.log("⚽️", props);
  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="What do you feel to search today? 💭"
        inputProps={{ "aria-label": "search books", autoFocus: true }}
      />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import "./searchbox.style.scss";

// export default function Searchbox() {
//   return (
//     <form noValidate autoComplete="off" className="searchForm">
//       <h3>Book Search</h3>
//       <TextField id="standard-basic" label="Standard" />
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         className="searchBtn"
//       >
//         Search
//       </Button>
//       {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
//     </form>
//   );
// }
