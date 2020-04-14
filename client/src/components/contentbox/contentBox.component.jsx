import React, { useState, useEffect } from "react";
import Searchbox from "../searchbox/searchbox.component";
import Bookswrapper from "../bookswrapper/bookswrapper.component";
import useAPI from "../../util/useAPI";

// search data: search query, AJAX data(books)
// DB data: save, delete
// props: isSearch, save or delete BTN, bookwrapper title
const ContentBox = ({ isSearch = false }) => {
  const fetchGoogle = () => {};
  const saveBtn = () => <button onClick={fetchGoogle}>Save</button>;

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div accessory={isSearch && <Searchbox setSeachQuery={setSearchQuery} />}>
      {/* if search : query, google fetch, save to db */}
      <Bookswrapper title={title}>
        {/* bookboxs(ajax from search || DB data) => data.map */}
      </Bookswrapper>
    </div>
  );
};

export default ContentBox;
