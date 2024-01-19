import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Panel from "./components/Panel";
import "./App.scss";

function App() {
  // fetch the data initially after setting search params
  const [searchParam, setSearchParam] = useSearchParams();
  const [data, setData] = useState([]);

  //   console.log(searchParam.get("month"));

  useEffect(() => {
    const month = searchParam.get("month");
    let keyword = searchParam.get("key");

    if (month === null) {
      searchParam.set("month", "march");
      setSearchParam(searchParam);
    }

    if (keyword === null) keyword = "";

    const fetchMonthlyData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:3001/get_all_data?month=${month}&key=${keyword}`,
        });
        const result = response.data;
        setData(result);
        // console.log(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (month !== null) fetchMonthlyData();
  }, [searchParam, setSearchParam]);

  return (
    <div className="app">
      <Navbar />
      {data.Products && <Panel data={data} />}
    </div>
  );
}

export default App;
