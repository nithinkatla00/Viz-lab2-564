import React, { useEffect } from "react";
import PCATable from "./pca-table";
import { Draw_Biplot } from "../utils/svg-biplot";

const BiPlot = ({ idi, changeIdiValue, kValue, changeKValue }) => {
  useEffect(() => {
    fetch("http://127.0.0.1:5000/bi_plot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        kValue
      })
    })
      .then((response) => response.json())
      .then((response) => {
        const output = JSON.parse(JSON.stringify(response));
        Draw_Biplot(output.data, output.components, kValue);
      });
  }, [kValue]);
  return (
    <div style={{ textAlign: "center" }}>
      <h3>PCA - BiPlot and KMeans Clusters</h3>
      <svg id="svg_3"></svg>
    </div>
  );
};
export default BiPlot;
