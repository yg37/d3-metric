import {
    AXIS_PARAMS,
    HEIGHT,
    MARGINS,
    WIDTH
} from "./params.js";
import {TOOLTIP_PARAMS, ANIMATION_PARAMS} from "./params.js";
import {appendToolTipToSelection} from "./graphicalObjectGenerator.js";


function drawPieChart(selection) {

    let data = [{"direction":"Inbound","count":487},{"direction":"Outbound","count":5132}];

    let tooltip = appendToolTipToSelection(selection);

    let r = Math.min(WIDTH, HEIGHT) / 2 - MARGINS.top;

    let color = d3.scaleOrdinal()
        .range(["#6CA6CD", "#78AB46"]);

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

    let path = arcs.append("path")
        .attr("d", arc)
        .attr("class", "arc-path")
        .style("fill", (d) => color(d.data.direction));

    function handleTooltipMouseOver(d) {
        let total = d3.sum(data.map((d) => d.count));
        tooltip.html(
            "Direction: " + d.data.direction + "<br/>" +
            "Count: " + d.data.count + "<br/>" +
            "Percentage: " + (d.data.count / total).toFixed(2).toString() + "<br/>");
        tooltip.style('display', 'block');
        tooltip.style('opacity',2);
    }

    function handleTooltipMouseMove(d, i) {
        tooltip.transition()
            .duration(ANIMATION_PARAMS.MOUSE_OVER_DURATION)
            .style("opacity", .9);
        tooltip
            .style("left", d3.event.pageX + TOOLTIP_PARAMS.LOCATION_BUFFER + "px")
            .style("top", d3.event.pageY + "px");
        d3.selectAll(".arc-path")
            .filter((anotherD, anotherIdx) => anotherIdx !== i)
            .style('fill', "#9dcdc2");
    }
    path.on('mouseover', handleTooltipMouseOver);

    path.on('mousemove', handleTooltipMouseMove);

    path.on('mouseout', function() {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });

}

export {drawPieChart};