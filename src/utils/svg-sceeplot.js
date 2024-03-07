import * as d3 from "d3";
import {
  BAR_COLOR,
  LINE_COLOR,
  OPTION_COLOR,
  LIGHT_GREEN
} from "../constants/colors";

export function DrawScreePlot(data, cumData, idi, changeIdiValue) {
  d3.select("#svg_1").html("");
  var x_axis = [],
    y_axis = [];
  var tempcum = 0;
  for (let i = 0; i < data.length; i++) {
    tempcum = tempcum + cumData[i].y;
    cumData[i].y = tempcum;
    x_axis.push(data[i].x);
    y_axis.push(data[i].y);
  }
  var padding = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = 600;
  var height = 600;
  var maximumH = 600;
  var svg = d3
    .select("#svg_1")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  var paddingXScale = width - padding.left - padding.right;
  var paddingYScale = maximumH - padding.top - padding.bottom;
  var xscale = d3.scaleBand().rangeRound([0, paddingXScale]);
  var yscale = d3.scaleLinear().range([paddingYScale, 0]);

  xscale.domain(x_axis);
  yscale.domain([0, 1.1]);

  var xaxis = d3.axisBottom().scale(xscale);
  svg
    .append("g")
    .attr("class", "axis")
    .transition()
    .duration(1000)
    .attr("transform", "translate(50," + paddingYScale + ")")
    .style("font", "16px times")
    .call(xaxis);
  var yaxis = d3.axisLeft().scale(yscale);
  svg
    .append("g")
    .attr("class", "axis")
    .transition()
    .duration(1000)
    .attr("transform", "translate(50,0)")
    .style("font", "16px times")
    .call(yaxis);

  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      "translate(" + 11 + "," + (maximumH - 80) / 2 + ")rotate(-90)"
    )
    .style("font-size", "17px")
    // .style("fill", "#FCFAF9")
    .text("Explained Variance Ratio");
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width / 2 + "," + (maximumH - 20) + ")")
    .style("font-size", "17px")
    // .style("fill", "#FCFAF9")
    .text("Principal Component");

  svg
    .selectAll(".rect")
    .data(y_axis)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (a, b) {
      return xscale(x_axis[b]) + 50;
    })
    .attr("y", function (a) {
      return yscale(a);
    })
    .attr("width", xscale.bandwidth() - 10)
    .attr("height", function (a) {
      return paddingYScale - yscale(a);
    })
    .attr("id", function (a, b) {
      return "idr" + (b + 1);
    })
    .attr("fill", BAR_COLOR)
    .on("mouseover", function (a, b) {
      d3.select(this).attr("fill", LIGHT_GREEN);
      console.log(a, b);
      svg
        .append("text")
        .text(Math.round(b * 100000) / 100000)
        .attr("id", "text_number")
        .attr("x", 63)
        .attr("y", yscale(b) - 90)
        .attr("dy", 70)
        .attr("text-anchor", "middle")
        .attr("fill", OPTION_COLOR)
        .style("font", "18px times");
    })
    .on("mouseout", function (a) {
      d3.select(this).attr("fill", BAR_COLOR);
      d3.select("#text_number").remove();
    });

  var cum = 0;
  var valueline = d3
    .line()
    .x(function (d) {
      return xscale(d.x) + 83;
    })
    .y(function (d) {
      cum = cum + d.y;
      return yscale(cum);
    });

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", LINE_COLOR)
    .attr("stroke-width", 3.5)
    .attr("d", valueline(data));

  cum = 0;
  svg
    .selectAll(".dot")
    .data(cumData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .style("cursor", "pointer")
    .attr("cx", function (d) {
      return xscale(d.x) + 80;
    })
    .attr("id", function (d) {
      return "id" + d.x;
    })
    .attr("cy", function (d) {
      cum = cum + d.y;
      return yscale(d.y);
    })
    .attr("r", 5)
    .attr("transform", "translate(0,0)")
    .attr("fill", OPTION_COLOR)
    .on("mouseover", function (a, b) {
      var countCircle = 1;
      while (countCircle <= b.x) {
        d3.select("#id" + countCircle).attr("fill", LIGHT_GREEN);
        d3.select("#idr" + countCircle).attr("fill", LIGHT_GREEN);
        countCircle++;
      }

      svg
        .append("text")
        .text(Math.round(b.y * 100000) / 100000)
        .attr("id", "text_number2")
        .attr("x", xscale(b.x) + 83)
        .attr("y", yscale(b.y) - 90)
        .attr("dy", 70)
        .attr("text-anchor", "middle")
        .attr("fill", OPTION_COLOR)
        .style("font", "18px times");
    })
    .on("click", function (a, b) {
      // Add your onclick event logic here
      changeIdiValue(b.x);
    })
    .on("mouseout", function (a) {
      var countCircle = 1;
      while (countCircle <= 19) {
        d3.select("#id" + countCircle).attr("fill", OPTION_COLOR);
        d3.select("#idr" + countCircle).attr("fill", BAR_COLOR);
        countCircle++;
      }
      d3.select("#text_number2").remove();
    });
}
