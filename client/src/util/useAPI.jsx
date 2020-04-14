import React, { useEffect } from "react";
import axios from "axios";

// getBooksFromDB, getBooksFromGoogle
export const getData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("");
      const dataArr = res.data;

      setData(dataArr);
    };
    fetchData();
  });

  return data;
};

export const postAbook = () => {};
export const deleteAbook = () => {};
