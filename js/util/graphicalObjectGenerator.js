

const appendToolTipToSelection = selection =>
    selection
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")

export {appendToolTipToSelection};