import * as d3 from "d3";

export function Draw_Biplot(data, data2, kValue) {
  d3.select("#svg_3").html("");
  var padding = { top: 60, right: 60, bottom: 1, left: 60 };
  var width = 700;
  var height = 700;
  var x = [];
  var y = [];
  for (var i = 0; i < data.length; i++) {
    x.push(data[i].x);
    y.push(data[i].y);
  }

  var svg = d3
    .select("#svg_3")
    .attr("width", width + 100)
    .attr("height", height + 100)
    .attr("transform", "translate(30," + padding.top + ")");

  var xScale = d3
    .scaleLinear()
    .domain([-9, 9])
    .range([0, width - 100]);

  var yScale = d3
    .scaleLinear()
    .domain([-5, 13])
    .range([height - 100, 0]);
  var clusterNames = [
    "Cluster-1",
    "Cluster-2",
    "Cluster-3",
    "Cluster-4",
    "Cluster-5",
    "Cluster-6",
    "Cluster-7",
    "Cluster-8",
    "Cluster-9"
  ];
  var clusterColors = [
    "#b3de69",
    "#fdbf6f",
    "#ae7ac8",
    "#6baed6",
    "#ff7f0e",
    "#1f77b4",
    "#2ca02c",
    "#d62728",
    "#9467bd"
  ];

  var color = d3.scaleOrdinal(clusterColors);

  var xAxis = d3.axisBottom().scale(xScale);

  var yAxis = d3.axisLeft().scale(yScale);

  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "x axis")
    .attr("transform", "translate(50," + (height - 75) + ")")
    .call(xAxis);

  svg
    .append("line")
    .style("stroke", "black")
    .attr("x1", "50")
    .attr("y1", "455")
    .attr("x2", "1350")
    .attr("y2", "455");

  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "y axis")
    .call(yAxis)
    .attr("transform", "translate(50,25)");

  svg
    .append("text")
    .transition()
    .duration(1000)
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + 70 + "," + height / 2 + ")rotate(-90)")
    .style("font", "16px times")
    .style("font-family", "Verdana, sans-serif")
    .text("Principal Component 2");
  svg
    .append("text")
    .transition()
    .duration(1000)
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      "translate(" + (width / 2 - 10) + "," + (height - 80) + ")"
    )
    .style("font", "16px times")
    .style("font-family", "Verdana, sans-serif")
    .text("Principal Component 1");
  for (let i = 0; i < kValue; i++) {
    const yPosition = 40 + i * 20; // Adjust y position based on index

    svg
      .append("circle")
      .transition()
      .duration(1000)
      .attr("cx", 560)
      .attr("cy", yPosition)
      .attr("r", 3.5)
      .style("fill", clusterColors[i]);

    svg
      .append("text")
      .transition()
      .duration(1000)
      .attr("x", 570)
      .attr("y", yPosition)
      .text(clusterNames[i])
      .style("font-size", "15px")
      .style("font-family", "Verdana, sans-serif")
      .attr("alignment-baseline", "middle");
  }

  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .transition()
    .duration(1000)
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })
    .style("fill", function (d) {
      return color(d.cluster);
    });

  // code for lines

  xScale = d3
    .scaleLinear()
    .domain([-1, +1])
    .range([0, width - 100]);

  yScale = d3
    .scaleLinear()
    .domain([-0.5, +1.3])
    .range([height - 100, 0]);

  color = d3.scaleOrdinal(d3.schemeCategory10);

  xAxis = d3.axisTop().scale(xScale);

  yAxis = d3.axisRight().scale(yScale);

  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "x axis")
    .attr("transform", "translate(50,25)")
    .call(xAxis);

  svg
    .append("line")
    .style("stroke", "black")
    .attr("x1", "352")
    .attr("y1", "25")
    .attr("x2", "352")
    .attr("y2", "627");

  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "y axis")
    .call(yAxis)
    .attr("transform", "translate(650,25)");

  for (var i = 0; i < data2.length; i++) {
    svg
      .append("line")
      .style("stroke", "violet")
      .style("stroke-width", 2)
      .attr("x1", xScale(0) + 50)
      .attr("y1", yScale(0) + 22)
      .attr("x2", xScale(data2[i]["PC1"]))
      .attr("y2", yScale(data2[i]["PC2"]));
    svg
      .append("text")
      .transition()
      .duration(1000)
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        "translate(" +
          xScale(data2[i]["PC1"]) +
          "," +
          yScale(data2[i]["PC2"]) +
          ")"
      )
      .style("font", "16px times")
      .text(data2[i]["Attr"]);
  }
}
