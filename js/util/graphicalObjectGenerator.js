

const appendToolTipToSelection = selection => selection
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")

const scaleTimeGenerator = (data, width) =>
    d3.scaleTime().domain(d3.extent(data, function(d) { return d.date; })).range([ 0, width ]);

export {appendToolTipToSelection, scaleTimeGenerator};