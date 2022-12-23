import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";

const EarningsGraph = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };
  return (
    <div>
      <Line
        datasetIdKey="id"
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              id: 1,
              backgroundColor: "rgba(0,0,0,1)",
              borderColor: "rgba(0,0,0,1)",
              label: "usd",
              data: [5, 3, 7],
            },
            {
              id: 2,
              label: "egp",
              data: [3, 2, 1],
            },
          ],
        }}
      />
    </div>
  );
};

export default EarningsGraph;
