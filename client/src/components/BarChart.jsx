import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {
  console.log(data.BarData.array);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      y: {
        max: 10,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },

    plugins: {
      title: {
        display: true,
        text: "Number of items sold per range",
      },
    },
  };

  const barData = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      ">901",
    ],
    datasets: [
      {
        label: "Items",
        data: data.BarData.array,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div
      className="conatiner__barchart"
      style={{ width: "50%", height: "20rem" }}
    >
      <Bar options={options} data={barData} />
    </div>
  );
}

export default BarChart;
