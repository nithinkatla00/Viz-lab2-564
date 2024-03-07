import React, { useEffect } from "react";
import { DrawScatterPlotMatrix } from "../utils/svg-scatterplot";

const ScatterPlot = ({ idi, changeIdiValue, kValue, changeKValue }) => {
  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:5000/table_loading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idi
        })
      })
        .then((response) => response.json())

        .catch((error) => {
          // Handle any errors
        }),
      fetch("http://127.0.0.1:5000/scatter_plot_matrix").then((response) =>
        response.json()
      )
    ])
      .then(([tableLoadingData, scatterPlotMatrixData]) => {
        console.log(tableLoadingData);
        const extractedFeatures = tableLoadingData.data
          .slice(0, 4)
          .map((item) => item.Attr);
        DrawScatterPlotMatrix(
          scatterPlotMatrixData.data,
          extractedFeatures,
          idi
        );
      })
      .catch((error) => console.error("Error:", error));
  }, [idi]);
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Scatter Plot Matrix</h3>
      <svg id="svg_2"> </svg>
    </div>
  );
};
export default ScatterPlot;
