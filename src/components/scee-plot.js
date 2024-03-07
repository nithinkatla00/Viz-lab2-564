import React, { useEffect, useState } from "react";
import { DrawScreePlot } from "../utils/svg-sceeplot";

const SceePlot = ({ idi, changeIdiValue, kValue, changeKValue }) => {
  useEffect(() => {
    fetch("http://127.0.0.1:5000/calculate_PCA")
      .then((response) => response.json())
      .then((pcaData) => {
        const cumData = JSON.parse(JSON.stringify(pcaData));
        DrawScreePlot(pcaData.data, cumData.data, idi, changeIdiValue);
      });
  }, [changeIdiValue, idi]);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Principal Component Vs Variance Scree Plot</h3>
      <svg id="svg_1"></svg>
    </div>
  );
};

export default SceePlot;
