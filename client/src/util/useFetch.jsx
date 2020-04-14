import { useState, useEffect } from "react";
import axios from "axios";

//! Fetch books from Google or DB
const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      const dataArr = res.data;

      setData(dataArr);
    };
    fetchData();
  }, []);

  return data;
};

export default useFetch;
// export const postAbook = () => {};
// export const deleteAbook = () => {};
