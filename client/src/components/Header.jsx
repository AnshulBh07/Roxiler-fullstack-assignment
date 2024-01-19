import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import ProfileImg from "../assets/images/profile-pic.jpeg";
import "../sass/headerStyles.scss";
import { useSearchParams } from "react-router-dom";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [month, setMonth] = useState("march");
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(keyword);

  const handleChange = (e) => {
    setKeyword(e.target.value);
    let len = e.target.value.length;
    console.log(len);

    if (len === 0) {
      searchParams.delete("key");
      setSearchParams(searchParams);
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchParams.set("key", keyword);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="container-main__header">
      <h2 className="header-title">Dashboard</h2>

      <div className="search-fields">
        <label htmlFor="search-keyword" className="label-keyword">
          <input
            type="text"
            className="search-bar"
            placeholder="Search type of keywords"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button className="btn-search">
            <IoSearchOutline className="icon-search" />
          </button>
        </label>

        <select
          name="months"
          id="month-select"
          className="month-selection-box"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            searchParams.set("month", e.target.value);
            setSearchParams(searchParams);
          }}
        >
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march" defaultValue>
            March
          </option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
      </div>

      <div className="profile-info">
        <button className="btn-notification">
          <FaRegBell className="icon-bell" />
        </button>
        <p className="username">Anshul Bhardwaj</p>
        <img src={`${ProfileImg}`} alt="profile" className="user-pic" />
      </div>
    </div>
  );
}

export default Header;
