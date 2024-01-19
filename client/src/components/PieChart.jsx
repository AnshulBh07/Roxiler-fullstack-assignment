import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  console.log(data.PieData);

  const category_arr = Object.keys(data.PieData);
  const values_arr = Object.values(data.PieData);

  console.log(category_arr);
  console.log(values_arr);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Number of items per category",
      },
    },
  };

  const pieData = {
    labels: category_arr,
    datasets: [
      {
        label: "Number of Items",
        data: values_arr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      className="container__pieChart"
      style={{ width: "50%", height: "20rem" }}
    >
      <Doughnut data={pieData} options={options} />
    </div>
  );
  //   return <div className="">L</div>;
}

export default PieChart;
