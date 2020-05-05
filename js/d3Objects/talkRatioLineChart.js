import {drawDateValueLineChart} from "../util/DateValueLineChart.js";
import {BEST_PRACTICE_MAXIMUM_TEXT,} from "../util/params.js";

const DIV_ID = "#talk-ratio";
const BEST_PRACTICE_VALUE = 1.05;
const DATA_URL = "../../data/agent-to-caller-talk-ratio.csv";
const X_AXIS_LABEL = "Date"
const Y_AXIS_LABEL = "Average Agent to Caller Talk Rate Ratio";

drawDateValueLineChart(d3.select(DIV_ID), DATA_URL,
    X_AXIS_LABEL, Y_AXIS_LABEL, BEST_PRACTICE_VALUE, BEST_PRACTICE_MAXIMUM_TEXT)
