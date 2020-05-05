import {drawDateValueLineChart} from "../util/dateValueLineChart.js";
import {BEST_PRACTICE_MAXIMUM_TEXT,} from "../util/params.js";

const DIV_ID = "#talk-ratio";
const BEST_PRACTICE_VALUE = 50;
const DATA_URL = "../../data/agent-talk-streak.csv";
const X_AXIS_LABEL = "Date"
const Y_AXIS_LABEL = "Agent Longest Streak in Seconds";

drawDateValueLineChart(d3.select(DIV_ID), DATA_URL,
    X_AXIS_LABEL, Y_AXIS_LABEL, BEST_PRACTICE_VALUE, BEST_PRACTICE_MAXIMUM_TEXT)
