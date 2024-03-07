import * as d3 from "d3";

function calculations(a, b) {
  var c = [],
    n = a.length,
    m = b.length,
    i,
    j;
  for (i = -1; ++i < n; )
    for (j = -1; ++j < m; ) c.push({ x: a[i], i: i, y: b[j], j: j });
  return c;
}

export function DrawScatterPlotMatrix(data, columns, idi) {
  d3.select("#svg_2").html("");
  var columnsDomain = {};
  if (typeof columns === "undefined") {
    columns = [];
  }
  columns.forEach(function (feature) {
    columnsDomain[feature] = d3.extent(data, function (d) {
      return d[feature];
    });
  });

  const size = 170;
  const padding = 10;
  var xScale = d3.scaleLinear().range([padding / 2, size - padding / 2]);
  var yScale = d3.scaleLinear().range([size - padding / 2, padding / 2]);

  var xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(6)
    .tickSize(size * 4);
  var yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(6)
    .tickSize(-size * 4);

  var colors = ["#b3de69", "#fdbf6f", "#ae7ac8", "#6baed6"];
  var color = d3.scaleOrdinal(colors);

  var svg = d3
    .select("#svg_2")
    .attr("width", size * 4 + padding + 130)
    .attr("height", size * 4 + padding + 30)
    .attr("transform", "translate(90," + padding + ")");

  svg
    .selectAll(".x.axis")
    .data(columns)
    .enter()
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "x axis1")
    .attr("transform", function (d, i) {
      return "translate(" + ((4 - i - 1) * size + 40) + ",0)";
    })
    .each(function (d) {
      xScale.domain(columnsDomain[d]);
      d3.select(this).call(xAxis);
    });

  svg
    .selectAll(".y.axis")
    .data(columns)
    .enter()
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "y axis1")
    .attr("transform", function (d, i) {
      return "translate(40," + i * size + ")";
    })
    .each(function (d) {
      yScale.domain(columnsDomain[d]);
      d3.select(this).call(yAxis);
    });

  svg
    .append("circle")
    .attr("cx", 650)
    .attr("cy", 39)
    .attr("r", 3.5)
    .style("fill", "#b3de69");
  svg
    .append("circle")
    .attr("cx", 650)
    .attr("cy", 59)
    .attr("r", 3.5)
    .style("fill", "#fdbf6f");
  svg
    .append("circle")
    .attr("cx", 650)
    .attr("cy", 79)
    .attr("r", 3.5)
    .style("fill", "#ae7ac8");
  svg
    .append("circle")
    .attr("cx", 650)
    .attr("cy", 99)
    .attr("r", 3.5)
    .style("fill", "#6baed6");
  svg
    .append("text")
    .attr("x", 660)
    .attr("y", 40)
    .text("Cluster-1")
    .style("font-size", "15px")
    .style("font-family", "Verdana, sans-serif")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 660)
    .attr("y", 60)
    .text("Cluster-2")
    .style("font-size", "15px")
    .style("font-family", "Verdana, sans-serif")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 660)
    .attr("y", 80)
    .text("Cluster-3")
    .style("font-size", "15px")
    .style("font-family", "Verdana, sans-serif")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 660)
    .attr("y", 100)
    .text("Cluster-4")
    .style("font-size", "15px")
    .style("font-family", "Verdana, sans-serif")
    .attr("alignment-baseline", "middle");

  var cell = svg
    .selectAll(".cell")
    .data(calculations(columns, columns))
    .enter()
    .append("g")
    .attr("class", "cell")
    .attr("transform", function (d) {
      return (
        "translate(" + ((4 - d.i - 1) * size + 40) + "," + d.j * size + ")"
      );
    })
    .each(draw);

  cell
    .filter(function (d) {
      return d.i === d.j;
    })
    .append("text")
    .transition()
    .duration(1000)
    .attr("x", padding + 40)
    .attr("y", padding)
    .style("font", "15px times")
    .style("font-family", "Verdana, sans-serif")
    .style("font-weight", "bold")
    .attr("dy", ".71em")
    .attr("transform", "translate(" + 0 + "," + 190 + ")rotate(-45)")
    .text(function (d) {
      return d.x;
    });

  function draw(p) {
    var cell = d3.select(this);

    xScale.domain(columnsDomain[p.x]);
    yScale.domain(columnsDomain[p.y]);

    cell
      .append("rect")
      .attr("class", "frame")
      .attr("fill", "none")
      .attr("x", padding / 2)
      .attr("y", padding / 2)
      .attr("width", size - padding)
      .attr("height", size - padding);

    cell
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[p.x]);
      })
      .attr("cy", function (d) {
        return yScale(d[p.y]);
      })
      .attr("r", 4)
      .style("fill", function (d) {
        return color(d.clusters);
      });
  }
}
