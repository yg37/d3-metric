let HEX_COLOR = "#69b3a2";

export const BEST_PRACTICE_AVERAGE_TEXT = "Best Practice - Average";
export const BEST_PRACTICE_MAXIMUM_TEXT = "Best Practice - Maximum";
export const FONT_FAMILY = 'sans-serif';
export const LEGEND_PARAMS = {LEGEND_FONT_SIZE: "13px", TEXT_X: 260, TEXT_Y: 30};
export const PATH_PARAMS = {STROKE: HEX_COLOR, STROKE_WIDTH: 1.5, STROKE_DASHARRAY: "5, 5", LEGEND_PATH: "M234 30, 250, 30"};
export const CIRCLE_PARAMS = {STROKE: HEX_COLOR, RADIUS: 5};
export const AXIS_PARAMS = {FONT_SIZE: "15px", FONT_WEIGHT: "bold", FONT_FAMILY: "sans-serif", BUFFER_PERCENTAGE: 0.5};
export const ANIMATION_PARAMS = {MOUSE_OVER_DURATION: 200, MOUSE_OUT_DURATION: 200};
export const TOOLTIP_PARAMS = {LOCATION_BUFFER: 20}

let MARGIN_TOP = 10,
    MARGIN_BOTTOM = 30,
    MARGIN_RIGHT = 30,
    MARGIN_LEFT = 60,
    WIDTH_FULL = 500,
    HEIGHT_FULL = 500;

export const MARGINS = {top: MARGIN_TOP, right: MARGIN_RIGHT, bottom: MARGIN_BOTTOM, left: MARGIN_LEFT},
    WIDTH = WIDTH_FULL - MARGINS.left - MARGINS.right,
    HEIGHT = HEIGHT_FULL - MARGINS.top - MARGINS.bottom;
