import React, { useState } from "react";
import BiPlot from "../components/bi-plot";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Switch from "@mui/material/Switch";
import ClusteringPlot from "../components/clustering-plot";
import ScatterPlot from "../components/scatter-plot";
import SceePlot from "../components/scee-plot";

const Home = () => {
  const [themeLight, setThemeType] = useState(false);
  const [idi, setIdi] = useState(5);
  const [kValue, setKValue] = useState(2);
  const theme = createTheme({
    palette: {
      mode: themeLight ? "dark" : "light"
    }
  });
  function handleThemeChange() {
    setThemeType(!themeLight);
  }
  const changeKValue = (value) => {
    setKValue(value);
  };
  const changeIdiValue = (value) => {
    setIdi(value);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" style={{ backgroundColor: "#1DB954" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Visualisation - 564</Typography>
              <Switch
                checked={themeLight}
                onChange={handleThemeChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Toolbar>
          </AppBar>
        </Box>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "50% 50%",
            height: "200vh",
            width: 100,
            margin: 60
          }}
        >
          <div
            style={{
              border: "1px solid black",
              padding: "2px"
            }}
          >
            <SceePlot
              idi={idi}
              changeIdiValue={changeIdiValue}
              kValue={kValue}
              changeKValue={changeKValue}
            />
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "2px"
            }}
          >
            <ScatterPlot
              idi={idi}
              changeIdiValue={changeIdiValue}
              kValue={kValue}
              changeKValue={changeKValue}
            />
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "2px"
            }}
          >
            <ClusteringPlot
              idi={idi}
              changeIdiValue={changeIdiValue}
              kValue={kValue}
              changeKValue={changeKValue}
            />
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "2px"
            }}
          >
            <BiPlot
              idi={idi}
              changeIdiValue={changeIdiValue}
              kValue={kValue}
              changeKValue={changeKValue}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Home;
