import React, { useState, useEffect, useMemo } from "react";
import Searchbox from "../searchbox/searchbox.component";
import Bookswrapper from "../bookswrapper/bookswrapper.component";
import useFetch from "../../util/useFetch";
import axios from "axios";
// search data: search query, AJAX data(books)
// DB data: save, delete
// props: isSearch, save or delete BTN, bookwrapper title
const ContentBox = ({ isSearch }) => {
  //   const saveBtn = () => <button onClick={fetchGoogle}>Save</button>;

  //! State
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchUrl, setFetchUrl] = useState(null);
  const [books, setBooks] = useState(null);

  //! Dinamically renders <Searchbox> based on pages("/" or "/saved").
  const searchboxAccessory = useMemo(() => {
    return isSearch && <Searchbox setSeachQuery={setSearchQuery} />;
  }, [isSearch]);

  // fetch google or db
  useEffect(() => {
    if (searchQuery) {
      setFetchUrl(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
    }

    if (!searchQuery && !isSearch) {
      setFetchUrl(`http://localhost:3000/api/books`);
    }

    console.log("🔗 link, query", fetchUrl, searchQuery);
  }, [searchQuery, isSearch]);

  const { data } = useFetch(fetchUrl);

  // search query === "" || search query !== "" || saved(!isSearch)
  console.log("🥰222", data);

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
