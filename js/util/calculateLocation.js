import {HEIGHT, MARGINS} from "./params.js";

const calcXYForLongYLabel = () => {return {x: 0 - (HEIGHT / 1.5), y: 0 - MARGINS.left}};

export {calcXYForLongYLabel};
