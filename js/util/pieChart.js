import {
    AXIS_PARAMS,
    HEIGHT,
    MARGINS,
    WIDTH
} from "./params.js";

function drawPieChart(selection) {
    let data = [{"inbound":"","count":487},{"direction":"outbound","count":5132}];

    let r = Math.min(WIDTH, HEIGHT) / 2 - MARGINS.top;

    let color = d3.scaleOrdinal()
        .range(["#2C93E8", "#F56C4E"]);

    let labelArc = d3.arc()
        .outerRadius(r - 40)
        .innerRadius(r - 40);

    let vis = selection
        .append("svg")
        .data([data])
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .append("g")
        .attr("transform",
            "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");


    let pie = d3.pie()
        .value((d) => d.count)(data);

    let arc = d3.arc()
        .outerRadius(r - 10)
        .innerRadius(0);

    let arcs = vis.selectAll("arc")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .style("fill", (d) => color(d.data.direction));

    arcs.append("text")
        .attr("transform", (d) => "translate(" + labelArc.centroid(d) + ")")
        .text((d) => d.data.direction)
        .style("fill", "#fff");

}

export {drawPieChart};