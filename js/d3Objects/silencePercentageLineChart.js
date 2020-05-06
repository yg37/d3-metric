import { BEST_PRACTICE_AVERAGE_TEXT} from "../util/params.js";
import {drawDateValueLineChart} from "../util/valueByNameLineChart.js";
const DIV_ID = "#silence-percentage";
const DATA_URL = "../../data/silence-percentage.csv";
const BEST_PRACTICE_VALUE = 11;
const X_AXIS_LABEL = "Date";
const Y_AXIS_LABEL = "Average Silence Percentage";

drawDateValueLineChart(d3.select(DIV_ID), DATA_URL,
    X_AXIS_LABEL, Y_AXIS_LABEL, BEST_PRACTICE_VALUE, BEST_PRACTICE_AVERAGE_TEXT);
