import * as d3 from "d3";
import { BAR_COLOR, OPTION_COLOR } from "../constants/colors";

export function Draw_Elbow_chart(data, kValue, changeKValue) {
  d3.select("#svg_4").html("");
  var x_axis = [],
    y_axis = [];
  var tempcum = 0;
  for (let i = 0; i < data.length; i++) {
    x_axis.push(data[i].x);
    y_axis.push(data[i].y);
  }

  var padding = { top: 80, right: 50, bottom: 0, left: 50 };
  var width = 700;
  var height = 600;
  var maximumH = 500;

  var svg = d3
    .select("#svg_4")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  var paddingXScale = width - padding.left - padding.right;
  var paddingYScale = maximumH - padding.top - padding.bottom;
  var xscale = d3.scaleBand().rangeRound([0, paddingXScale]);
  var yscale = d3.scaleLinear().range([paddingYScale, 0]);

  xscale.domain(x_axis);
  yscale.domain([0, d3.max(y_axis)]);

  var xaxis = d3.axisBottom().scale(xscale);
  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "axis")
    .attr("transform", "translate(50," + paddingYScale + ")")
    .call(xaxis);
  var yaxis = d3.axisLeft().scale(yscale);
  svg
    .append("g")
    .transition()
    .duration(1000)
    .attr("class", "axis")
    .attr("transform", "translate(50,0)")
    .call(yaxis);

  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      "translate(" + 12 + "," + (height / 2 - 80) + ")rotate(-90)"
    )
    .style("font", "16px times")
    .style("font-family", "Verdana, sans-serif")
    .text("Eigen Values");
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width / 2 + "," + (maximumH - 45) + ")")
    .style("font", "16px times")
    .style("font-family", "Verdana, sans-serif")
    .text("Number of Clusters");

  var cum = 0;
  var valueline = d3
    .line()
    .x(function (d) {
      return xscale(d.x) + 75;
    })
    .y(function (d) {
      return yscale(d.y);
    });

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2.5)
    .attr("d", valueline(data));
  svg
    .append("line")
    .style("stroke", "black")
    .attr("x2", 51)
    .attr("y2", 140)
    .attr("x1", 540)
    .attr("y1", 140);

  svg
    .append("line")
    .style("stroke", "black")
    .attr("x1", 145)
    .attr("y1", 5)
    .attr("x2", 145)
    .attr("y2", 421);

  cum = 0;
  var temp = 0;
  var flag = true;
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .style("cursor", "pointer")
    .attr("cx", function (d) {
      return xscale(d.x) + 94;
    })
    .attr("cy", function (d) {
      cum = cum + d.y;
      return yscale(d.y);
    })
    .attr("r", 15)
    .attr("transform", "translate(-20,0)")
    .attr("fill", BAR_COLOR)
    .on("mouseover", function (a, b) {
      svg
        .append("text")
        .text(Math.round(b.y * 100000) / 100000)
        .attr("id", "text_number_elbow2")
        .attr("x", xscale(b.x) + 83)
        .attr("y", yscale(b.y) - 90)
        .attr("dy", 70)
        .attr("text-anchor", "middle")
        .attr("fill", OPTION_COLOR)
        .style("font", "18px times");
    })
    .on("click", function (a, b) {
      changeKValue(b.x);
    })
    .on("mouseout", function (a) {
      d3.select("#text_number_elbow2").remove();
    });
}
