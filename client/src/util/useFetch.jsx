import { useState, useEffect } from "react";
import axios from "axios";

//! Fetch data or return null
const useFetch = (url) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (url) {
      //* When url exists
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
    } else {
      //* When url doesn't exists
      setData(null);
    }
  }, [url]);

  return data;
};

export default useFetch;
