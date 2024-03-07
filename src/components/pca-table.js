import React, { useEffect, useState } from "react";

const PCATable = ({ idi, changeIdiValue, kValue, changeKValue }) => {
  const [pcaData, setPCAData] = useState({ data: [] });
  useEffect(() => {
    fetch("http://127.0.0.1:5000/table_loading")
      .then((response) => response.json())
      .then((data) => setPCAData(data));
  }, [pcaData, idi]);
  return <></>;
};
export default PCATable;
