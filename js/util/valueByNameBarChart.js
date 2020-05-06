import {
    AXIS_PARAMS,
    HEIGHT,
    MARGINS,
    WIDTH
} from "./params.js";
import {calcXYForLongYLabel} from "./calculateLocation.js";


function drawValueByNameBarChart(selection, dataUrl, yAxisLabel) {

    let svg = selection
        .append("svg")
        .attr("width", WIDTH + MARGINS.left + MARGINS.right)
        .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
        .append("g")
        .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    d3.csv(dataUrl, function (csv) {
        return {name: csv.name, metric: parseFloat(csv.metric)}
        },
        function(data) {
        let x = d3.scaleBand()
            .range([0, WIDTH])
            .domain(data.map(function(d) { return d.name; }))
            .padding(0.2);

        let yMax = d3.max(data, d => d.metric);

        svg.append("g")
            .attr("transform", "translate(0," + HEIGHT + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");


        let y = d3.scaleLinear()
            .domain([0, yMax + yMax * AXIS_PARAMS.BUFFER_PERCENTAGE])
            .range([ HEIGHT, 0]);

        svg.append("text")
            .attr("class", "y-axis-text")
            .attr("transform", "rotate(-90)")
            .attr("x", calcXYForLongYLabel().x)
            .attr("y", calcXYForLongYLabel().y)
            .attr("dy", "1em")
            .text(yAxisLabel);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "rect")
            .attr("x", (d) => x(d.name))
            .attr("y", (d) => y(d.metric))
            .attr("width", x.bandwidth())
            .attr("height", (d) => HEIGHT - y(d.metric))
            .attr("fill", "#69b3a2")

    })
}

export {drawValueByNameBarChart};