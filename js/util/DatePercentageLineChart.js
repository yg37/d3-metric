import {scaleTimeGenerator, appendToolTipToSelection} from "./graphicalObjectGenerator.js";

import {
    ANIMATION_STYLE,
    AXIS_STYLE,
    CIRCLE_STYLE,
    HEIGHT, LEGEND_STYLE,
    MARGINS,
    PATH_STYLE,
    WIDTH
} from "./styleConstants.js";

function drawDatePercentageLineChart(selection, dataUrl, xAxisLabel, yAxisLabel, bestPracticeValue, bestPracticeText) {
    // create tooltip
    let tooltip = appendToolTipToSelection(selection.append("div"));

    function handleSilencePercentageTooltipMouseOut() {
        tooltip.transition()
            .duration(ANIMATION_STYLE.MOUSE_OUT_DURATION)
            .style("opacity", 0)
    }

    function handleSilencePercentageTooltipMouseOver(d) {
        tooltip.transition()
            .duration(ANIMATION_STYLE.MOUSE_OVER_DURATION)
            .style("opacity", .9);
        tooltip.html("Date: " + d.date.toDateString() + "<br/>" +
            "Value: " + d.metric.toString() + "%")
            .style("left", d3.select(this).attr("cx") + "px")
            .style("top", d3.select(this).attr("cy") - 20 + 500 + "px");
    }

    let svg = selection
        .append("svg")
        .attr("width", WIDTH + MARGINS.left + MARGINS.right)
        .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
        .append("g")
        .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    d3.csv(dataUrl,
        function (csv) {
            return {date: d3.utcParse("%Y-%m-%d")(csv.date), metric: parseFloat(csv.metric)}
        },
        function (data) {
            let x = scaleTimeGenerator(data, WIDTH);
            let yMax = d3.max(data, (d) => d.metric);

            let y = d3.scaleLinear()
                .domain([0, yMax + yMax * AXIS_STYLE.BUFFER_PERCENTAGE])
                .range([HEIGHT, 0]);

            let formatPercent = d3.format("%");

            // create x, y axes
            svg
                .append("g")
                .attr("transform", "translate(0," + HEIGHT + ")")
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y).tickFormat(formatPercent));

            // create the dashed line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", PATH_STYLE.STROKE)
                .attr("stroke-width", PATH_STYLE.STROKE_WIDTH)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.metric))
                );

            // create the best practice value line
            svg.append("path")
                .datum(data)
                .style("stroke-dasharray", PATH_STYLE.STROKE_DASHARRAY)
                .attr("fill", "none")
                .attr("stroke", PATH_STYLE.STROKE)
                .attr("stroke-width", PATH_STYLE.STROKE_WIDTH)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(() => y(bestPracticeValue))
                );

            // add dots for data
            svg
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.date))
                .attr("cy", d => y(d.metric))
                .attr("r", CIRCLE_STYLE.RADIUS)
                .attr("fill", CIRCLE_STYLE.STROKE)
                .on("mouseover", handleSilencePercentageTooltipMouseOver)
                .on("mouseout", handleSilencePercentageTooltipMouseOut);

            // add x axis label
            svg.append("text")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + MARGINS.bottom)
                .style("text-anchor", "middle")
                .style("font-size",  AXIS_STYLE.FONT_SIZE)
                .style("font-weight",  AXIS_STYLE.FONT_WEIGHT)
                .style("font-family", AXIS_STYLE.FONT_FAMILY)
                .text(xAxisLabel);

            // add y axis label
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - MARGINS.left)
                .attr("x", 0 - (HEIGHT / 2))
                .attr("dy", "1em")
                .style("font-size", AXIS_STYLE.FONT_SIZE)
                .style("font-weight", AXIS_STYLE.FONT_WEIGHT)
                .style("font-family", AXIS_STYLE.FONT_FAMILY)
                .text(yAxisLabel);

            // add legend
            svg.append("path")
                .style("stroke-dasharray", PATH_STYLE.STROKE_DASHARRAY)
                .attr("fill", "none")
                .attr("stroke", PATH_STYLE.STROKE)
                .attr("stroke-width", PATH_STYLE.STROKE_WIDTH)
                .attr("d", "M234 30, 250, 30");

            // add legend text
            svg.append("text")
                .attr("x", 260)
                .attr("y", 30)
                .text(bestPracticeText)
                .style("font-size", LEGEND_STYLE.LEGEND_FONT_SIZE)
                .attr("alignment-baseline", "middle");
        });
}

export {drawDatePercentageLineChart}