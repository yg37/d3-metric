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


function drawValueByNameBarChart(selection, dataUrl) {

// append the svg object to the body of the page
    let svg = selection
        .append("svg")
        .attr("width", WIDTH + MARGINS.left + MARGINS.right)
        .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
        .append("g")
        .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    d3.csv(dataUrl, function(data) {
        let x = d3.scaleBand()
            .range([0, WIDTH])
            .domain(data.map(function(d) { return d.value; }))
            .padding(0.2);

        let yMax = d3.max(data, d => d.metric);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");


        let y = d3.scaleLinear()
            .domain([0, yMax + yMax * AXIS_PARAMS.BUFFER_PERCENTAGE])
            .range([ HEIGHT, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.Value); })
            .attr("fill", "#69b3a2")

    })
}

export {drawBarChart};