import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Searchbox from "../searchbox/searchbox.component";
import Bookswrapper from "../bookswrapper/bookswrapper.component";
import useFetch from "../../util/useFetch";
import Bookbox from "../bookbox/bookbox.component";
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
    return isSearch && <Searchbox onChange={setSearchQuery} />;
  }, [isSearch]);

  //! Fetch book data from google or mongoDB
  useEffect(() => {
    if (searchQuery) {
      setFetchUrl(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
    }

    if (!searchQuery && !isSearch) {
      setFetchUrl(`/api/books`);
    }

    console.log("🔗 link, query", fetchUrl, searchQuery);
  }, [searchQuery, isSearch]);

  // search query === "" : no data || search query !== "" || saved(!isSearch)
  const data = useFetch(fetchUrl);
  //   setBooks(data.items);
  console.log("🥰data", data.items);

  //   const books = data.items.filter(book => book.id)

  //! Filter out duplicated book
  let uniqueBooksArr = [];
  if (data) {
    // const booksArr = data.items;
    uniqueBooksArr = [
      ...new Map(data.items.map((item) => [item.id, item])).values(),
    ];
    console.log("⛳️", uniqueBooksArr.length);
  }

  return (
    <div>
      {/* if search : query, google fetch, save to db */}
      <Bookswrapper title={"title"} accessory={searchboxAccessory} books={data}>
        {data && isSearch
          ? uniqueBooksArr.map((book) => (
              <Bookbox key={book.id} {...book.volumeInfo} />
            ))
          : data && !isSearch
          ? data.map((book) => <Bookbox key={book.id} id={book.id} {...book} />)
          : ""}
        {/* bookboxs(ajax from search || DB data) => data.map */}
        {/* <p>{books}</p>
        {console.log("🥰", books)} */}
      </Bookswrapper>
    </div>
  );
};

export default ContentBox;
