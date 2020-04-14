import { useState, useEffect } from "react";
import axios from "axios";

//! Fetch books from Google or DB
const useFetch = (url) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const res = await axios.get(url);
          const dataArr = res.data;

          setData(dataArr);
        } catch (err) {
          console.log("🚨", err);
        }
      };
      fetchData();
    }
  }, [url]);

  return data;
};

export default useFetch;
// export const postAbook = () => {};
// export const deleteAbook = () => {};
