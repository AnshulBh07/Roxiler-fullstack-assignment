import React, { useState } from "react";
import { FiArrowDownCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import "../sass/productTileStyles.scss";
import { getFormattedDate } from "../services/formatDate";
import { LuArrowUpCircle } from "react-icons/lu";

function ProductTile({ item }) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="container-main__productTile">
      <div className="main-tile">
        <div className="product-name">
          <div className="container-img">
            <img src={`${item.image_url}`} alt="item" className="product-img" />
          </div>

          <div className="container-info">
            <p className="product-title">{item.title}</p>
            <p className="product-id">ID: {item.product_id}</p>
          </div>
        </div>

        <p className="category">{item.category}</p>

        <div className="description">
          {!showDesc && (
            <button
              className="btn-show-desc"
              onClick={() => {
                setShowDesc(!showDesc);
              }}
            >
              <FiArrowDownCircle className="icon-more" />
            </button>
          )}

          {showDesc && (
            <button
              className="btn-show-desc"
              onClick={() => {
                setShowDesc(!showDesc);
              }}
            >
              <LuArrowUpCircle className="icon-more" />
            </button>
          )}
        </div>

        <div className="price">
          <FaRupeeSign className="icon-rupee" />
          {Math.round(item.price * 100) / 100}
        </div>
        <p
          className="sold-status"
          style={{ color: item.sold ? "#0e9c02" : "#b50600" }}
        >
          {item.sold ? "Yes" : "No"}
        </p>
        <p className="date">{getFormattedDate(item.date_of_sale)}</p>
      </div>

      {showDesc && (
        <div className="description-container">{item.description}</div>
      )}
    </div>
  );
}

export default ProductTile;
