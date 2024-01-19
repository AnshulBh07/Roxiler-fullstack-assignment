import React from "react";
import "../sass/statTileStyles.scss";
import { formatCurrency } from "../services/formayCurrency";

function StatTile({ item, index, data }) {
  return (
    <div className="container-main__statTile">
      {item.icon}
      <h3 className="stat-title">{item.title}</h3>
      {data.Statistics && (
        <p className="stat-value">
          {item.desc}
          {index === 0
            ? formatCurrency(Math.round(data.Statistics.total_sale * 100) / 100)
            : index === 1
            ? data.Statistics.total_items_sold
            : data.Statistics.total_unsold_items}
        </p>
      )}
    </div>
  );
}

export default StatTile;
