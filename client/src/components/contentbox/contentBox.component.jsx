import React, { useState, useEffect, useMemo } from "react";
import Searchbox from "../searchbox/searchbox.component";
import Bookswrapper from "../bookswrapper/bookswrapper.component";
import useFetch from "../../util/useFetch";
import Bookbox from "../bookbox/bookbox.component";

const ContentBox = ({ isSearch, searchQueryInit }) => {
  //! State
  const [searchQuery, setSearchQuery] = useState(searchQueryInit);
  const [fetchUrl, setFetchUrl] = useState(null);

  //! Dinamically renders <Searchbox> based on pages("/" or "/saved").
  const searchboxAccessory = useMemo(() => {
    return isSearch && <Searchbox onChange={setSearchQuery} />;
  }, [isSearch]);

  //! Fetch book data from google or mongoDB
  useEffect(() => {
    //* 1. Google books
    if (isSearch && searchQuery) {
      setFetchUrl(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      setSearchQuery("");
    }

    //* 2. Saved books
    if (!isSearch) {
      setFetchUrl(`/api/books`);
      setSearchQuery("");
    }

    //* 3. Reset search result(when returning back to search page from saved page)
    if (isSearch && !searchQuery) {
      setFetchUrl("");
    }
  }, [searchQuery, isSearch]);

  //! Fetch data
  const data = useFetch(fetchUrl);
  console.log("🥰data", data);

  //! Filter out duplicated book for searched books
  let uniqueBooksArr = [];
  if (data && isSearch) {
    if (data) {
      uniqueBooksArr = [
        ...new Map(data.items.map((item) => [item.id, item])).values(),
      ];
    }
  } else {
  }

  return (
    <div>
      {console.log(
        "🥜isSearch:",
        isSearch,
        "data:",
        data,
        "query:",
        searchQuery,
        "fetchUrl:",
        fetchUrl
      )}
      <Bookswrapper title={"title"} accessory={searchboxAccessory} books={data}>
        {/* Cases: 1.search page with no data 2.search page with query result, 3.saved page */}
        {isSearch && data
          ? uniqueBooksArr.map((book) => (
              <Bookbox key={book.id} {...book.volumeInfo} />
            ))
          : !isSearch && data
          ? data.items.map((book) => (
              <Bookbox key={book.id} id={book.id} {...book} />
            ))
          : ""}
      </Bookswrapper>
    </div>
  );
};

export default ContentBox;
