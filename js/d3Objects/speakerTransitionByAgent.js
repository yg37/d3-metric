import {drawValueByNameBarChart} from "../util/valueByNameBarChart.js";

const DIV_ID = "#speaker-transition";
const DATA_URL = "../../data/speaker-transition-by-agent.csv";
const Y_AXIS_LABEL = "Transitions per Minute";

drawValueByNameBarChart(d3.select(DIV_ID), DATA_URL, Y_AXIS_LABEL);
