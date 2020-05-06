import {appendToolTipToSelection} from "./graphicalObjectGenerator.js";
import {
    ANIMATION_PARAMS,
    AXIS_PARAMS,
    CIRCLE_PARAMS,
    HEIGHT,
    LEGEND_PARAMS,
    MARGINS,
    PATH_PARAMS,
    TOOLTIP_PARAMS,
    WIDTH
} from "./params.js";

import {calcXYForLongYLabel} from "./calculateLocation.js";

function drawDateValueLineChart(selection, dataUrl, xAxisLabel, yAxisLabel, bestPracticeValue, bestPracticeText) {
    let svg = selection
        .append("svg")
        .attr("width", WIDTH + MARGINS.left + MARGINS.right)
        .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
        .append("g")
        .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    let tooltip = appendToolTipToSelection(selection);

    function handleTooltipMouseOut() {
        tooltip.transition()
            .duration(ANIMATION_PARAMS.MOUSE_OUT_DURATION)
            .style("opacity", 0)
    }

    function handleTooltipMouseOver(d) {
        tooltip.transition()
            .duration(ANIMATION_PARAMS.MOUSE_OVER_DURATION)
            .style("opacity", .9);
        tooltip.html("Date: " + d.date.toDateString() + "<br/>" +
            "Value: " + d.metric.toFixed(2).toString())
            .style("left", d3.event.pageX + TOOLTIP_PARAMS.LOCATION_BUFFER + "px")
            .style("top", d3.event.pageY + "px");
    }

    d3.csv(dataUrl,
        function (csv) {
            return {date: d3.utcParse("%Y-%m-%d")(csv.date), metric: parseFloat(csv.metric)}
        },
        function (data) {
            let x = d3.scaleTime().domain(d3.extent(data, (d) => d.date)).range([ 0, WIDTH ]);
            let yMax = d3.max(data, d => d.metric);

            svg.append("g")
                .attr("transform", "translate(0," + HEIGHT + ")")
                .call(d3.axisBottom(x));

            let y = d3.scaleLinear()
                .domain([0, yMax + yMax * AXIS_PARAMS.BUFFER_PERCENTAGE])
                .range([HEIGHT, 0]);

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("path")
                .datum(data)
                .attr("class", "path")
                .attr("fill", "none")
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.metric))
                );

            svg.append("path")
                .datum(data)
                .attr("class", "path dashed")
                .attr("fill", "none")
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(() => y(bestPracticeValue))
                );

            svg
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "circle")
                .attr("cx", (d) => x(d.date))
                .attr("cy", (d) => y(d.metric))
                .attr("r", CIRCLE_PARAMS.RADIUS)
                .on("mouseover", handleTooltipMouseOver)
                .on("mouseout", handleTooltipMouseOut);

            svg.append("text")
                .attr("class", "x-axis-text")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + MARGINS.bottom / 2)
                .style("text-anchor", "middle")
                .text(xAxisLabel);

            svg.append("text")
                .attr("class", "y-axis-text")
                .attr("transform", "rotate(-90)")
                .attr("x", calcXYForLongYLabel().x)
                .attr("y", calcXYForLongYLabel().y)
                .attr("dy", "1em")
                .text(yAxisLabel);

            svg.append("path")
                .attr("class", "path dashed")
                .attr("fill", "none")
                .attr("d", PATH_PARAMS.LEGEND_PATH);

            svg.append("text")
                .attr("class", "legend-text")
                .attr("x", LEGEND_PARAMS.TEXT_X)
                .attr("y", LEGEND_PARAMS.TEXT_Y)
                .text(bestPracticeText)
                .attr("alignment-baseline", "middle");
        });
}

export {drawDateValueLineChart}