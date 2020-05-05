import {FONT_FAMILY} from "./styleConstants.js";

const appendToolTipToSelection = (selection, toolTipId) => selection
    .style("opacity", 0)
    .style("position", "absolute")
    .style("font-family", FONT_FAMILY);

const scaleTimeGenerator = (data, width) =>
    d3.scaleTime().domain(d3.extent(data, function(d) { return d.date; })).range([ 0, width ]);

export {appendToolTipToSelection, scaleTimeGenerator};