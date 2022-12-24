import "./EarningsGraph.css";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

const EarningsGraph = (props) => {
  const colors = [
    "#00ADB5",
    "#393E46",
    "#6D9886",
    "#434242",
    "#B2B2B2",
    "#FFD369",
    "#A5C9CA",
    "#303481",
  ];
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    let tmp = [];
    for (let [currency, values] of props.data) {
      tmp.push({
        id: tmp.length + 1,
        backgroundColor: "#EAEAEA",
        borderColor: colors[tmp.length],
        label: currency,
        data: values,
      });
    }
    setDatasets(tmp);
  }, [props.data]);
  return (
    <Line
      width="1200px"
      height="400px"
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
        datasets: datasets,
      }}
    />
  );
};

export default EarningsGraph;
