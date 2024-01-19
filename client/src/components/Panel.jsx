import React from "react";
import Header from "./Header";
import { statTileItems } from "../services/StatItems";
import "../sass/panelStyles.scss";
import StatTile from "./StatTile";
import ProductTile from "./ProductTile";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

function Panel({ data }) {
  return (
    <div className="container-main__panel">
      <Header />

      <div className="container-panel__data">
        {/* statistics for selected month */}
        <div className="container__statistics">
          {statTileItems.map((item, index) => {
            return (
              data && (
                <StatTile item={item} key={index} index={index} data={data} />
              )
            );
          })}
        </div>
        {/* charts for selected month */}
        <div className="container__charts">
          {data.BarData && <BarChart data={data} />}
          {data.PieData && <PieChart data={data} />}
        </div>
        {/* products list for selected month */}
        <div className="container__products">
          <h3>Products</h3>
          <div className="products__table">
            <div className="products-list__headings">
              <p className="p-name">product name</p>
              <p className="p-category">category</p>
              <p className="p-description">description</p>
              <p className="p-price">price</p>
              <p className="p-sold">sold</p>
              <p className="p-date">date</p>
            </div>
            <hr />

            {data.Products &&
              data.Products.map((item, index) => {
                return <ProductTile key={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
