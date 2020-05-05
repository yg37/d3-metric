import {scaleTimeGenerator, appendToolTipToSelection} from "./graphicalObjectGenerator.js";
import {
    ANIMATION_PARAMS,
    AXIS_PARAMS,
    CIRCLE_PARAMS,
    FONT_FAMILY,
    HEIGHT,
    LEGEND_PARAMS,
    MARGINS,
    PATH_PARAMS,
    TOOLTIP_PARAMS,
    WIDTH
} from "./styleConstants.js";


function drawDateValueLineChart(selection, dataUrl, xAxisLabel, yAxisLabel, bestPracticeValue, bestPracticeText) {
    let svg = selection
        .append("svg")
        .attr("width", WIDTH + MARGINS.left + MARGINS.right)
        .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
        .append("g")
        .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    let tooltip = appendToolTipToSelection(selection.append("div"));

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
            .style("left", d3.select(this).attr("cx") + "px")
            .style("top", d3.select(this).attr("cy") - TOOLTIP_PARAMS.LOCATION_BUFFER + "px");
    }

    d3.csv(dataUrl,
        function (csv) {
            return {date: d3.utcParse("%Y-%m-%d")(csv.date), metric: parseFloat(csv.metric)}
        },
        function (data) {
            let x = scaleTimeGenerator(data, WIDTH);
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
                .attr("fill", "none")
                .attr("stroke", PATH_PARAMS.STROKE)
                .attr("stroke-width", PATH_PARAMS.STROKE_WIDTH)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.metric))
                );

            svg.append("path")
                .datum(data)
                .style("stroke-dasharray", PATH_PARAMS.STROKE_DASHARRAY)
                .attr("fill", "none")
                .attr("stroke", PATH_PARAMS.STROKE)
                .attr("stroke-width", PATH_PARAMS.STROKE_WIDTH)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(() => y(bestPracticeValue))
                );

            svg
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.metric)
                })
                .attr("r", CIRCLE_PARAMS.RADIUS)
                .attr("fill", CIRCLE_PARAMS.STROKE)
                .on("mouseover", handleTooltipMouseOver)
                .on("mouseout", handleTooltipMouseOut);

            svg.append("text")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + MARGINS.bottom)
                .style("text-anchor", "middle")
                .style("font-size", AXIS_PARAMS.FONT_SIZE)
                .style("font-weight", AXIS_PARAMS.FONT_WEIGHT)
                .style("font-family", FONT_FAMILY)
                .text(xAxisLabel);

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - MARGINS.left)
                .attr("x", 0 - (HEIGHT / 2))
                .attr("dy", "1em")
                .style("font-size", AXIS_PARAMS.FONT_SIZE)
                .style("font-weight", AXIS_PARAMS.FONT_WEIGHT)
                .style("font-family", FONT_FAMILY)
                .text(yAxisLabel);

            svg.append("path")
                .style("stroke-dasharray", PATH_PARAMS.STROKE_DASHARRAY)
                .attr("fill", "none")
                .attr("stroke", PATH_PARAMS.STROKE)
                .attr("stroke-width", PATH_PARAMS.STROKE_WIDTH)
                .attr("d", PATH_PARAMS.LEGEND_PATH);
            svg.append("text")
                .attr("x", LEGEND_PARAMS.TEXT_X)
                .attr("y", LEGEND_PARAMS.TEXT_Y)
                .text(bestPracticeText)
                .style("font-size", LEGEND_PARAMS.LEGEND_FONT_SIZE)
                .attr("alignment-baseline", "middle");
        });
}

export {drawDateValueLineChart}