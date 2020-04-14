import React, { useState, useEffect, useMemo } from "react";
import Searchbox from "../searchbox/searchbox.component";
import Bookswrapper from "../bookswrapper/bookswrapper.component";
import useFetch from "../../util/useFetch";

// search data: search query, AJAX data(books)
// DB data: save, delete
// props: isSearch, save or delete BTN, bookwrapper title
const ContentBox = ({ isSearch }) => {
  //   const saveBtn = () => <button onClick={fetchGoogle}>Save</button>;
  console.log("isSearch:", isSearch);
  const [searchQuery, setSearchQuery] = useState("");

  //! if "/" or "/saved" page, render search box or not.
  const searchboxAccessory = useMemo(() => {
    console.log("insdie of access");
    return isSearch && <Searchbox setSeachQuery={setSearchQuery} />;
  }, [isSearch]);

  const query = "kingsman";

  const books = useFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );

  console.log("🥰", books);
  return (
    <div>
      {/* if search : query, google fetch, save to db */}
      <Bookswrapper title={"title"} accessory={searchboxAccessory}>
        {/* bookboxs(ajax from search || DB data) => data.map */}
        {/* <p>{books}</p>
        {console.log("🥰", books)} */}
      </Bookswrapper>
    </div>
  );
};

export default ContentBox;
